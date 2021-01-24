from ..utils.scoringHelpers import *


class Test_countOccurancesOfPosition:
    def test_noData(self) -> None:
        assert occuracesOfPosition([], False) == 0
        assert occuracesOfPosition([], -5) == 0
        assert occuracesOfPosition([], 1) == 0
        assert occuracesOfPosition([], 55) == 0

    def test_noOccurances(self) -> None:
        listToResult = lambda l: [{"position": item} for item in l]

        assert occuracesOfPosition(listToResult([5, 4, 3, 2]), 1) == 0
        assert occuracesOfPosition(listToResult([55, 66]), 1) == 0
        assert occuracesOfPosition(listToResult([8, 9, 3, 7, 3]), 1) == 0

    def test_occursInList(self) -> None:
        listToResult = lambda l: [{"position": item} for item in l]

        assert occuracesOfPosition(listToResult([5, 4, 3, 2, 1]), 1) == 1
        assert occuracesOfPosition(listToResult([1, 2, 3, 5, 1]), 1) == 2
        assert occuracesOfPosition(listToResult([1, 1, 2, 1, 2]), 1) == 3
        assert occuracesOfPosition(listToResult([5, 4, 3, 2, 1]), 2) == 1
        assert occuracesOfPosition(listToResult([1, 2, 3, 5, 1]), 2) == 1
        assert occuracesOfPosition(listToResult([1, 1, 2, 1, 2]), 2) == 2
        assert occuracesOfPosition(listToResult([5, 4, 3, 2, 10]), 10) == 1
        assert occuracesOfPosition(listToResult([10, 2, 3, 10]), 10) == 2
        assert occuracesOfPosition(listToResult([10, 10, 10, 2]), 10) == 3


class Test_calculateCourseStatistics:
    def test_noData(self) -> None:
        assert calculateCourseStatistics([]) == {}

    def test_oneResult(self) -> None:
        assert calculateCourseStatistics(
            [{"course": "red", "time": 5, "incomplete": False, "position": 1}]
        ) == {"red": {"average": 5, "standardDeviation": 0}}

    def test_twoResults(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
        ]
        assert calculateCourseStatistics(results)["red"]["average"] == 6
        assert (
            round(calculateCourseStatistics(results)["red"]["standardDeviation"]) == 3
        )


class Test_calculateCourseTop3Average:
    def test_noData(self) -> None:
        assert calculateCourseTop3Average([]) == {}

    def test_oneResult(self) -> None:
        assert (
            calculateCourseTop3Average(
                [{"course": "red", "time": 5, "incomplete": False, "position": 1}]
            )["red"]
            == 5
        )

    def test_twoResults(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
        ]
        assert calculateCourseTop3Average(results)["red"] == 6

    def test_threeResults(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
            {"course": "red", "time": 12, "incomplete": False, "position": 1},
        ]
        assert calculateCourseTop3Average(results)["red"] == 8

    def test_fiveResults(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
            {"course": "red", "time": 12, "incomplete": False, "position": 1},
            {"course": "red", "time": 65, "incomplete": False, "position": 1},
            {"course": "red", "time": 155, "incomplete": False, "position": 1},
        ]
        assert calculateCourseTop3Average(results)["red"] == 8

    def test_fiveResultsRandomOrder(self) -> None:
        results = [
            {"course": "red", "time": 12, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
            {"course": "red", "time": 155, "incomplete": False, "position": 1},
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 65, "incomplete": False, "position": 1},
        ]
        assert calculateCourseTop3Average(results)["red"] == 8


class Test_getMultiplier:
    def test_runningStandardCourse(self) -> None:
        assert getMultiplier("M10", "YELLOW") == 1000
        assert getMultiplier("W12", "ORANGE") == 1000
        assert getMultiplier("M14", "LIGHT GREEN") == 1000
        assert getMultiplier("W16", "GREEN") == 1000
        assert getMultiplier("M18", "Brown") == 1000
        assert getMultiplier("W20", "BLUE") == 1000
        assert getMultiplier("M21", "BROWN") == 1000
        assert getMultiplier("W35", "BLUE") == 1000
        assert getMultiplier("M40", "BROWN") == 1000
        assert getMultiplier("W45", "SHORT BLUE") == 1000
        assert getMultiplier("M50", "SHORT BROWN") == 1000
        assert getMultiplier("W55", "GREEN") == 1000
        assert getMultiplier("M60", "BLUE") == 1000
        assert getMultiplier("W65", "SHORT GREEN") == 1000
        assert getMultiplier("M70", "GREEN") == 1000
        assert getMultiplier("W75", "SHORT GREEN") == 1000
        assert getMultiplier("M80", "SHORT GREEN") == 1000

    def test_runningUp(self) -> None:
        assert getMultiplier("W10", "ORANGE") == 1200
        assert getMultiplier("M12", "LIGHT GREEN") == 1200
        assert getMultiplier("W14", "GREEN") == 1210
        assert getMultiplier("M16", "BROWN") == 1210
        assert getMultiplier("W18", "BLACK") == 1452
        assert getMultiplier("M20", "BLACK") == 1200
        assert getMultiplier("W21", "BLACK") == 1200
        assert getMultiplier("M35", "BLACK") == 1200
        assert getMultiplier("W40", "BROWN") == 1210
        assert getMultiplier("M45", "BROWN") == 1100
        assert getMultiplier("W50", "BROWN") == 1331
        assert getMultiplier("M55", "SHORT BROWN") == 1100
        assert getMultiplier("W60", "SHORT BLUE") == 1100
        assert getMultiplier("M65", "BROWN") == 1331
        assert getMultiplier("W70", "BLUE") == 1331
        assert getMultiplier("M75", "GREEN") == 1100
        assert getMultiplier("W80", "BLACK") == 1933

    def test_badAgeClass(self) -> None:
        assert getMultiplier("W", "BROWN") == 1000
        assert getMultiplier("M", "BROWN") == 1000
        assert getMultiplier("WA", "BROWN") == 1000
        assert getMultiplier("MWERR", "BROWN") == 1000
        assert getMultiplier("", "BROWN") == 1000
