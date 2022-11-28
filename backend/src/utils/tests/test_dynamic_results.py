import unittest

from ...schemas import LeagueResult, LeagueResultScore
from ..dynamic_results import calculate_dynamic_results


def league_result(values: list[tuple[int, str]]) -> LeagueResult:
    return LeagueResult(
        id=0,
        name="",
        club="",
        age_class="",
        course="",
        points=[
            LeagueResultScore(score=value[0], type=value[1], event="")
            for value in values
        ],
    )


class TestCalculateDynamicResults(unittest.TestCase):
    def test_leave_normal_result_alone(self) -> None:
        result = league_result([(5, ""), (10, ""), (15, "")])
        calculate_dynamic_results(result)
        self.assertEqual([point.score for point in result.points if point], [5, 10, 15])

    def test_average(self) -> None:
        result = league_result([(5, ""), (10, "average"), (15, "")])
        calculate_dynamic_results(result)
        self.assertEqual([point.score for point in result.points if point], [5, 10, 15])

    def test_max(self) -> None:
        result = league_result([(5, ""), (10, "max"), (15, "")])
        calculate_dynamic_results(result)
        self.assertEqual([point.score for point in result.points if point], [5, 15, 15])

    def test_max_with_manual(self) -> None:
        result = league_result([(5, "max"), (10, ""), (15, "manual")])
        calculate_dynamic_results(result)
        self.assertEqual(
            [point.score for point in result.points if point], [10, 10, 15]
        )
