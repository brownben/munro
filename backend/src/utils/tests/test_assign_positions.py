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


def create_event_result(
    time: int,
    course: str,
    incomplete: bool = False,
    file_points: int | None = None,
) -> Result:
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
        file_points=file_points,
    )


class TestAssignPositionBasedOnPoints(unittest.TestCase):
    def test_sequential_results(self) -> None:
        results = [
            create_league_result(50),
            create_league_result(49),
            create_league_result(48),
        ]
        assign_position_based_on_points(results)
        self.assertEqual([result.position for result in results], [1, 2, 3])

    def test_drawn_results(self) -> None:
        results = [
            create_league_result(50),
            create_league_result(50),
            create_league_result(48),
        ]
        assign_position_based_on_points(results)
        self.assertEqual([result.position for result in results], [1, 1, 3])

        results = [
            create_league_result(50),
            create_league_result(48),
            create_league_result(48),
        ]
        assign_position_based_on_points(results)
        self.assertEqual([result.position for result in results], [1, 2, 2])

        results = [
            create_league_result(50),
            create_league_result(49),
            create_league_result(49),
            create_league_result(48),
        ]
        assign_position_based_on_points(results)
        self.assertEqual([result.position for result in results], [1, 2, 2, 4])


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
            [0, 1, 2, 1, 0, 2],
        )

    def test_file_points_when_time_is_zero(self) -> None:
        # When every result has time 0, ranking falls back to file_points,
        # highest first (results arrive sorted file_points descending).
        results = [
            create_event_result(0, "A", file_points=100),
            create_event_result(0, "A", file_points=90),
            create_event_result(0, "A", file_points=80),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2, 3],
        )

    def test_file_points_ties_when_time_is_zero(self) -> None:
        results = [
            create_event_result(0, "A", file_points=100),
            create_event_result(0, "A", file_points=90),
            create_event_result(0, "A", file_points=90),
            create_event_result(0, "A", file_points=80),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2, 2, 4],
        )

    def test_zero_file_points_still_gets_first_place(self) -> None:
        # file_points of 0 must not collide with the "no previous value" sentinel.
        results = [
            create_event_result(0, "A", file_points=0),
            create_event_result(0, "A", file_points=-1),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2],
        )

    def test_file_points_reset_between_courses(self) -> None:
        # last_points must reset per course; course B's leader matches course A's
        # trailing file_points but must still be assigned 1st.
        results = [
            create_event_result(0, "A", file_points=60),
            create_event_result(0, "A", file_points=50),
            create_event_result(0, "B", file_points=50),
            create_event_result(0, "B", file_points=40),
        ]
        self.assertEqual(
            [result.position for result in assign_position_based_on_time(results)],
            [1, 2, 1, 2],
        )
