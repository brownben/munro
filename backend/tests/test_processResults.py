from ..utils.processResults import getIndexOfLargestNPoints as biggestPoints


class Test_biggestPoints:
    def test_noPoints(self) -> None:
        assert biggestPoints([], 0) == []
        assert biggestPoints([], 1) == []
        assert biggestPoints([], 5) == []

    def test_notEnoughPoints(self) -> None:
        assert biggestPoints([1], 1) == [0]
        assert biggestPoints([1], 2) == [0]
        assert biggestPoints([1], 7) == [0]
        assert biggestPoints([1, 2, 3], 3) == [2, 1, 0]
        assert biggestPoints([1, 1], 2) == [0, 1]
        assert biggestPoints([8, 9, 7, 8, 9, 8], 7) == [1, 4, 0, 3, 5, 2]

    def test_enoughPoints(self) -> None:
        assert biggestPoints([1, 2, 3], 1) == [2]
        assert biggestPoints([1, 2, 3], 2) == [2, 1]
        assert biggestPoints([1, 1, 1], 1) == [0]
        assert biggestPoints([1, 1, 1], 2) == [0, 1]
