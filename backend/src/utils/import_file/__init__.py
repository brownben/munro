from typing import Callable, Iterable, Iterator

from .import_csv import process_csv_file
from .import_file import ImportedRecord as ImportedRecord
from .import_file import ImportedResult as ImportedResult
from .import_file import ImportException as ImportException
from .import_file import import_results
from .import_json import is_json, process_json_file
from .import_sitiming_html import process_sitiming_html_file
from .import_xml import process_xml_file


def _get_file_processor(file: str) -> Callable[[str], Iterable[ImportedRecord]]:
    if ("<!DOCTYPE html" in file or "<html" in file) and "SiTiming" in file:
        return process_sitiming_html_file
    elif 'xmlns="http://www.orienteering.org/datastandard/3.0"' in file:
        return process_xml_file
    elif file.startswith(("[", "{")) and is_json(file):
        return process_json_file
    else:
        return process_csv_file


def import_results_from_file(file: str) -> Iterator[ImportedResult]:
    return import_results(_get_file_processor(file), file)
