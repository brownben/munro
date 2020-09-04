from ..timeFromTop import *


class Test_assignPointsTop3:
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
        assert assignPoints(results, "timeTop3") == output

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
        assert assignPoints(results, "timeTop3") == output

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
                "points": 1500,
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
                "points": 750,
            },
        ]
        assert assignPoints(results, "timeTop3") == output

    def test_fiveResultsRandomOrder(self):
        results = [
            {"course": "red", "time": 12, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
            {"course": "red", "time": 155, "incomplete": False, "position": 1},
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 65, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 12,
                "incomplete": False,
                "position": 1,
                "points": 667,
            },
            {
                "course": "red",
                "time": 8,
                "incomplete": False,
                "position": 1,
                "points": 1000,
            },
            {
                "course": "red",
                "time": 155,
                "incomplete": False,
                "position": 1,
                "points": 52,
            },
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 2000,
            },
            {
                "course": "red",
                "time": 65,
                "incomplete": False,
                "position": 1,
                "points": 123,
            },
        ]
        assert assignPoints(results, "timeTop3") == output

    def test_noTime(self):
        results = [
            {"course": "red", "time": 0, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 0,
                "incomplete": False,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeTop3") == output


class Test_assignPointsTop3Adjusted:
    def test_invalidResult(self):
        results = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": True,
                "position": 1,
            },
        ]
        output = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": True,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output

    def test_oneResult(self):
        results = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
            },
        ]
        output = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1200,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output

    def test_threeResults(self):
        results = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
            },
            {
                "course": "BLACK",
                "ageClass": "M21",
                "time": 6,
                "incomplete": False,
                "position": 2,
            },
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 8,
                "incomplete": False,
                "position": 3,
            },
        ]
        output = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1800,
            },
            {
                "course": "BLACK",
                "ageClass": "M21",
                "time": 6,
                "incomplete": False,
                "position": 2,
                "points": 1200,
            },
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 8,
                "incomplete": False,
                "position": 3,
                "points": 900,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output

    def test_noTime(self):
        results = [
            {
                "course": "Brown",
                "ageClass": "M21",
                "time": 0,
                "incomplete": False,
                "position": 1,
            },
        ]
        output = [
            {
                "course": "Brown",
                "ageClass": "M21",
                "time": 0,
                "incomplete": False,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output
