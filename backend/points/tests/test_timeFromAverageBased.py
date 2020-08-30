from ..timeFromAverageBased import *


class Test_assignPoints:
    def test_wrongScoringMethod(self):
        assert assignPoints([], "") == False
        assert assignPoints([], "Bob") == False
        assert assignPoints([], "timAverage") == False

    def test_invalidResult(self):
        results = [
            {"course": "red", "time": 4, "incomplete": True, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": True,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeAverage") == output

    def test_oneResult(self):
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1000,
            },
        ]
        assert assignPoints(results, "timeAverage") == output

    def test_oneResult100Base(self):
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 100,
            },
        ]
        assert assignPoints(results, "timeAverage100") == output

    def test_threeResults(self):
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 6, "incomplete": False, "position": 2},
            {"course": "red", "time": 8, "incomplete": False, "position": 3},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1200,
            },
            {
                "course": "red",
                "time": 6,
                "incomplete": False,
                "position": 2,
                "points": 1000,
            },
            {
                "course": "red",
                "time": 8,
                "incomplete": False,
                "position": 3,
                "points": 800,
            },
        ]
        assert assignPoints(results, "timeAverage") == output

    def test_negativeResult(self):
        results = [
            {"course": "red", "time": 2, "incomplete": False, "position": 1}
        ] * 50
        results.append(
            {"course": "red", "time": 12, "incomplete": False, "position": 4},
        )
        output = [
            {
                "course": "red",
                "time": 2,
                "incomplete": False,
                "position": 1,
                "points": 1028,
            },
        ] * 50
        output.append(
            {
                "course": "red",
                "time": 12,
                "incomplete": False,
                "position": 4,
                "points": 0,
            },
        )
        assert assignPoints(results, "timeAverage") == output
