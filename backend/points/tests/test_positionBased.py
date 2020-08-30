from ..positionBased import *


class Test_assignPoints:
    def test_emptyData(self):
        assert assignPoints([], "") == []
        assert assignPoints([], "Double") == []
        assert assignPoints([], "50") == []
        assert assignPoints([], "Double50") == []

    def test_normalResults(self):
        results = [{"position": i + 1, "incomplete": False} for i in range(5)]
        output = [
            {"position": i + 1, "points": 100 - i, "incomplete": False}
            for i in range(5)
        ]
        assert assignPoints(results, "") == output

    def test_normalResults99(self):
        results = [{"position": i + 1, "incomplete": False} for i in range(5)]
        output = [
            {"position": i + 1, "points": 99 - i, "incomplete": False} for i in range(5)
        ]
        assert assignPoints(results, "99") == output

    def test_normalResultsDouble(self):
        results = [{"position": i + 1, "incomplete": False} for i in range(5)]
        output = [
            {"position": i + 1, "points": 200 - (2 * i), "incomplete": False}
            for i in range(5)
        ]
        assert assignPoints(results, "Double") == output

    def test_normalResults50Double(self):
        results = [{"position": i + 1, "incomplete": False} for i in range(5)]
        output = [
            {"position": i + 1, "points": 100 - (2 * i), "incomplete": False}
            for i in range(5)
        ]
        assert assignPoints(results, "50Double") == output

    def test_invalidResults(self):
        results = [{"position": i + 1, "incomplete": True} for i in range(5)]
        output = [
            {"position": i + 1, "points": 0, "incomplete": True} for i in range(5)
        ]
        assert assignPoints(results, "") == output


class Test_assignPoints99WithDraw:
    def test_emptyData(self):
        assert assignPoints99WithDraw([]) == []

    def test_normalResults(self):
        results = [{"position": i + 1, "incomplete": False} for i in range(5)]
        output = [
            {"position": i + 1, "points": 99 - i, "incomplete": False} for i in range(5)
        ]
        assert assignPoints99WithDraw(results) == output

    def test_drawnResults(self):
        results = [
            {"position": 1, "incomplete": False},
            {"position": 2, "incomplete": False},
            {"position": 2, "incomplete": False},
            {"position": 2, "incomplete": False},
            {"position": 5, "incomplete": False},
            {"position": 6, "incomplete": False},
            {"position": 6, "incomplete": False},
        ]
        output = [
            {"position": 1, "points": 99, "incomplete": False},
            {"position": 2, "points": 97, "incomplete": False},
            {"position": 2, "points": 97, "incomplete": False},
            {"position": 2, "points": 97, "incomplete": False},
            {"position": 5, "points": 95, "incomplete": False},
            {"position": 6, "points": 93.5, "incomplete": False},
            {"position": 6, "points": 93.5, "incomplete": False},
        ]
        assert assignPoints99WithDraw(results) == output

    def test_invalidResults(self):
        results = [{"position": i + 1, "incomplete": True} for i in range(5)]
        output = [
            {"position": i + 1, "points": 0, "incomplete": True} for i in range(5)
        ]
        assert assignPoints99WithDraw(results) == output
