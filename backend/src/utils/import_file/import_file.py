import re
from collections.abc import Callable, Generator, Iterable
from typing import Any, Literal, TypedDict

from ..age_class import date_to_age_class
from ..times import parse_time


class ImportException(Exception):
    """Raised when the imported file is in an invalid format"""

    def __init__(self, message: str):
        super()
        self.message = message


class ImportedRecord(TypedDict):
    name: str | None
    firstName: str | None
    surname: str | None
    course: str
    time: str
    status: str | None
    nonCompetitive: str | None
    position: str | None
    ageClass: str | None
    club: str | None
    filePoints: str | None
    birthDate: str | None
    gender: str | None


class ImportedResult:
    """Result imported from a file"""

    @staticmethod
    def _get_int(
        result: ImportedRecord, field: Literal["position", "filePoints"]
    ) -> int:
        try:
            return int(result[field] or 0)
        except (ValueError, KeyError):
            return 0

    @staticmethod
    def _get_name(result: ImportedRecord) -> str:
        if result.get("name"):
            return result["name"] or ""

        return f"{result['firstName']} {result['surname']}"

    @staticmethod
    def _get_age_class(result: ImportedRecord) -> str:
        if ageClass := result.get("ageClass"):
            return ageClass

        gender = result.get("gender")
        birthDate = result.get("birthDate")

        if gender and birthDate:
            return date_to_age_class(birthDate, gender)

        return ""

    @staticmethod
    def _get_club(result: ImportedRecord) -> str:
        return (result.get("club") or "").upper()[:20]

    @staticmethod
    def _is_result_incomplete(result: ImportedRecord) -> bool:
        status = result.get("status", "")
        nonComp = result.get("nonCompetitive")
        invalidTime = parse_time(result["time"]) == 0

        return nonComp in ("Y", "1") or (status not in ("", "0", "OK")) or invalidTime

    def __init__(self, result: ImportedRecord) -> None:
        self.name = self._get_name(result)
        self.course = str(result["course"]).strip()
        self.time = parse_time(result["time"])
        self.incomplete = self._is_result_incomplete(result)
        self.position = self._get_int(result, "position")
        self.age_class = self._get_age_class(result)
        self.club = self._get_club(result)
        self.file_points = self._get_int(result, "filePoints")

    def __iter__(self) -> Generator[tuple[str, Any]]:
        for key in (
            "name",
            "course",
            "time",
            "incomplete",
            "position",
            "age_class",
            "club",
            "file_points",
        ):
            yield (key, getattr(self, key))


def fix_times_from_excel(results: list[ImportedRecord]) -> list[ImportedRecord]:
    def result_has_hours_but_no_seconds(result: ImportedRecord) -> bool:
        has_hours = result["time"].count(":") >= 2
        has_zero_seconds = result["time"][-3:] == ":00"

        return has_hours and has_zero_seconds

    all_results_missing_seconds = all(
        result_has_hours_but_no_seconds(result) for result in results
    )

    if all_results_missing_seconds:
        for result in results:
            result["time"] = result["time"][:-3]

    return results


COMBINED_AGE_CLASS_CLUB_REGEX = re.compile(
    r"[MHWFD][0-9]+ \((.*)\)", flags=re.IGNORECASE
)


def fix_combined_age_class_club(
    results: list[ImportedRecord],
) -> list[ImportedRecord]:
    for result in results:
        if match := COMBINED_AGE_CLASS_CLUB_REGEX.match(result.get("club") or ""):
            result["ageClass"] = result["club"].split(" ")[0] if result["club"] else ""
            result["club"] = match.group(1)

    return results


def import_results(
    parser: Callable[[str], Iterable[ImportedRecord]], file: str
) -> Generator[ImportedResult]:
    raw_records = parser(file)
    records = fix_times_from_excel(list(raw_records))
    records = fix_combined_age_class_club(records)

    return (
        ImportedResult(result)
        for result in records
        if any(value != "" for value in result.values())
    )
