import unittest
from typing import Any, List

from ...schemas import Result
from ..points_calculators import PointsCalculator, get_matching_points_calculator


def get_points_for_results(
    scoring_method: str,
    results: List[Result],
) -> List[int]:
    points_calculator = get_matching_points_calculator(scoring_method)
    points_calculator.calculate_required_stats(results)

    return [points_calculator.calculate_points(result, "") for result in results]


def create_result(**kwargs: Any) -> Result:
    return Result(
        **(
            {
                "id": 0,
                "competitor": 0,
                "position": 0,
                "time": 0,
                "course": "",
                "file_points": 0,
                "incomplete": False,
                "type": "",
                "event": "",
            }
            | kwargs
        )
    )


class TestPointsCalculators(unittest.TestCase):
    def test_single_valid_result(self) -> None:
        results: List[Result] = [
            create_result(position=1, time=10, file_points=47),
        ]

        for scoring_method, expected_results in (
            ("file", [47]),
            ("position", [100]),
            ("position50", [50]),
            ("position99", [99]),
            ("position50Double", [100]),
            ("positionStaggered", [60]),
            ("position99average", [99]),
            ("timeAverage", [1000]),
            ("timeAverage100", [100]),
            ("timeTop", [1000]),
            ("timeTopAdjustedWelsh", [100]),
            # Fallback
            ("fallback", [0]),
            ("blablabla", [0]),
            ("unknown", [0]),
        ):
            self.assertEqual(
                get_points_for_results(scoring_method, results),
                expected_results,
                scoring_method,
            )

    def test_single_invalid_result(self) -> None:
        results: List[Result] = [
            create_result(position=1, time=10, file_points=47, incomplete=True),
        ]

        for scoring_method, expected_results in (
            ("file", [0]),
            ("position", [0]),
            ("position50", [0]),
            ("position99", [0]),
            ("position50Double", [0]),
            ("positionStaggered", [0]),
            ("position99average", [0]),
            ("timeAverage", [0]),
            ("timeAverage100", [0]),
            ("timeTop", [0]),
            ("timeTopAdjustedWelsh", [0]),
            # Fallback
            ("fallback", [0]),
            ("blablabla", [0]),
            ("unknown", [0]),
        ):
            self.assertEqual(
                get_points_for_results(scoring_method, results),
                expected_results,
                scoring_method,
            )

    def test_single_zero_time_result(self) -> None:
        results: List[Result] = [
            create_result(position=1, time=0, file_points=47, incomplete=False),
        ]

        for scoring_method, expected_results in (
            ("file", [47]),
            ("position", [100]),
            ("position50", [50]),
            ("position99", [99]),
            ("position50Double", [100]),
            ("positionStaggered", [60]),
            ("position99average", [99]),
            ("timeAverage", [1000]),
            ("timeAverage100", [100]),
            ("timeTop", [0]),
            ("timeTopAdjustedWelsh", [0]),
            # Fallback
            ("fallback", [0]),
            ("blablabla", [0]),
            ("unknown", [0]),
        ):
            self.assertEqual(
                get_points_for_results(scoring_method, results),
                expected_results,
                scoring_method,
            )

    def test_standard_sorted_results(self) -> None:
        results: List[Result] = [
            create_result(position=1, time=10, file_points=47),
            create_result(position=2, time=12, file_points=52),
            create_result(position=3, time=15, file_points=12),
            create_result(position=4, time=25, file_points=36),
            create_result(position=5, time=65, file_points=47),
            create_result(position=-1, time=8, file_points=0, incomplete=True),
        ]

        for scoring_method, expected_results in (
            ("file", [47, 52, 12, 36, 47, 0]),
            ("position", [100, 99, 98, 97, 96, 0]),
            ("position50", [50, 49, 48, 47, 46, 0]),
            ("position99", [99, 98, 97, 96, 95, 0]),
            ("position50Double", [100, 98, 96, 94, 92, 0]),
            ("positionStaggered", [60, 55, 51, 48, 46, 0]),
            ("position99average", [99, 98, 97, 96, 95, 0]),
            ("timeAverage", [1135, 1117, 1091, 1003, 654, 0]),
            ("timeAverage100", [113, 112, 109, 100, 65, 0]),
            ("timeTop", [1233, 1028, 822, 493, 190, 0]),
            ("timeTopAdjustedWelsh", [650, 542, 433, 260, 100, 0]),
            # Fallback
            ("fallback", [0, 0, 0, 0, 0, 0]),
            ("blablabla", [0, 0, 0, 0, 0, 0]),
            ("unknown", [0, 0, 0, 0, 0, 0]),
        ):
            self.assertEqual(
                get_points_for_results(scoring_method, results),
                expected_results,
                scoring_method,
            )

    def test_standard_randomized_results(self) -> None:
        results: List[Result] = [
            create_result(position=5, time=65, file_points=47),
            create_result(position=1, time=10, file_points=47),
            create_result(position=3, time=15, file_points=12),
            create_result(position=-1, time=8, file_points=0, incomplete=True),
            create_result(position=2, time=12, file_points=52),
            create_result(position=4, time=25, file_points=36),
        ]

        for scoring_method, expected_results in (
            ("file", [47, 47, 12, 0, 52, 36]),
            ("position", [96, 100, 98, 0, 99, 97]),
            ("position50", [46, 50, 48, 0, 49, 47]),
            ("position99", [95, 99, 97, 0, 98, 96]),
            ("position50Double", [92, 100, 96, 0, 98, 94]),
            ("positionStaggered", [46, 60, 51, 0, 55, 48]),
            ("position99average", [95, 99, 97, 0, 98, 96]),
            ("timeAverage", [654, 1135, 1091, 0, 1117, 1003]),
            ("timeAverage100", [65, 113, 109, 0, 112, 100]),
            ("timeTop", [462, 3000, 2000, 0, 2500, 1200]),
            ("timeTopAdjustedWelsh", [100, 650, 433, 0, 542, 260]),
            # Fallback
            ("fallback", [0, 0, 0, 0, 0, 0]),
            ("blablabla", [0, 0, 0, 0, 0, 0]),
            ("unknown", [0, 0, 0, 0, 0, 0]),
        ):
            self.assertEqual(
                get_points_for_results(scoring_method, results),
                expected_results,
                scoring_method,
            )

    def test_time_top_zero_time(self) -> None:
        self.assertEqual(
            get_points_for_results(
                "timeTop",
                [create_result(position=5, time=0, file_points=47)],
            ),
            [0],
        )

    def test_base_points_calculator(self) -> None:
        self.assertEqual(
            PointsCalculator("")._points_calculator(create_result(), ""),
            0,
        )
        self.assertEqual(PointsCalculator.matches_scoring_method(""), False)
