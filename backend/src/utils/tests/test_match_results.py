import unittest
from typing import Dict, Optional, cast

from ...schemas import Competitor
from ..import_file import ImportedRecord, ImportedResult
from ..match_results import match_result_to_competitor


class TestMatchingResults(unittest.TestCase):
    paul = {
        "name": "Paul Thompson",
        "ageClass": "M16",
        "club": "HAT",
        "course": "Long",
        "time": "",
    }
    bob = {
        "name": "Robert Jones",
        "ageClass": "M16",
        "club": "HAT",
        "course": "Long",
        "time": "",
    }
    anne = {
        "name": "Ann Jenkins",
        "ageClass": "W21",
        "club": "HAT",
        "course": "Long",
        "time": "",
    }
    sue = {
        "name": "Sue",
        "ageClass": "W21",
        "club": "HAT",
        "course": "Long",
        "time": "",
    }

    competitors = [
        competitor_bob := Competitor(
            id=1,
            name="Bob Jones",
            age_class="M16",
            club="HAT",
            course="Long",
            competitor_pool="Hello",
        ),
        competitor_paul := Competitor(
            id=2,
            name="Paul Thompson",
            age_class="M55",
            club="RAY",
            course="Long",
            competitor_pool="Hello",
        ),
        competitor_annie := Competitor(
            id=3,
            name="Annie Jenkins",
            age_class="W21",
            club="HAT",
            course="Long",
            competitor_pool="Hello",
        ),
        competitor_sue := Competitor(
            id=4,
            name="Sue",
            age_class="W21",
            club="HAT",
            course="Long",
            competitor_pool="Hello",
        ),
    ]

    def assertMatchedCompetitorEquals(
        self,
        imported_result: Dict[str, str],
        expected_competitor: Optional[Competitor],
    ) -> None:
        self.assertEqual(
            match_result_to_competitor(
                ImportedResult(cast(ImportedRecord, imported_result)),
                self.competitors,
            ),
            expected_competitor,
        )

    def test_match_result_with_same_name(self) -> None:
        self.assertMatchedCompetitorEquals(self.paul, self.competitor_paul)
        self.assertMatchedCompetitorEquals(
            self.paul | {"age_class": "M30", "club": "FAT"}, self.competitor_paul
        )

    def test_match_result_with_equivalent_name(self) -> None:
        self.assertMatchedCompetitorEquals(self.bob, self.competitor_bob)
        self.assertMatchedCompetitorEquals(
            self.bob | {"ageClass": "M18"}, self.competitor_bob
        )
        self.assertMatchedCompetitorEquals(
            self.bob | {"club": "FAT"}, self.competitor_bob
        )
        self.assertMatchedCompetitorEquals(
            self.bob | {"ageClass": "M18", "club": "FAT"}, None
        )

    def test_match_result_with_matching_initial(self) -> None:
        self.assertMatchedCompetitorEquals(self.anne, self.competitor_annie)
        self.assertMatchedCompetitorEquals(
            self.anne | {"ageClass": "M18", "club": "FAT"}, None
        )

    def test_match_result_with_same_name_course_not_needed(self) -> None:
        self.assertMatchedCompetitorEquals(
            self.paul | {"course": "Short"},
            self.competitor_paul,
        )
        self.assertMatchedCompetitorEquals(
            self.paul | {"age_class": "M30", "club": "FAT", "course": "short"},
            self.competitor_paul,
        )
        self.assertMatchedCompetitorEquals(
            {
                "name": "Hello",
                "ageClass": "M30",
                "club": "FAT",
                "course": "short",
                "time": "",
            },
            None,
        )

    def test_single_name_match(self) -> None:
        self.assertMatchedCompetitorEquals(self.sue, self.competitor_sue)
        self.assertMatchedCompetitorEquals(self.sue | {"name": "Suzie"}, None)
