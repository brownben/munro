import collections
import itertools
from typing import Iterable, Type

from ..schemas import Result
from . import stats


def is_valid_result(result: Result) -> bool:
    return not result.incomplete and result.visible


def is_invalid_result(result: Result) -> bool:
    return result.incomplete or not result.visible


class PointsCalculator:
    """Calculate the points to assign to results"""

    best_points_is_max: bool = True

    def __init__(self, scoring_method: str):
        pass

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        """Checks if this points calculator can handle a scoring method"""
        return False

    def calculate_required_stats(self, results: Iterable[Result]) -> None:
        """Calculate statistics required for assigning points results"""
        return None

    def _points_calculator(self, result: Result, age_class: str) -> int:
        """Gets the raw points value for any valid result"""
        return 0

    def calculate_points(self, result: Result, age_class: str) -> int:
        """Calculate a valid points score to assign to any result"""

        if is_invalid_result(result):
            return 0

        points = self._points_calculator(result, age_class)

        return points if points >= 0 else 0


class PositionBased(PointsCalculator):
    """
    Calculate points to results based on their position.

    e.g. 1st - 100, 2nd - 99, 3rd - 98
    """

    _multiplier = 1
    _start_value = 101

    def __init__(self, scoring_method: str):
        if "Double" in scoring_method:
            self._multiplier = 2

        if "50" in scoring_method:
            self._start_value = 51
        elif "99" in scoring_method:
            self._start_value = 100

        self._maximum_points_value = self._start_value * self._multiplier

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return scoring_method.startswith("position")

    def _points_calculator(self, result: Result, _age_class: str) -> int:
        return self._maximum_points_value - (result.position * self._multiplier)


class PositionBasedWithDraw(PointsCalculator):
    """
    Calculate points to results based on their position, but averages in the event of a draw.

    e.g. 1st - 100, 2nd - 98, 2nd - 98, 2nd - 98, 5th - 96
    """

    _occurances_of_positions: dict[str, dict[int, int]] = {}

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return scoring_method == "position99average"

    def calculate_required_stats(self, full_results: Iterable[Result]) -> None:
        course_results = itertools.groupby(full_results, lambda result: result.course)

        for course, results in course_results:
            positions = [
                result.position for result in results if is_valid_result(result)
            ]
            self._occurances_of_positions[course] = collections.Counter(positions)

    def _points_calculator(self, result: Result, _age_class: str) -> int:
        standard_points = 100 - result.position
        occurances_on_course = self._occurances_of_positions.get(result.course, {})
        occuraces_of_position = occurances_on_course.get(result.position, 1)
        lowest_standard_points = standard_points - occuraces_of_position + 1

        return round((standard_points + lowest_standard_points) / 2)


class StaggeredPositionBased(PointsCalculator):
    """
    Calculate points to results based on their position, with larger jumps for best results

    e.g. 1st - 60, 2nd - 55, 3rd - 51, 4th - 48, 5th - 46, 6th - 45
    """

    position_points_values = {
        1: 60,
        2: 55,
        3: 51,
        4: 48,
    }
    _maximum_points_value = 51

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return scoring_method == "positionStaggered"

    def _points_calculator(self, result: Result, _age_class: str) -> int:
        standard_points = self._maximum_points_value - result.position
        return self.position_points_values.get(result.position, standard_points)


class TimeRelativeToAverageBased(PointsCalculator):
    """
    Calculates points from an "Average" runner getting 1000 points (by default) and other runners' times being scaled by their difference from the average.

    Based on the scoring for the Scottish Orienteering League (SOL)
    """

    _average_points = 1000
    _points_per_standard_deviation = 200
    _statistics_for_courses: dict[str, tuple[float, float]]

    def __init__(self, scoring_method: str):
        if "100" in scoring_method:
            self._average_points = 100
            self._points_per_standard_deviation = 20

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return "timeAverage" in scoring_method

    def calculate_required_stats(self, results: Iterable[Result]) -> None:
        times_for_courses = {
            course: [result.time for result in results if is_valid_result(result)]
            for course, results in itertools.groupby(results, lambda x: x.course)
        }

        self._statistics_for_courses = {
            course: (stats.average(times), stats.standard_deviation(times))
            for course, times in times_for_courses.items()
        }

    def _points_calculator(self, result: Result, _age_class: str) -> int:
        average, standard_deviation = self._statistics_for_courses[result.course]

        if standard_deviation == 0:
            return self._average_points

        deviation_from_mean = (average - result.time) / standard_deviation
        points_from_average = self._points_per_standard_deviation * deviation_from_mean
        points = self._average_points + points_from_average

        return round(points)


class TimeRelativeToTopBased(PointsCalculator):
    """
    Calculates points by the difference between the time and the average time of the top 3
    """

    _top3_average_for_courses: dict[str, float]
    _multiplier = 1000

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return "timeTop" in scoring_method

    def calculate_required_stats(self, results: Iterable[Result]) -> None:
        times_for_courses = {
            course: [result.time for result in results if is_valid_result(result)]
            for course, results in itertools.groupby(results, lambda x: x.course)
        }

        self._top3_average_for_courses = {
            course: stats.average(times[:3])
            for course, times in times_for_courses.items()
        }

    def _points_calculator(self, result: Result, _age_class: str) -> int:
        top3_average = self._top3_average_for_courses[result.course]

        if result.time == 0:
            return 0

        return round((top3_average / result.time) * self._multiplier)


class TimeRelativeToWinnerWelshAdjusted(PointsCalculator):
    """
    Calculates points by the difference between the time and the winner of the course

    Adjusts the scores based on the welsh league scoring system
    """

    _course_winners_time: dict[str, float]

    def get_multipliers(self, age_class: str, course_ran: str) -> int:
        course_multipliers = {
            "black": 1.1,
            "brown": 1,
            "short brown": 0.9,
            "blue": 0.8,
            "short blue": 0.7,
            "green": 0.6,
            "short green": 0.5,
            "light green": 0.5,
            "orange": 0.37,
            "yellow": 0.3,
        }
        age_class_multipliers = {
            "M10": 3.5,
            "W10": 4.0,
            "M12": 2.5,
            "W12": 3.0,
            "M14": 2.0,
            "W14": 2.5,
            "M16": 1.5,
            "W16": 2.0,
            "M18": 1.3,
            "W18": 1.7,
            "M20": 1.1,
            "W20": 1.6,
            "M21": 1.0,
            "W21": 1.4,
            "M35": 1.1,
            "W35": 1.6,
            "M40": 1.2,
            "W40": 1.7,
            "M45": 1.3,
            "W45": 1.8,
            "M50": 1.5,
            "W50": 1.9,
            "M55": 1.6,
            "W55": 2.0,
            "M60": 1.8,
            "W60": 2.2,
            "M65": 2.0,
            "W65": 2.4,
            "M70": 2.2,
            "W70": 2.6,
            "M75": 2.4,
            "W75": 2.8,
            "M80": 2.6,
            "W80": 3.0,
            "M85": 2.8,
            "W85": 3.2,
        }

        course_multiplier = course_multipliers.get(course_ran.lower(), 1)
        age_class_multiplier = age_class_multipliers.get(age_class.upper(), 1)

        return round(course_multiplier * age_class_multiplier * 100)

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return scoring_method == "timeTopAdjustedWelsh"

    def calculate_required_stats(self, results: Iterable[Result]) -> None:
        valid_results = [result for result in results if is_valid_result(result)]
        self._course_winners_time = {
            course: next(results).time
            for course, results in itertools.groupby(valid_results, lambda x: x.course)
        }

    def _points_calculator(self, result: Result, age_class: str) -> int:
        winner = self._course_winners_time.get(result.course, 0)
        multiplier = self.get_multipliers(age_class, result.course)

        if result.time == 0:
            return 0

        return round((winner / result.time) * multiplier)


class FileBased(PointsCalculator):
    """Calculate points fetched from the uploaded file"""

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return "file" in scoring_method

    def _points_calculator(self, result: Result, _age_class: str) -> int:
        return result.file_points or 0


class Fallback(PointsCalculator):
    """Fallback points calculator to ensure one always matches, but just assigns 0"""

    @staticmethod
    def matches_scoring_method(scoring_method: str) -> bool:
        return True

    def _points_calculator(self, result: Result, _age_class: str) -> int:
        return 0


def get_matching_points_calculator(scoring_method: str) -> PointsCalculator:
    """Finds the PointsCalculator which matches a scoring method"""

    points_calculators: Iterable[Type[PointsCalculator]] = [
        StaggeredPositionBased,
        PositionBasedWithDraw,
        PositionBased,
        TimeRelativeToWinnerWelshAdjusted,
        TimeRelativeToAverageBased,
        TimeRelativeToTopBased,
        FileBased,
        Fallback,
    ]
    matching_points_calculators = [
        calculator
        for calculator in points_calculators
        if calculator.matches_scoring_method(scoring_method)
    ]

    # As the `Fallback` points calculator will match for all scoring methods
    # Therefore a scoring method will always match
    return matching_points_calculators[0](scoring_method)
