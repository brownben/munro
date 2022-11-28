import unittest

from ..import_csv import process_csv_file as process_csv_file_generator
from ..import_file import ImportedRecord, ImportException


def process_csv_file(file: str) -> list[ImportedRecord]:
    return list(process_csv_file_generator(file))


class TestImportCSV(unittest.TestCase):
    def test_missing_name(self) -> None:
        self.assertRaises(
            ImportException, lambda: process_csv_file("age class, course, time\na,b,c")
        )

    def test_missing_course(self) -> None:
        self.assertRaises(
            ImportException, lambda: process_csv_file("name, age class, time\na,b,c")
        )

    def test_missing_time(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: process_csv_file("first-name, Surname, age class, time\na,b,c"),
        )

    def test_must_have_at_least_one_row(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: process_csv_file(""),
        )

    def test_must_have_at_least_one_result(self) -> None:
        self.assertRaises(
            ImportException,
            lambda: process_csv_file("firstname, surname, age class, time, course"),
        )

    def test_missing_row_value(self) -> None:
        self.assertRaises(
            ImportException, lambda: process_csv_file("name, course, time\na, b")
        )
        self.assertEqual(
            process_csv_file("name, course, time, club\na, b, c"),
            [{"name": "a", "course": "b", "time": "c", "club": ""}],
        )

    def test_one_partial_result(self) -> None:
        self.assertEqual(
            process_csv_file("name, club, course, time\nJohn Doe, HAT, Long, 14:54"),
            [
                {
                    "club": "HAT",
                    "course": "Long",
                    "name": "John Doe",
                    "time": "14:54",
                }
            ],
        )

    def test_one_full_result(self) -> None:
        self.assertEqual(
            process_csv_file(
                (
                    "firstname; surname; club; ageclass; status; nonCompetitive; course; time; position; points\n"
                    "John; Doe; HAT; M16; 1; N; Long; 14:54; 1st; 1000"
                )
            ),
            [
                {
                    "ageClass": "M16",
                    "club": "HAT",
                    "course": "Long",
                    "filePoints": "1000",
                    "firstName": "John",
                    "surname": "Doe",
                    "nonCompetitive": "N",
                    "position": "1st",
                    "status": "1",
                    "time": "14:54",
                }
            ],
        )
