import pytest

from ..helpers import *


class Test_toInt:
    def test_returnsZeroIfNoNumber(self):
        assert toInt("") == 0

    def test_convertsStringToInteger(self):
        assert toInt("-1") == -1
        assert toInt("0") == 0
        assert toInt("4") == 4
        assert toInt("10") == 10
        assert toInt("126") == 126

    def test_ifIntegerRemainSame(self):
        assert toInt(-1) == -1
        assert toInt(0) == 0
        assert toInt(4) == 4
        assert toInt(10) == 10
        assert toInt(126) == 126


class Test_validResult:
    def test_emptyRecord(self):
        with pytest.raises(KeyError):
            validResult({})

    def test_allCorrect(self):
        assert validResult({"position": 1, "incomplete": False}) == True
        assert validResult({"position": 5, "incomplete": False}) == True
        assert validResult({"position": 10, "incomplete": False}) == True
        assert validResult({"position": 55, "incomplete": False}) == True

    def test_positionNotInt(self):
        assert validResult({"position": False, "incomplete": False}) == False
        assert validResult({"position": [], "incomplete": False}) == False
        assert validResult({"position": True, "incomplete": False}) == False
        assert validResult({"position": "55", "incomplete": False}) == False
        assert validResult({"position": 5.5, "incomplete": False}) == False
        assert validResult({"position": "", "incomplete": False}) == False
        assert validResult({"position": "Bob", "incomplete": False}) == False

    def test_incompleteResult(self):
        assert validResult({"position": 1, "incomplete": True}) == False
        assert validResult({"position": 5, "incomplete": True}) == False
        assert validResult({"position": 10, "incomplete": True}) == False
        assert validResult({"position": 55, "incomplete": True}) == False

    def test_validPosition(self):
        assert validResult({"position": 0, "incomplete": False}) == False
        assert validResult({"position": -1, "incomplete": False}) == False
        assert validResult({"position": -10, "incomplete": False}) == False
        assert validResult({"position": -20, "incomplete": False}) == False


class Test_calculateTotal:
    def test_noElements(self):
        assert calculateTotal([], []) == 0
        assert calculateTotal([], [1]) == 0

    def test_allElements(self):
        assert calculateTotal([0, 1, 2], [1, 1, 1]) == 3
        assert calculateTotal([0, 1, 2], [2, 4, 7]) == 13
        assert calculateTotal([0, 1], [57, 63]) == 120

    def test_someElements(self):
        assert calculateTotal([0], [1, 2, 3]) == 1
        assert calculateTotal([1], [1, 2, 3]) == 2
        assert calculateTotal([2], [1, 2, 3]) == 3
        assert calculateTotal([0, 1, 2], [1, 1, 1]) == 3
        assert calculateTotal([0, 1], [1, 1, 1]) == 2
        assert calculateTotal([0, 2], [2, 4, 7]) == 9


class Test_countOccurancesOfPosition:
    def test_noData(self):
        assert countOccuracesOfPosition([], False) == 0
        assert countOccuracesOfPosition([], -5) == 0
        assert countOccuracesOfPosition([], 1) == 0
        assert countOccuracesOfPosition([], 55) == 0

    def test_noOccurances(self):
        listToResult = lambda l: [{"position": item} for item in l]

        assert countOccuracesOfPosition(listToResult([5, 4, 3, 2]), 1) == 0
        assert countOccuracesOfPosition(listToResult([55, 66]), 1) == 0
        assert countOccuracesOfPosition(listToResult([8, 9, 3, 7, 3]), 1) == 0

    def test_occursInList(self):
        listToResult = lambda l: [{"position": item} for item in l]

        assert countOccuracesOfPosition(listToResult([5, 4, 3, 2, 1]), 1) == 1
        assert countOccuracesOfPosition(listToResult([1, 2, 3, 5, 1]), 1) == 2
        assert countOccuracesOfPosition(listToResult([1, 1, 2, 1, 2]), 1) == 3
        assert countOccuracesOfPosition(listToResult([5, 4, 3, 2, 1]), 2) == 1
        assert countOccuracesOfPosition(listToResult([1, 2, 3, 5, 1]), 2) == 1
        assert countOccuracesOfPosition(listToResult([1, 1, 2, 1, 2]), 2) == 2
        assert countOccuracesOfPosition(listToResult([5, 4, 3, 2, 10]), 10) == 1
        assert countOccuracesOfPosition(listToResult([10, 2, 3, 10]), 10) == 2
        assert countOccuracesOfPosition(listToResult([10, 10, 10, 2]), 10) == 3


class Test_countOccurancesFromArrayOfIndexes:
    def test_noData(self):
        assert countOccurancesFromArrayOfIndexes(False, [], []) == 0

    def test_notFound(self):
        count = countOccurancesFromArrayOfIndexes
        assert count(1, [7, 7, 9, 6, 7, 7, 2, 2, 4, 7], [0, 7, 8, 9]) == 0
        assert count(71, [7, 7, 9, 6, 7, 7, 2, 2, 4, 7], [0, 7, 8, 9]) == 0

    def test_completeData(self):
        count = countOccurancesFromArrayOfIndexes
        assert count(1, [1, 2, 3, 2, 2, 1, 3, 1], [0]) == 1
        assert count(1, [1, 2, 3, 2, 2, 1, 3, 1], [0, 2, 3, 5]) == 2
        assert count(1, [1, 2, 3, 2, 2, 1, 3, 1], [5, 7, 4, 3]) == 2
        assert count(7, [7, 7, 9, 6, 7, 7, 2, 2, 4, 7], [0, 7, 8, 9]) == 2


class Test_positionOfLastOccurance:
    def test_noData(self):
        assert positionOfLastOccurance(False, [], []) == -1

    def test_notFound(self):
        assert positionOfLastOccurance(1, [1, 2, 3, 1, 4, 5], [2, 5])
        assert positionOfLastOccurance(7, [1, 2, 3, 1, 4, 5], [1, 0, 4, 2, 5])

    def test_foundPosition(self):
        assert positionOfLastOccurance(1, [1, 2, 3, 1, 4, 5], [2, 5])
        assert positionOfLastOccurance(7, [1, 2, 3, 1, 4, 5], [1, 0, 4, 2, 5])


class Test_calculateCourseAverage:
    def test_noData(self):
        assert calculateCourseAverage([]) == {}

    def test_oneResult(self):
        assert calculateCourseAverage(
            [{"course": "red", "time": 5, "incomplete": False, "position": 1}]
        ) == {"red": {"average": 5, "standardDeviation": 0}}

    def test_twoResults(self):
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
        ]
        assert calculateCourseAverage(results)["red"]["average"] == 6
        assert round(calculateCourseAverage(results)["red"]["standardDeviation"]) == 3
