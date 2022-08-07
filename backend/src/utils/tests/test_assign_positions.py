import unittest

from ...schemas import LeagueResult, Result
from ..assign_positions import (
    assign_position_based_on_points,
    assign_position_based_on_time,
)


def create_league_result(total_points: int) -> LeagueResult:
    return LeagueResult(
        id=0,
        name="",
        club="",
        age_class="",
        course="",
        total_points=total_points,
        position=0,
    )


def create_event_result(time: int, course: str, incomplete: bool = False) -> Result:
    return Result(
        id=0,
        event="",
        points=0,
        position=0,
        visible=True,
        time=time,
        course=course,
        incomplete=incomplete,
        type="",
        competitor=0,
    )


class TestAssignPositionBasedOnPoints(unittest.TestCase):
    def test_sequential_results(self) -> None:
        results = [
            create_league_result(50),
            create_league_result(49),
            create_league_result(48),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_points(results)],
            [1, 2, 3],
        )

    def test_drawn_results(self) -> None:
        results = [
            create_league_result(50),
            create_league_result(50),
            create_league_result(48),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_points(results)],
            [1, 1, 3],
        )

        results = [
            create_league_result(50),
            create_league_result(48),
            create_league_result(48),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_points(results)],
            [1, 2, 2],
        )

        results = [
            create_league_result(50),
            create_league_result(49),
            create_league_result(49),
            create_league_result(48),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_points(results)],
            [1, 2, 2, 4],
        )


class TestAssignPositionBasedOnTime(unittest.TestCase):
    def test_sequential_results_one_course(self) -> None:
        results = [
            create_event_result(60, "A"),
            create_event_result(75, "A"),
            create_event_result(120, "A"),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2, 3],
        )

    def test_drawn_results_one_course(self) -> None:
        results = [
            create_event_result(60, "A"),
            create_event_result(60, "A"),
            create_event_result(120, "A"),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 1, 3],
        )

        results = [
            create_event_result(60, "A"),
            create_event_result(75, "A"),
            create_event_result(75, "A"),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2, 2],
        )

        results = [
            create_event_result(60, "A"),
            create_event_result(75, "A"),
            create_event_result(75, "A"),
            create_event_result(120, "A"),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2, 2, 4],
        )

    def test_sequential_results_multiple_courses(self) -> None:
        results = [
            create_event_result(60, "A"),
            create_event_result(75, "A"),
            create_event_result(120, "A"),
            create_event_result(61, "B"),
            create_event_result(76, "B"),
            create_event_result(121, "B"),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2, 3, 1, 2, 3],
        )

    def test_drawn_results_multiple_courses(self) -> None:
        results = [
            create_event_result(60, "A"),
            create_event_result(60, "A"),
            create_event_result(120, "A"),
            create_event_result(120, "B"),
            create_event_result(121, "B"),
            create_event_result(121, "B"),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 1, 3, 1, 2, 2],
        )

    def test_sequential_results_multiple_courses_with_incomplete(self) -> None:
        results = [
            create_event_result(60, "A", True),
            create_event_result(75, "A"),
            create_event_result(120, "A"),
            create_event_result(61, "B"),
            create_event_result(76, "B", True),
            create_event_result(121, "B"),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [None, 1, 2, 1, None, 2],
        )
