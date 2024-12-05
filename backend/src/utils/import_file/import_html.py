import json
import re
from typing import Iterable, cast

from bs4 import BeautifulSoup, Tag

from .import_csv import (
    _get_value_in_row,
    check_all_required_columns_present,
    get_column_locations,
)
from .import_file import ImportedRecord, ImportException

SITIMING_PARSE_FAILURE_MESSAGE = (
    "Data not as expected for SITiming HTML file, please try another format."
)
NBSP_REGEX = re.compile("&nbsp;", flags=re.IGNORECASE)
SOCIAL_LINK_REGEX = re.compile("<a href=.*?></a>", flags=re.IGNORECASE)


def parse_sitiming_script(script_tag_text: str) -> list[str]:
    # remove preamble of the function definition
    preamble_regex = re.compile(r".*?0\)\s*\n*\s*return", flags=re.DOTALL)
    script_text = preamble_regex.sub("", script_tag_text)

    # replace various escaped html entities
    script_text = (
        script_text.replace("\\u003c", "<")
        .replace("\\u003e", ">")
        .replace("\\u0026nbsp;", "")
        .replace("\\", "")
    )

    # remove the end of the function, which isn't data
    script_text = script_text.strip().removesuffix("}").removesuffix(";")

    # replace &nbsp; with real spaces
    script_text = NBSP_REGEX.sub("", script_text)

    # remove the links to social media
    script_text = SOCIAL_LINK_REGEX.sub("", script_text)

    # split into the blocks of JSON
    IF_RETURN = r";\n*\s*if\s*\(tableNumber == [0-9]+\)\n*\s*return\s*\n*"
    return re.split(IF_RETURN, script_text)


def parse_sitiming_file(file: str) -> tuple[list[str], list[list[str]]]:
    if "data-ajax" in file:
        raise ImportException(
            "File has external data, Munro currently only supports internal data in SITiming HTML files."
        )

    try:
        document = BeautifulSoup(file, "lxml")
    except Exception:
        raise ImportException("Unable to parse HTML file")

    script_tag = document.find("script", attrs={"type": "text/javascript", "src": None})
    table = document.find("table")
    if script_tag is None or not isinstance(table, Tag):
        raise ImportException(SITIMING_PARSE_FAILURE_MESSAGE)

    course_results = [
        json.loads(block) for block in parse_sitiming_script(script_tag.text)
    ]

    table_headings = [
        heading_text
        for heading in table.select("thead tr th")
        if (heading_text := heading.text.strip()) and not heading_text.endswith("LT")
    ]
    table_headings.insert(1, "PositionExtra")  # SITiming adds an extra position column
    table_headings.append("Course")

    courses = [
        block.find("h3").text
        for block in document.find_all("div", attrs={"class": "results-block"})
    ]

    number_of_headings = len(table_headings) - 1
    for results, course in zip(course_results, courses):
        for row in results:
            while len(row) < number_of_headings:
                # add extra column for when behind is missing for some results
                row.append("")

            while len(row) > number_of_headings:
                # if splits are included remove them
                row.pop()

            row.append(course)

    return (
        table_headings,
        [result for results in course_results for result in results],
    )


def process_html_file(file: str) -> Iterable[ImportedRecord]:
    if "https://www.sportident.co.uk/sitiming" in file:
        header_row, result_rows = parse_sitiming_file(file)
    else:
        raise ImportException(
            "Unknown HTML format, currently only able to import from British Orienteering and SITiming results."
        )

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
