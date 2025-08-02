from collections.abc import Iterable

from ..schemas import EventResult, LeagueResult, Result
from .dynamic_results import DYNAMIC_RESULT_TYPES


def assign_position_based_on_points(
    results: list[LeagueResult],
) -> None:
    """Assign 1st, 2nd, 3rd, etc based off total points. Expects results to be sorted, modifies results in place"""

    last_position = 0
    position = 0
    last_points = -1

    for result in results:
        if result.total_points == last_points:
            result.position = last_position
            position += 1
        else:
            position += 1
            last_position = position
            result.position = position

        last_points = result.total_points


def assign_position_based_on_time[TResult: Result | EventResult](
    results: Iterable[TResult],
) -> Iterable[TResult]:
    """Assign 1st, 2nd, 3rd, etc based off time, for results in different courses. Expects results to be sorted"""

    position = 0
    last_position = 0
    last_course: str | None = None
    last_time = -1

    for result in results:
        if result.course != last_course:
            position = 0
            last_position = 0
            last_time = -1
            last_course = result.course

        if result.incomplete or (result.type in DYNAMIC_RESULT_TYPES):
            result.position = None
        elif result.time == last_time:
            result.position = last_position
            position += 1
        else:
            position += 1

            result.position = position
            last_position = position
            last_time = result.time

        yield result
