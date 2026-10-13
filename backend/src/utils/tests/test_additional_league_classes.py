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
                "Men 40+:Long Course:>M40, Juniors:Short:<M18"
            ),
            [
                AdditionalLeagueClass(
                    name="Men 40+", class_name="Long Course", age_class=">M40"
                ),
                AdditionalLeagueClass(
                    name="Juniors", class_name="Short", age_class="<M18"
                ),
            ],
        )

    def test_skips_invalid_entries(self) -> None:
        self.assertEqual(
            parse_additional_league_classes(
                "a:b,a:b:X40,:b:M40,a:b:c:M40,Ok:Long:W21,Any:Short:>40"
            ),
            [
                AdditionalLeagueClass(name="Ok", class_name="Long", age_class="W21"),
                AdditionalLeagueClass(name="Any", class_name="Short", age_class=">40"),
            ],
        )
