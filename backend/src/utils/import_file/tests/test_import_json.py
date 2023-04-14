import json
import unittest

from .. import ImportException, import_results_from_file
from ..import_json import process_json_file


class TestImportJSON(unittest.TestCase):
    def test_empty_results(self) -> None:
        with self.assertRaisesRegex(
            ImportException, "Expected results to have at least 1 class"
        ):
            import_results_from_file('{"results":[]}')

        with self.assertRaisesRegex(
            ImportException, "Expected results to have at least 1 class"
        ):
            import_results_from_file("[]")

    def test_one_to_one(self) -> None:
        json_object = [
            {
                "ageClass": "M16",
                "club": "HAT",
                "course": "Long",
                "firstName": "John",
                "surname": "Doe",
                "nonCompetitive": "N",
                "position": "1st",
                "status": "1",
                "time": "14:54",
            }
        ]

        self.assertEqual(
            list(process_json_file(json.dumps(json_object))),
            json_object,
        )

    def test_renamed_fields(self) -> None:
        self.assertEqual(
            list(
                process_json_file(
                    json.dumps(
                        [
                            {
                                "ageClass": "M16",
                                "clubname": "HAT",
                                "course": "Long",
                                "firstName": "John",
                                "surname": "Doe",
                                "nonCompetitive": "N",
                                "pos": "1st",
                                "status": "1",
                                "totaltimehhmmss": "14:54",
                            }
                        ]
                    )
                )
            ),
            [
                {
                    "ageClass": "M16",
                    "club": "HAT",
                    "course": "Long",
                    "firstName": "John",
                    "surname": "Doe",
                    "nonCompetitive": "N",
                    "position": "1st",
                    "status": "1",
                    "time": "14:54",
                }
            ],
        )

    def test_missing_name(self) -> None:
        with self.assertRaises(ImportException):
            list(process_json_file(json.dumps([{}])))

        with self.assertRaises(ImportException):
            list(
                process_json_file(
                    json.dumps(
                        [
                            {
                                "ageClass": "M16",
                                "club": "HAT",
                                "course": "Long",
                                "nonCompetitive": "N",
                                "position": "1st",
                                "status": "1",
                                "time": "14:54",
                            }
                        ]
                    )
                )
            )
