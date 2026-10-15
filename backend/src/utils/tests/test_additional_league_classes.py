from unittest import TestCase

from ...schemas import AdditionalLeagueClass
from ..additional_league_classes import parse_additional_league_classes


class TestParseAdditionalLeagueClasses(TestCase):
    def test_empty(self) -> None:
        self.assertEqual(parse_additional_league_classes(None), [])
        self.assertEqual(parse_additional_league_classes(""), [])

    def test_parses_multiple_entries_with_spaces(self) -> None:
        self.assertEqual(
            parse_additional_league_classes(
                "Men 40+:Long Course:M:40:, Juniors:Short:: :18"
            ),
            [
                AdditionalLeagueClass(
                    name="Men 40+", class_name="Long Course", gender="M", min_age=40
                ),
                AdditionalLeagueClass(name="Juniors", class_name="Short", max_age=18),
            ],
        )

    def test_parses_min_and_max_age(self) -> None:
        self.assertEqual(
            parse_additional_league_classes("W40-49:Long:W:40:49"),
            [
                AdditionalLeagueClass(
                    name="W40-49",
                    class_name="Long",
                    gender="W",
                    min_age=40,
                    max_age=49,
                )
            ],
        )

    def test_skips_invalid_entries(self) -> None:
        self.assertEqual(
            parse_additional_league_classes(
                "a:b,a:b:X:40:50,:b:M:40:,a:b:M:x:,a:b:M:40:5:6,Ok:Long:W:21:21,Any:Short:::"
            ),
            [
                AdditionalLeagueClass(
                    name="Ok", class_name="Long", gender="W", min_age=21, max_age=21
                ),
                AdditionalLeagueClass(name="Any", class_name="Short"),
            ],
        )
