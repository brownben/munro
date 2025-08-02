from collections.abc import Iterable
from typing import Any, Literal, cast

from .import_file import ImportedRecord, ImportException

Columns = Literal[
    "name",
    "firstName",
    "surname",
    "course",
    "time",
    "ageClass",
    "club",
    "position",
    "status",
    "nonCompetitive",
    "filePoints",
    "birthDate",
    "gender",
]

field_names: dict[str, Columns] = {
    "name": "name",
    "name free format": "name",
    "firstname": "firstName",
    "givenname": "firstName",
    "forenames": "firstName",
    "surnames": "surname",
    "surname": "surname",
    "familyname": "surname",
    "lastname": "surname",
    "course": "course",
    "courseclass": "course",
    "classname": "course",
    "time": "time",
    "totaltimehhmmss": "time",
    "racetime": "time",
    "text1": "ageClass",
    "category": "ageClass",
    "ageclass": "ageClass",
    "club": "club",
    "city": "club",
    "clubname": "club",
    "pl": "position",
    "place": "position",
    "pos.": "position",
    "pos": "position",
    "position": "position",
    "status": "status",
    "classifier": "status",
    "nc": "nonCompetitive",
    "noncompetitive": "nonCompetitive",
    "points": "filePoints",
    "netscore": "filePoints",
    "score": "filePoints",
    "gender": "gender",
    "sex": "gender",
    "birthyear": "birthDate",
    "birthday": "birthDate",
    "birthdate": "birthDate",
    "yearofbirth": "birthDate",
    "dateofbirth": "birthDate",
    "yob": "birthDate",
    "dob": "birthDate",
}


def identify_delimeter(file: str) -> Literal[",", ";"]:
    """Identifies the delimeter used in the file"""

    numberOfCommas = file.count(",")
    numberOfColons = file.count(";")

    return "," if numberOfCommas > numberOfColons else ";"


def normalise_header(header: str) -> str:
    """Normalise case and characters in headings to make matching more reliable"""

    return (
        header.lower()
        .strip()
        .replace("-", "")
        .replace("_", "")
        .replace(" ", "")
        .replace("(", "")
        .replace(")", "")
    )


def get_column_locations(header_row: list[str]) -> dict[Columns, int]:
    """Get the positions of each column in the file"""

    column_mappings = {}

    for index, heading in enumerate(header_row):
        normalised_heading = normalise_header(heading)
        heading_name = field_names.get(normalised_heading)

        if heading_name and heading_name not in column_mappings:
            column_mappings[heading_name] = index

    return column_mappings


def check_all_required_columns_present(column_mappings: dict[Columns, Any]) -> bool:
    """Check all required columns (Name, Course, Time) are present"""

    headings = column_mappings.keys()

    hasName = "name" in headings
    hasFirstNameAndSurname = "firstName" in headings and "surname" in headings
    other_required_headings = ("course", "time")

    if not (hasName or hasFirstNameAndSurname):
        raise ImportException("Expected results file to have a `name` column")

    for required_heading in other_required_headings:
        if required_heading not in headings:
            raise ImportException(
                f"Expected results file to have a `{required_heading}` column"
            )

    return True


def _get_value_in_row(row: list[str], position: int, column: Columns) -> str:
    mandatory_fields = (
        "name",
        "firstName",
        "surname",
        "course",
        "time",
    )
    try:
        return row[position].strip()
    except IndexError:
        if column in mandatory_fields:
            raise ImportException(f"Missing `{column}` value for row")

        return ""


def process_csv_file(file: str) -> Iterable[ImportedRecord]:
    """Transform CSV file into dictionaries than can be processed"""

    delimeter = identify_delimeter(file)
    rows = [row.split(delimeter) for row in file.strip().split("\n")]

    if len(rows) == 1 and rows[0] == [""]:
        raise ImportException("Expected file to have at least 1 row")

    header_row = rows[0]
    result_rows = rows[1:]

    if len(result_rows) == 0:
        raise ImportException("Expected file to have at least 1 result")

    column_mappings = get_column_locations(header_row)
    check_all_required_columns_present(column_mappings)

    return [
        cast(
            ImportedRecord,
            {
                column: _get_value_in_row(row, position, column)
                for column, position in column_mappings.items()
            },
        )
        for row in result_rows
    ]
