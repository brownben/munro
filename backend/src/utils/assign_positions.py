import itertools
from collections.abc import Iterable

from ..schemas import EventResult, LeagueResult, Result, VisibleResultFields
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


def get_position_key(
    result: Result | EventResult, fields: VisibleResultFields
) -> tuple[int, int]:
    """Key to order results by, lower is better. Results with the same key share a position"""
    file_points = result.file_points or 0

    if fields.points:
        return (-file_points, result.time if fields.time else 0)

    # Results without a time (points only uploads) fall back to file points
    return (result.time, -file_points if result.time == 0 else 0)


def assign_positions[TResult: Result | EventResult](
    results: Iterable[TResult],
    fields: VisibleResultFields,
) -> Iterable[TResult]:
    """
    Assign 1st, 2nd, 3rd, etc for results in different courses. Expects results to be grouped by course.

    Ranks on the fields used by the scoring method: time, points, or points then time.
    """

    for _, course_results in itertools.groupby(results, lambda result: result.course):
        position = 0
        last_position = 0
        last_position_key: tuple[int, int] | None = None

        for result in sorted(
            course_results, key=lambda result: get_position_key(result, fields)
        ):
            if result.incomplete or (result.type in DYNAMIC_RESULT_TYPES):
                result.position = None
                yield result
                continue

            position += 1
            position_key = get_position_key(result, fields)
            if position_key != last_position_key:
                last_position = position
                last_position_key = position_key

            result.position = last_position
            yield result
