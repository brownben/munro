import pytest

from ..assignPosition import *


class Test_assignPosition:
    def test_emptyResult(self):
        assert assignPosition([]) == []

    def test_noTotalPoints(self):
        with pytest.raises(KeyError):
            assignPosition([{"points": 1}])

    def test_oneResult(self):
        assert len(assignPosition([{"totalPoints": 0}])) == 1
        assert len(assignPosition([{"totalPoints": 1}])) == 1
        assert len(assignPosition([{"totalPoints": 7}])) == 1
        assert len(assignPosition([{"totalPoints": 100}])) == 1

        assert assignPosition([{"totalPoints": 0}])[0].get("position") == 1
        assert assignPosition([{"totalPoints": 1}])[0].get("position") == 1
        assert assignPosition([{"totalPoints": 7}])[0].get("position") == 1
        assert assignPosition([{"totalPoints": 100}])[0].get("position") == 1

    def test_normalResults(self):
        expectedOutput = lambda l: [
            {"totalPoints": item, "position": pos + 1} for (pos, item) in enumerate(l)
        ]

        assignPositionEquals = lambda l: assignPosition(
            [{"totalPoints": item} for item in l]
        ) == expectedOutput(l)

        assert assignPositionEquals([1, 2])
        assert assignPositionEquals([1, 2, 3, 4, 5, 6])
        assert assignPositionEquals([1, 2, 5, 8, 9, 66])
        assert assignPositionEquals([100, 22, 36, 11, 2])

    def test_drawnResults(self):
        expectedOutput = lambda l: [{"totalPoints": item, "position": 1} for item in l]

        assignPositionEquals = lambda l: assignPosition(
            [{"totalPoints": item} for item in l]
        ) == expectedOutput(l)

        assert assignPositionEquals([1, 1])
        assert assignPositionEquals([2, 2, 2])
        assert assignPositionEquals([1, 1, 1, 1, 1, 1])
        assert assignPositionEquals([5, 5, 5, 5, 5, 5, 5, 5])
        assert assignPositionEquals([157, 157, 157, 157, 157, 157])

    def test_mixedResults(self):
        expectedOutput = lambda points, positions: [
            {"totalPoints": points[i], "position": positions[i]}
            for i in range(len(points))
        ]

        assignPositionEquals = lambda points, positions: assignPosition(
            [{"totalPoints": item} for item in points]
        ) == expectedOutput(points, positions)

        assert assignPositionEquals([1, 1, 2], [1, 1, 3])
        assert assignPositionEquals([1, 1, 3, 4, 4, 6], [1, 1, 3, 4, 4, 6])
        assert assignPositionEquals([11, 21, 21, 21, 56], [1, 2, 2, 2, 5])
        assert assignPositionEquals([100, 22, 36, 11, 2, 2], [1, 2, 3, 4, 5, 5])


class Test_assignPositionsMultipleCourses:
    def test_emptyResult(self):
        assert assignPositionsMultipleCourses([]) == []

    def test_incompleteResult(self):
        results = [
            {"incomplete": True, "time": -1, "course": False, "type": None}
            for _ in range(5)
        ]
        for result in assignPositionsMultipleCourses(results):
            assert result["position"] == -1

    def test_normalResults(self):
        results = [
            {"incomplete": False, "time": i, "course": False, "type": None}
            for i in range(5)
        ]
        for position, result in enumerate(assignPositionsMultipleCourses(results)):
            assert result["position"] == position + 1

    def test_drawnResults(self):
        results = [
            {"incomplete": False, "time": 2, "course": False, "type": None}
            for _ in range(5)
        ]
        for result in assignPositionsMultipleCourses(results):
            assert result["position"] == 1

    def test_changeCourse(self):
        results = [
            {"incomplete": False, "time": i, "course": i > 2, "type": None}
            for i in range(6)
        ]
        assert [
            result["position"] for result in assignPositionsMultipleCourses(results)
        ] == [1, 2, 3, 1, 2, 3]
