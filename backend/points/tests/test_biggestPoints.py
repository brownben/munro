from ..biggestPoints import *


class Test_biggestPoints:
    def test_noPoints(self):
        assert biggestPoints([], 0) == []
        assert biggestPoints([], 1) == []
        assert biggestPoints([], 5) == []

    def test_notEnoughPoints(self):
        assert biggestPoints([1], 1) == [0]
        assert biggestPoints([1], 2) == [0]
        assert biggestPoints([1], 7) == [0]
        assert biggestPoints([1, 2, 3], 3) == [0, 1, 2]
        assert biggestPoints([1, 1], 2) == [0, 1]
        assert biggestPoints([8, 9, 7, 8, 9, 8], 7) == [0, 1, 2, 3, 4, 5]

    def test_enoughPoints(self):
        assert biggestPoints([1, 2, 3], 1) == [2]
        assert biggestPoints([1, 2, 3], 2) == [2, 1]
        assert biggestPoints([1, 1, 1], 1) == [0]
        assert biggestPoints([1, 1, 1], 2) == [0, 1]

