import html
import json
import re
from typing import Iterator, cast

from ..times import is_valid_time
from .import_file import ImportedRecord, ImportException


def remove_html_tags_from_string(string: str) -> str:
    return re.sub("<.*>", "", string)


def transform_result_row(result_row: list[str], course: str) -> ImportedRecord:
    time_position = (
        6
        if len(result_row) >= 7
        and is_valid_time(result_row[6])
        and "+" not in result_row[6]
        else 5
    )

    return cast(
        ImportedRecord,
        {
            "name": remove_html_tags_from_string(result_row[2]),
            "course": course,
            "time": result_row[time_position],
            "nonCompetitive": "N" if is_valid_time(result_row[time_position]) else "Y",
            "ageClass": result_row[4],
            "club": result_row[3],
        },
    )


def process_sitiming_html_file(file: str) -> Iterator[ImportedRecord]:
    """Transform SI Timing HTML results file (with internal data) into dictionaries than can be processed"""

    if "data-ajax" in file:
        raise ImportException(
            "File has external data, Munro currently only supports internal data"
        )

    courses = [
        course.strip()
        for course in re.findall('<option value="[0-9]+">(.*?)</option>', file)
    ]

    if len(courses) == 0:
        raise ImportException("Expected at least 1 course")

    data_section = re.search(
        "function getData\\(tableNumber\\) \\{(.*);\\}<\\/script>", file
    )

    if not data_section:
        raise ImportException("Expected file to contain results data")

    data = data_section.group(1)
    course_sections = re.split("if \\(tableNumber == [0-9]+\\) return ", data)

    course_results = (
        json.loads(
            html.unescape(
                course_data.replace("];", "]")
                .replace("&nbsp;", "")
                .replace("\\u0026nbsp;", "")
                .replace("\\u0026", "&")
            )
        )
        for course_data in course_sections
        if course_data
    )

    for course_index, course_result in enumerate(course_results):
        yield from (
            transform_result_row(result, courses[course_index])
            for result in course_result
        )
