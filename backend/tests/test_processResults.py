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


def createEvent(id: str, required: bool) -> Event:
    return Event({"id": id, "requiredInTotal": required})


mockEvents = [
    createEvent("a", False),
    createEvent("b", True),
    createEvent("c", False),
    createEvent("d", False),
    createEvent("e", False),
    createEvent("f", False),
]

mockEventsMultipleRequired = [
    createEvent("a", False),
    createEvent("b", True),
    createEvent("c", False),
    createEvent("d", False),
    createEvent("e", True),
    createEvent("f", False),
]

points = [0, 10, 8, 5, 1, 7]
events = ["a", "b", "c", "d", "e", "f"]


class Test_GetCountingPoints:
    def test_noRequiredEvents(self) -> None:
        assert getCountingPoints([1, 2, 3], 3, [], []) == [2, 1, 0]
        assert getCountingPoints([10, 8, 5, 1, 7], 3, [], []) == [0, 1, 4]
        assert getCountingPoints([0, 10, 8, 5, 1, 7], 2, [], []) == [1, 2]

    def test_requiredEventInLargestPoints(self) -> None:
        assert getCountingPoints(points, 2, events, mockEvents) == [
            1,
            2,
        ]
        assert getCountingPoints(points, 3, events, mockEvents) == [
            1,
            2,
            5,
        ]

    def test_requiredEventNotInLargestPoints(self) -> None:
        assert getCountingPoints([0, 10, 8, 5, 1, 7], 2, ["b"], mockEvents) == [1, 0]

    def test_multipleRequiredEventsNotInLargestPoints(self) -> None:
        assert getCountingPoints(points, 2, events, mockEventsMultipleRequired) == [
            1,
            4,
        ]
        assert getCountingPoints(points, 3, events, mockEventsMultipleRequired) == [
            1,
            2,
            4,
        ]
        assert getCountingPoints(points, 4, events, mockEventsMultipleRequired) == [
            1,
            2,
            5,
            4,
        ]
