import unittest

from ..import_file import ImportException
from ..import_html import process_html_file

with open("src/utils/import_file/tests/sample/sitiming.html") as file:
    sample_sitiming_html_file = file.read()
with open("src/utils/import_file/tests/sample/sitiming_external.html") as file:
    sample_sitiming_external_data_html_file = file.read()
with open("src/utils/import_file/tests/sample/sitiming_with_classes.html") as file:
    sample_sitiming_html_file_with_classes = file.read()


class TestImportSITimingHTML(unittest.TestCase):
    def test_internal_data_example_is_imported_correctly(self) -> None:
        self.assertEqual(
            list(process_html_file(sample_sitiming_html_file)),
            [
                {
                    "name": "James Gold",
                    "course": "Long",
                    "time": "27:00",
                    "ageClass": "M21",
                    "club": "HAT",
                    "position": "1st",
                },
                {
                    "name": "Philip Windsor",
                    "course": "Long",
                    "time": "27:11",
                    "ageClass": "M21",
                    "club": "BAT",
                    "position": "2nd",
                },
                {
                    "name": "Helen Flight",
                    "course": "Long",
                    "time": "30:37",
                    "ageClass": "W40",
                    "club": "DOG",
                    "position": "3rd",
                },
                {
                    "name": "Simon Evans",
                    "course": "Long",
                    "time": "31:57",
                    "ageClass": "M21",
                    "club": "JOB",
                    "position": "4th",
                },
                {
                    "name": "Ben Nevis",
                    "course": "Short",
                    "time": "23:34",
                    "ageClass": "M20",
                    "club": "FISH",
                    "position": "1st",
                },
                {
                    "name": "Fred Rick",
                    "course": "Short",
                    "time": "25:39",
                    "ageClass": "W21",
                    "club": "HAD",
                    "position": "2nd",
                },
                {
                    "name": "Ellie Smith",
                    "course": "Short",
                    "time": "26:52",
                    "ageClass": "",
                    "club": "",
                    "position": "3rd",
                },
            ],
        )

    def test_external_data_raises_an_error(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: list(process_html_file(sample_sitiming_external_data_html_file)),
        )

    def test_empty_string(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: list(process_html_file("")),
        )

    def test_no_data_section_but_courses(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: list(process_html_file('<option value="0">Hello</option>')),
        )

    def test_internal_data_with_classes(self) -> None:
        self.maxDiff = None
        self.assertEqual(
            list(process_html_file(sample_sitiming_html_file_with_classes)),
            [
                {
                    "name": "Bob Peregrine",
                    "course": "Short Brown",
                    "time": "52:26",
                    "ageClass": "M18",
                    "club": "GRAMP",
                    "position": "1st",
                },
                {
                    "name": "Graham Giveup",
                    "course": "Short Brown",
                    "time": "52:37",
                    "ageClass": "M18",
                    "club": "SYO",
                    "position": "2nd",
                },
                {
                    "name": "David Mistake",
                    "course": "Short Brown",
                    "time": "54:56",
                    "ageClass": "M18",
                    "club": "MAROC",
                    "position": "3rd",
                },
                {
                    "name": "Fred Thwack",
                    "course": "Short Brown",
                    "time": "55:04",
                    "ageClass": "M18",
                    "club": "WCOC",
                    "position": "4th",
                },
            ],
        )
