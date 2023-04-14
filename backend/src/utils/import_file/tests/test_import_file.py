import datetime
import unittest

import time_machine

from .. import ImportException, import_results_from_file


class TestImportFile(unittest.TestCase):
    def test_import_csv_file(self) -> None:
        file = (
            "firstname; surname; club; ageclass; status; nonCompetitive; course; time; position; points\n"
            "John; Doe; HAT; M16; 0; N; Long; 14:54; 1; 1000\n"
            "Fred; Jones; TAB; M18; 0; N; Long; 15:06; 2; 998\n"
            "Anne; Humphrey; HAT; W40; 0; N; Long; 18:01; 3; 955\n"
        )
        expected_results = [
            {
                "age_class": "M16",
                "club": "HAT",
                "course": "Long",
                "file_points": 1000,
                "name": "John Doe",
                "position": 1,
                "incomplete": False,
                "time": 894,
            },
            {
                "age_class": "M18",
                "club": "TAB",
                "course": "Long",
                "file_points": 998,
                "name": "Fred Jones",
                "position": 2,
                "incomplete": False,
                "time": 906,
            },
            {
                "age_class": "W40",
                "club": "HAT",
                "course": "Long",
                "file_points": 955,
                "name": "Anne Humphrey",
                "position": 3,
                "incomplete": False,
                "time": 1081,
            },
        ]

        imported_results = import_results_from_file(file)

        for result, expected in zip(imported_results, expected_results):
            self.assertDictEqual(dict(result), expected)

    def test_import_csv_file_fixing_excel_issue(self) -> None:
        file = (
            "firstname, surname, club, ageclass, status, nonCompetitive, course, time, position, points\n"
            "John, Doe, HAT, M16, 0, N, Long, 14:54:00, 1, 1000\n"
            "Fred, Jones, TAB, M18, 0, N, Long, 15:06:00, 2, 998\n"
            "Anne, Humphrey, HAT, W40, 0, N, Long, 18:01:00, 3, 955\n"
        )
        expected_results = [
            {
                "age_class": "M16",
                "club": "HAT",
                "course": "Long",
                "file_points": 1000,
                "name": "John Doe",
                "position": 1,
                "incomplete": False,
                "time": 894,
            },
            {
                "age_class": "M18",
                "club": "TAB",
                "course": "Long",
                "file_points": 998,
                "name": "Fred Jones",
                "position": 2,
                "incomplete": False,
                "time": 906,
            },
            {
                "age_class": "W40",
                "club": "HAT",
                "course": "Long",
                "file_points": 955,
                "name": "Anne Humphrey",
                "position": 3,
                "incomplete": False,
                "time": 1081,
            },
        ]

        imported_results = import_results_from_file(file)

        self.assertEqual(
            [dict(result) for result in imported_results], expected_results
        )

    def test_import_html_file(self) -> None:
        with self.assertRaisesRegex(
            ImportException, "Expected file to contain results data"
        ):
            import_results_from_file(
                '<!DOCTYPE html>SiTiming<option value="1">Hello</option>'
            )

    def test_import_xml_file(self) -> None:
        with self.assertRaisesRegex(
            ImportException, "Expected results to have at least 1 class"
        ):
            import_results_from_file(
                '<ResultList xmlns="http://www.orienteering.org/datastandard/3.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" iofVersion="3.0" createTime="2011-07-31T22:46:33+01:00" creator="Example Software" status="Complete"></ResultList>'
            )

    def test_import_json(self) -> None:
        with self.assertRaisesRegex(
            ImportException, "Expected results to have at least 1 class"
        ):
            import_results_from_file("[]")

    def test_invalid_json(self) -> None:
        with self.assertRaisesRegex(
            ImportException, "Expected file to have at least 1 result"
        ):
            import_results_from_file("[")

    @time_machine.travel(datetime.datetime(2021, 8, 11))
    def test_json_with_birthdate(self) -> None:
        imported_results = list(
            import_results_from_file(
                '[{"Name":"Bob", "yearofbirth": 2000, "gender": "male", "course":"1", "time": 5}]'
            )
        )

        self.assertEqual(len(imported_results), 1)
        self.assertEqual(
            dict(imported_results[0]),
            {
                "age_class": "M21",
                "club": "",
                "course": "1",
                "file_points": 0,
                "incomplete": False,
                "name": "Bob",
                "position": 0,
                "time": 5,
            },
        )
