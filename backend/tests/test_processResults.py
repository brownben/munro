from ..utils.processResults import (
    getCountingPoints,
    getIndexOfLargestNPoints as biggestPoints,
)
from ..database.event import Event


class Test_BiggestPoints:
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


class MockEvent(Event):
    def __init__(self, id: str, required: bool) -> None:
        self.id = id
        self.requiredInTotal = required


mockEvents = [
    MockEvent("a", False),
    MockEvent("b", True),
    MockEvent("c", False),
    MockEvent("d", False),
    MockEvent("e", False),
    MockEvent("f", False),
]

mockEventsMultipleRequired = [
    MockEvent("a", False),
    MockEvent("b", True),
    MockEvent("c", False),
    MockEvent("d", False),
    MockEvent("e", True),
    MockEvent("f", False),
]


class Test_GetCountingPoints:
    def test_noRequiredEvents(self) -> None:
        assert getCountingPoints([1, 2, 3], 3, [], []) == [2, 1, 0]
        assert getCountingPoints([10, 8, 5, 1, 7], 3, [], []) == [0, 1, 4]
        assert getCountingPoints([0, 10, 8, 5, 1, 7], 2, [], []) == [1, 2]

    def test_requiredEventInLargestPoints(self) -> None:
        assert getCountingPoints(
            [0, 10, 8, 5, 1, 7], 2, ["a", "b", "c", "d", "e", "f"], mockEvents
        ) == [
            1,
            2,
        ]
        assert getCountingPoints(
            [0, 10, 8, 5, 1, 7], 3, ["a", "b", "c", "d", "e", "f"], mockEvents
        ) == [
            1,
            2,
            5,
        ]

    def test_requiredEventNotInLargestPoints(self) -> None:
        assert getCountingPoints([0, 10, 8, 5, 1, 7], 2, ["b"], mockEvents) == [1, 0]

    def test_multipleRequiredEventsNotInLargestPoints(self) -> None:
        assert getCountingPoints(
            [0, 10, 8, 5, 1, 7], 2, ["a", "b", "c", "d", "e", "f"], mockEventsMultipleRequired
        ) == [1, 4]
        assert getCountingPoints(
            [0, 10, 8, 5, 1, 7], 3, ["a", "b", "c", "d", "e", "f"], mockEventsMultipleRequired
        ) == [1, 2, 4]
        assert getCountingPoints(
            [0, 10, 8, 5, 1, 7], 4, ["a", "b", "c", "d", "e", "f"], mockEventsMultipleRequired
        ) == [1, 2, 5, 4]
