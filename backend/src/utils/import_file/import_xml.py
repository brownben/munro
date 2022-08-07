from typing import Iterator, Optional, cast
from xml.etree.ElementTree import Element

from defusedxml.ElementTree import fromstring as parse

from ..age_class import date_to_age_class
from .import_file import ImportedRecord, ImportException

iof_namespace = "{http://www.orienteering.org/datastandard/3.0}"


def get_text(element: Optional[Element]) -> str:
    if element is None:
        return ""
    else:
        return element.text or ""


def get_text_at(element: Element, path: str) -> str:
    prefixed_path = "/".join(f"{iof_namespace}{segment}" for segment in path.split("/"))
    return get_text(element.find(prefixed_path))


def get_attribute(element: Optional[Element], attribute: str) -> str:
    if element:
        value = element.get(attribute)

    return value or ""


def process_xml_file(file: str) -> Iterator[ImportedRecord]:
    """Transform IOF XML 3.0 results file into dictionaries than can be processed"""

    document = parse(file.strip())

    if document.tag != f"{iof_namespace}ResultList":
        raise ImportException("Expected XML to have `ResultsList` as root element")

    class_results = document.findall(f"{iof_namespace}ClassResult")

    if len(class_results) == 0:
        raise ImportException("Expected results to have at least 1 class")

    for class_result in class_results:
        class_name = get_text_at(class_result, "Class/Name")
        for result in class_result.findall(f"{iof_namespace}PersonResult"):
            record = {
                "course": class_name,
                "firstName": get_text_at(result, "Person/Name/Given"),
                "surname": get_text_at(result, "Person/Name/Family"),
                "time": get_text_at(result, "Result/Time"),
                "club": get_text_at(result, "Organisation/Name"),
                "status": get_text_at(result, "Result/Status"),
            }

            sex = get_attribute(result.find(f"{iof_namespace}Person"), "sex")
            birthday = get_text_at(result, "Person/BirthDate")

            if birthday:
                record["ageClass"] = date_to_age_class(birthday, sex)

            yield cast(ImportedRecord, record)
