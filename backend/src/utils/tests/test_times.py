import unittest

from ..times import parse_time


class TestParseStringToTime(unittest.TestCase):
    def test_empty_string(self) -> None:
        self.assertEqual(parse_time(""), 0)

    def test_one_colon_string(self) -> None:
        self.assertEqual(parse_time("0:21"), 21)
        self.assertEqual(parse_time("0:45"), 45)
        self.assertEqual(parse_time("1:00"), 60)
        self.assertEqual(parse_time("7:21"), 441)
        self.assertEqual(parse_time("61:05"), 3665)

    def test_two_colon_string(self) -> None:
        self.assertEqual(parse_time("0:0:21"), 21)
        self.assertEqual(parse_time("0:0:45"), 45)
        self.assertEqual(parse_time("0:1:00"), 60)
        self.assertEqual(parse_time("0:7:21"), 441)
        self.assertEqual(parse_time("0:61:05"), 3665)

        self.assertEqual(parse_time("00:01:00"), 60)
        self.assertEqual(parse_time("00:07:21"), 441)

    def test_two_colon_string_with_hours(self) -> None:
        self.assertEqual(parse_time("01:01:00"), 3660)
        self.assertEqual(parse_time("02:07:21"), 7641)
        self.assertEqual(parse_time("01:01:05"), 3665)

    def test_invalid_time(self) -> None:
        self.assertEqual(parse_time("abc:de"), 0)
        self.assertEqual(parse_time("m5"), 0)
        self.assertEqual(parse_time("w2 m6"), 0)
