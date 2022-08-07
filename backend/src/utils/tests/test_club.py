import unittest

from ..club import club_matches_filter


class TestMatchesClubFilter(unittest.TestCase):
    def test_simple_one_club(self) -> None:
        self.assertTrue(club_matches_filter("MOR", "MOR"))
        self.assertFalse(club_matches_filter("MOR", "MOROC"))
        self.assertFalse(club_matches_filter("MOR", "MAR"))

    def test_list_of_clubs(self) -> None:
        self.assertTrue(club_matches_filter("INT|ESOC", "INT"))
        self.assertTrue(club_matches_filter("INT|ESOC", "ESOC"))
        self.assertFalse(club_matches_filter("INT|ESOC", "MAROC"))
        self.assertFalse(club_matches_filter("INT|ESOC", "MOR"))

    def test_scottish_clubs(self) -> None:
        self.assertTrue(club_matches_filter("{scottish_clubs}", "INT"))
        self.assertTrue(club_matches_filter("{scottish_clubs}", "ESOC"))
        self.assertTrue(club_matches_filter("{scottish_clubs}", "MAROC"))
        self.assertTrue(club_matches_filter("{scottish_clubs}", "MOR"))
        self.assertFalse(club_matches_filter("{scottish_clubs}", "DEE"))
        self.assertFalse(club_matches_filter("{scottish_clubs}", "SARUM"))

    def test_no_filter(self) -> None:
        self.assertTrue(club_matches_filter("", "INT"))
        self.assertTrue(club_matches_filter("", "DEE"))
        self.assertTrue(club_matches_filter("", "SARUM"))
