from typing import List
from ..utils.processResults import (
    PointsResult,
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


mockEventsNoRequired = [
    createEvent("a", False),
    createEvent("b", False),
    createEvent("c", False),
    createEvent("d", False),
    createEvent("e", False),
    createEvent("f", False),
]

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


def generateResult(points: List[int], events: List[str], counting: List[int] = []):
    return [
        PointsResult(
            event=events[index], score=point, type="", counting=index in counting
        )
        for index, point in enumerate(points)
    ]


class Test_GetCountingPoints:
    def test_noRequiredEvents(self) -> None:
        assert getCountingPoints(
            generateResult([1, 2, 3], events), 3, mockEventsNoRequired
        ) == generateResult(
            [1, 2, 3],
            events,
            [
                2,
                1,
                0,
            ],
        )
        assert getCountingPoints(
            generateResult([10, 8, 5, 1, 7], events), 3, mockEventsNoRequired
        ) == generateResult(
            [10, 8, 5, 1, 7],
            events,
            [
                0,
                1,
                4,
            ],
        )
        assert getCountingPoints(
            generateResult([0, 10, 8, 5, 1, 7], events), 2, mockEventsNoRequired
        ) == generateResult([0, 10, 8, 5, 1, 7], events, [1, 2])

    def test_requiredEventInLargestPoints(self) -> None:
        assert getCountingPoints(
            generateResult(points, events), 2, mockEvents
        ) == generateResult(
            points,
            events,
            [
                1,
                2,
            ],
        )
        assert getCountingPoints(
            generateResult(points, events), 3, mockEvents
        ) == generateResult(
            points,
            events,
            [
                1,
                2,
                5,
            ],
        )

    def test_requiredEventNotInLargestPoints(self) -> None:
        assert (
            getCountingPoints(
                generateResult([0, 10, 8, 5, 1, 7], ["b", "a", "c", "d", "e", "f"]),
                2,
                mockEvents,
            )
            == generateResult(
                [0, 10, 8, 5, 1, 7], ["b", "a", "c", "d", "e", "f"], [1, 0]
            )
        )
        assert (
            getCountingPoints(
                generateResult([0, 10, 8, 5, 1, 7], ["b", "a", "c", "d", "e", "f"]),
                2,
                mockEvents,
            )
            == generateResult(
                [0, 10, 8, 5, 1, 7], ["b", "a", "c", "d", "e", "f"], [1, 0]
            )
        )

    def test_multipleRequiredEventsNotInLargestPoints(self) -> None:
        assert getCountingPoints(
            generateResult(points, events), 2, mockEventsMultipleRequired
        ) == generateResult(
            points,
            events,
            [
                1,
                4,
            ],
        )
        assert getCountingPoints(
            generateResult(points, events), 3, mockEventsMultipleRequired
        ) == generateResult(
            points,
            events,
            [
                1,
                2,
                4,
            ],
        )
        assert getCountingPoints(
            generateResult(points, events), 4, mockEventsMultipleRequired
        ) == generateResult(
            points,
            events,
            [
                1,
                2,
                5,
                4,
            ],
        )
