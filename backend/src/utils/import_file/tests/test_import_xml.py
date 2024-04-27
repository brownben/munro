import unittest

from ..import_file import ImportException
from ..import_xml import process_xml_file

# Sample XML files taken from the IOF XML repository
# (https://github.com/international-orienteering-federation/datastandard-v3)

with open("src/utils/import_file/tests/sample/iof_example.xml") as file:
    iof_example_xml_file = file.read()
with open("src/utils/import_file/tests/sample/iof_extra_tags.xml") as file:
    iof_extra_tags_example = file.read()
with open("src/utils/import_file/tests/sample/iof_entry_list.xml") as file:
    iof_extry_list = file.read()
with open("src/utils/import_file/tests/sample/sitiming.xml") as file:
    sitiming_export = file.read()
with open("src/utils/import_file/tests/sample/empty_results.xml") as file:
    empty_results_list = file.read()


class TestImportXML(unittest.TestCase):
    def test_iof_example_is_imported_correctly(self) -> None:
        self.assertEqual(
            list(process_xml_file(iof_example_xml_file)),
            [
                {
                    "firstName": "George",
                    "surname": "Wood",
                    "course": "Men Elite",
                    "time": "2001",
                    "club": "OC Back and Forth",
                    "status": "OK",
                    "birthDate": "",
                    "gender": "",
                },
                {
                    "firstName": "Edgar",
                    "surname": "Martin",
                    "course": "Men Elite",
                    "time": "2202",
                    "club": "Bushmen OC",
                    "status": "MissingPunch",
                    "birthDate": "",
                    "gender": "",
                },
                {
                    "firstName": "Toni",
                    "surname": "Lawson",
                    "course": "Open",
                    "time": "",
                    "club": "Doubtful Direction",
                    "status": "DidNotStart",
                    "birthDate": "",
                    "gender": "",
                },
            ],
        )

    def test_iof_example_extra_tags_is_imported_correctly(self) -> None:
        self.assertEqual(
            list(process_xml_file(iof_extra_tags_example)),
            [
                {
                    "firstName": "George",
                    "surname": "Wood",
                    "course": "Men Elite",
                    "time": "2001",
                    "club": "OC Back and Forth",
                    "status": "OK",
                    "birthDate": "",
                    "gender": "",
                },
                {
                    "firstName": "Edgar",
                    "surname": "Martin",
                    "course": "Men Elite",
                    "time": "2202",
                    "club": "Bushmen OC",
                    "status": "MissingPunch",
                    "birthDate": "",
                    "gender": "",
                },
            ],
        )

    def test_iof_example_raises_if_not_resultslist(self) -> None:
        self.assertRaises(
            ImportException, lambda: list(process_xml_file(iof_extry_list))
        )

    def test_sitiming_export_with_age_class(self) -> None:
        self.assertEqual(
            list(process_xml_file(sitiming_export)),
            [
                {
                    "course": "Long",
                    "firstName": "James",
                    "surname": "Adamson",
                    "time": "1620",
                    "club": "INT",
                    "status": "OK",
                    "birthDate": "2000-05-02",
                    "gender": "M",
                },
                {
                    "course": "Long",
                    "firstName": "Phil",
                    "surname": "Ashbrook",
                    "time": "1631",
                    "club": "OD",
                    "status": "OK",
                    "birthDate": "2000-02-31",
                    "gender": "M",
                },
                {
                    "course": "Long",
                    "firstName": "Josie",
                    "surname": "Horse",
                    "time": "1837",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "1981-12-31",
                    "gender": "F",
                },
                {
                    "course": "Long",
                    "firstName": "Simon",
                    "surname": "Evans",
                    "time": "1917",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "1998-12-31",
                    "gender": "M",
                },
                {
                    "course": "Short",
                    "firstName": "Albert",
                    "surname": "Gloves",
                    "time": "1414",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "2002-12-31",
                    "gender": "M",
                },
                {
                    "course": "Short",
                    "firstName": "Claire",
                    "surname": "Walks",
                    "time": "1539",
                    "club": "ESOC",
                    "status": "OK",
                    "birthDate": "1969-03-26",
                    "gender": "F",
                },
                {
                    "course": "Short",
                    "firstName": "Ella",
                    "surname": "Forest",
                    "time": "1612",
                    "club": "",
                    "status": "OK",
                    "birthDate": "2008-06-01",
                    "gender": "F",
                },
                {
                    "course": "Short",
                    "firstName": "Gill",
                    "surname": "Fish",
                    "time": "4575",
                    "club": "ESOC",
                    "status": "Disqualified",
                    "birthDate": "1951-12-31",
                    "gender": "F",
                },
                {
                    "course": "Short",
                    "firstName": "Gill",
                    "surname": "Fish",
                    "time": "4575",
                    "club": "ESOC",
                    "status": "Disqualified",
                    "birthDate": "2018-12-31",
                    "gender": "F",
                },
            ],
        )

    def test_raises_if_no_classes(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: list(process_xml_file(empty_results_list)),
        )
