import unittest

from ..age_class import (
    age_class_matches_filter,
    is_age_class_eligible,
    is_age_class_eligible_exact,
    is_age_class_eligible_exact_with_b_class,
    parse_age_class,
)


class TestParseAgeClass(unittest.TestCase):
    def test_parse_blank_age_class(self) -> None:
        self.assertEqual(parse_age_class(""), ("M", 21))

    def test_single_letters_match_gender(self) -> None:
        self.assertEqual(parse_age_class("M"), ("M", 21))
        self.assertEqual(parse_age_class("W"), ("W", 21))
        self.assertEqual(parse_age_class("D"), ("W", 21))
        self.assertEqual(parse_age_class("F"), ("W", 21))

    def test_just_numbers_match_age(self) -> None:
        self.assertEqual(parse_age_class("20"), ("M", 20))
        self.assertEqual(parse_age_class("12"), ("M", 12))
        self.assertEqual(parse_age_class("55"), ("M", 55))
        self.assertEqual(parse_age_class("75"), ("M", 75))
        self.assertEqual(parse_age_class("35"), ("M", 35))

    def test_standard_age_classes(self) -> None:
        self.assertEqual(parse_age_class("M20"), ("M", 20))
        self.assertEqual(parse_age_class("M12"), ("M", 12))
        self.assertEqual(parse_age_class("M55"), ("M", 55))

        self.assertEqual(parse_age_class("W20"), ("W", 20))
        self.assertEqual(parse_age_class("W12"), ("W", 12))
        self.assertEqual(parse_age_class("W55"), ("W", 55))

    def test_age_classes_with_extra(self) -> None:
        self.assertEqual(parse_age_class("MU20"), ("M", 20))


class TestAgeClassEligible(unittest.TestCase):
    def test_age_class_equal(self) -> None:
        self.assertTrue(is_age_class_eligible("M21", "M21"))
        self.assertTrue(is_age_class_eligible("M20", "M20"))
        self.assertTrue(is_age_class_eligible("M55", "M55"))

    def test_21_matches_all_ages(self) -> None:
        self.assertTrue(is_age_class_eligible("M21", "M55"))
        self.assertTrue(is_age_class_eligible("M21", "M12"))

    def test_women_match_mens_classes(self) -> None:
        self.assertTrue(is_age_class_eligible("M21", "W21"))
        self.assertTrue(is_age_class_eligible("M20", "W20"))
        self.assertTrue(is_age_class_eligible("M55", "W55"))

    def test_age_classes_either_side_match(self) -> None:
        self.assertTrue(is_age_class_eligible("M20", "M18"))
        self.assertTrue(is_age_class_eligible("M55", "M65"))

    def test_men_dont_match_womens_classes(self) -> None:
        self.assertFalse(is_age_class_eligible("W21", "M21"))
        self.assertFalse(is_age_class_eligible("W20", "M20"))
        self.assertFalse(is_age_class_eligible("W55", "M55"))

    def test_wrong_ages_dont_match(self) -> None:
        self.assertFalse(is_age_class_eligible("M18", "M20"))
        self.assertFalse(is_age_class_eligible("M65", "M55"))


class TestAgeClassEligibleExact(unittest.TestCase):
    def test_age_class_equal(self) -> None:
        self.assertTrue(is_age_class_eligible_exact("M21", "M21"))
        self.assertTrue(is_age_class_eligible_exact("M20", "M20"))
        self.assertTrue(is_age_class_eligible_exact("M55", "M55"))
        self.assertTrue(is_age_class_eligible_exact("W21", "W21"))
        self.assertTrue(is_age_class_eligible_exact("W20", "W20"))
        self.assertTrue(is_age_class_eligible_exact("W55", "W55"))

    def test_women_dont_match_mens_classes(self) -> None:
        self.assertFalse(is_age_class_eligible_exact("M21", "W21"))
        self.assertFalse(is_age_class_eligible_exact("M20", "W20"))
        self.assertFalse(is_age_class_eligible_exact("M55", "W55"))

    def test_age_classes_either_side_match(self) -> None:
        self.assertFalse(is_age_class_eligible_exact("M20", "M18"))
        self.assertFalse(is_age_class_eligible_exact("M55", "M65"))

    def test_men_dont_match_womens_classes(self) -> None:
        self.assertFalse(is_age_class_eligible_exact("W21", "M21"))
        self.assertFalse(is_age_class_eligible_exact("W20", "M20"))
        self.assertFalse(is_age_class_eligible_exact("W55", "M55"))

    def test_wrong_ages_dont_match(self) -> None:
        self.assertFalse(is_age_class_eligible_exact("M18", "M20"))
        self.assertFalse(is_age_class_eligible_exact("M65", "M55"))


class TestAgeClassEligibleExactWithB(unittest.TestCase):
    def test_age_class_equal(self) -> None:
        self.assertTrue(is_age_class_eligible_exact_with_b_class("M21", "M21"))
        self.assertTrue(is_age_class_eligible_exact_with_b_class("M20", "M20"))
        self.assertTrue(is_age_class_eligible_exact_with_b_class("M55", "M55"))
        self.assertTrue(is_age_class_eligible_exact_with_b_class("W21", "W21"))
        self.assertTrue(is_age_class_eligible_exact_with_b_class("W20", "W20"))
        self.assertTrue(is_age_class_eligible_exact_with_b_class("W55", "W55"))

    def test_age_class_with_b(self) -> None:
        self.assertTrue(is_age_class_eligible_exact_with_b_class("M18", "M20"))
        self.assertTrue(is_age_class_eligible_exact_with_b_class("M10", "M12"))
        self.assertTrue(is_age_class_eligible_exact_with_b_class("M14", "M16"))

    def test_women_dont_match_mens_classes(self) -> None:
        self.assertFalse(is_age_class_eligible_exact_with_b_class("M21", "W21"))
        self.assertFalse(is_age_class_eligible_exact_with_b_class("M20", "W20"))
        self.assertFalse(is_age_class_eligible_exact_with_b_class("M55", "W55"))

    def test_age_classes_either_side_match(self) -> None:
        self.assertFalse(is_age_class_eligible_exact_with_b_class("M20", "M18"))
        self.assertFalse(is_age_class_eligible_exact_with_b_class("M55", "M65"))

    def test_men_dont_match_womens_classes(self) -> None:
        self.assertFalse(is_age_class_eligible_exact_with_b_class("W21", "M21"))
        self.assertFalse(is_age_class_eligible_exact_with_b_class("W20", "M20"))
        self.assertFalse(is_age_class_eligible_exact_with_b_class("W55", "M55"))


class TestMatchesAgeClassFilter(unittest.TestCase):
    def test_standard_age_class(self) -> None:
        self.assertTrue(age_class_matches_filter("M16", "M16"))
        self.assertTrue(age_class_matches_filter("M21", "W21"))
        self.assertTrue(age_class_matches_filter("M55", "M75"))

    def test_exact_age_class(self) -> None:
        self.assertTrue(age_class_matches_filter("exact-M16", "M16"))
        self.assertFalse(age_class_matches_filter("exact-M21", "W21"))
        self.assertFalse(age_class_matches_filter("exact-M55", "M75"))

    def test_exact_age_class_with_b(self) -> None:
        self.assertTrue(age_class_matches_filter("exactWithB-M16", "M16"))
        self.assertTrue(age_class_matches_filter("exactWithB-M16", "M18"))
        self.assertFalse(age_class_matches_filter("exactWithB-M21", "W21"))
        self.assertFalse(age_class_matches_filter("exactWithB-M55", "M75"))

    def test_older_18(self) -> None:
        self.assertTrue(age_class_matches_filter("older18-M18", "M18"))
        self.assertTrue(age_class_matches_filter("older18-M18", "W18"))
        self.assertTrue(age_class_matches_filter("older18-W18", "W18"))
        self.assertTrue(age_class_matches_filter("older18-W21", "W45"))
        self.assertTrue(age_class_matches_filter("older18-W35", "W45"))
        self.assertFalse(age_class_matches_filter("older18-M18", "M16"))
        self.assertFalse(age_class_matches_filter("older18-W45", "W21"))
        self.assertFalse(age_class_matches_filter("older18-W35", "M45"))
        self.assertFalse(age_class_matches_filter("older18-W16", "W12"))
        self.assertFalse(age_class_matches_filter("older18-W16", "M12"))

    def test_exact_gender(self) -> None:
        self.assertTrue(age_class_matches_filter("exactGender-M18", "M18"))
        self.assertTrue(age_class_matches_filter("exactGender-M18", "M16"))
        self.assertTrue(age_class_matches_filter("exactGender-W21", "W35"))
        self.assertTrue(age_class_matches_filter("exactGender-W21", "W12"))
        self.assertTrue(age_class_matches_filter("exactGender-W35", "W45"))
        self.assertTrue(age_class_matches_filter("exactGender-W21", "W12"))
        self.assertFalse(age_class_matches_filter("exactGender-M18", "W18"))
        self.assertFalse(age_class_matches_filter("exactGender-W18", "W21"))
        self.assertFalse(age_class_matches_filter("exactGender-W35", "M45"))

    def test_no_filter(self) -> None:
        self.assertTrue(age_class_matches_filter("", "M16"))
        self.assertTrue(age_class_matches_filter("", "W21"))
        self.assertTrue(age_class_matches_filter("", "W245"))
