import json
from typing import Iterator, cast

from .import_csv import (
    check_all_required_columns_present,
    field_names,
    normalise_header,
)
from .import_file import ImportedRecord, ImportException


def is_json(string: str) -> bool:
    """Is a given string valid JSON?"""
    try:
        json.loads(string)
    except ValueError:
        return False
    return True


def process_json_file(file: str) -> Iterator[ImportedRecord]:
    document = json.loads(file.strip())
    results = document if isinstance(document, list) else document["results"]

    if len(results) == 0:
        raise ImportException("Expected results to have at least 1 class")

    for result in results:
        record = {}

        for key, value in result.items():
            normalised_field = normalise_header(key)
            if field := field_names.get(normalised_field):
                record[field] = value

        check_all_required_columns_present(record)

        yield cast(ImportedRecord, record)
