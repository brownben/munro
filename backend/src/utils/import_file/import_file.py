from typing import Any, Callable, Generator, Iterable, Literal, Optional, TypedDict

from ..age_class import date_to_age_class
from ..times import parse_time


class ImportException(Exception):
    """Raised when the imported file is in an invalid format"""

    def __init__(self, message: str):
        super()
        self.message = message


class ImportedRecord(TypedDict):
    name: Optional[str]
    firstName: Optional[str]
    surname: Optional[str]
    course: str
    time: str
    status: Optional[str]
    nonCompetitive: Optional[str]
    position: Optional[str]
    ageClass: Optional[str]
    club: Optional[str]
    filePoints: Optional[str]
    birthDate: Optional[str]
    gender: Optional[str]


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

    def __iter__(self) -> Generator[tuple[str, Any], None, None]:
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
        if isinstance(result["time"], int):
            return False

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


def import_results(
    parser: Callable[[str], Iterable[ImportedRecord]], file: str
) -> Generator[ImportedResult, None, None]:
    raw_records = parser(file)
    fixed_records = fix_times_from_excel(list(raw_records))

    return (ImportedResult(result) for result in fixed_records)
