from typing import List
from ..utils.processResults import (
    PointsResult,
    getCountingPoints,
)
from ..database.league import League
from ..database.event import Event


def createEvent(id: str, required: bool) -> Event:
    return Event({"id": id, "requiredInTotal": required})


def createLeague(numberOfCountingEvents: int) -> League:
    return League(
        {"numberOfCountingEvents": numberOfCountingEvents, "additionalSettings": {}}
    )


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


def generateResult(
    points: List[int], events: List[str], counting: List[int] = []
) -> List[PointsResult]:
    return [
        PointsResult(
            event=events[index], score=point, type="", counting=index in counting
        )
        for index, point in enumerate(points)
    ]


def generateBaseResults(counting: List[int]) -> List[PointsResult]:
    return generateResult(points, events, counting)


def countingPoints(number: int, required: bool) -> List[PointsResult]:
    return getCountingPoints(
        generateResult(points, events),
        createLeague(number),
        mockEventsMultipleRequired if required else mockEvents,
    )


class Test_GetCountingPoints:
    def test_noRequiredEvents(self) -> None:
        result = getCountingPoints(
            generateResult([1, 2, 3], events), createLeague(3), mockEventsNoRequired
        )
        expectedResult = generateResult(
            [1, 2, 3],
            events,
            [
                2,
                1,
                0,
            ],
        )
        assert result == expectedResult

        result = getCountingPoints(
            generateResult([10, 8, 5, 1, 7], events),
            createLeague(3),
            mockEventsNoRequired,
        )
        expectedResult = generateResult(
            [10, 8, 5, 1, 7],
            events,
            [
                0,
                1,
                4,
            ],
        )
        assert result == expectedResult

        result = getCountingPoints(
            generateResult([0, 10, 8, 5, 1, 7], events),
            createLeague(2),
            mockEventsNoRequired,
        )
        expectedResult = generateResult([0, 10, 8, 5, 1, 7], events, [1, 2])
        assert result == expectedResult

    def test_requiredEventInLargestPoints(self) -> None:
        assert countingPoints(2, False) == generateBaseResults(
            [
                1,
                2,
            ]
        )
        assert countingPoints(3, False) == generateBaseResults(
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
                createLeague(2),
                mockEvents,
            )
            == generateResult(
                [0, 10, 8, 5, 1, 7], ["b", "a", "c", "d", "e", "f"], [1, 0]
            )
        )
        assert (
            getCountingPoints(
                generateResult([0, 10, 8, 5, 1, 7], ["b", "a", "c", "d", "e", "f"]),
                createLeague(2),
                mockEvents,
            )
            == generateResult(
                [0, 10, 8, 5, 1, 7], ["b", "a", "c", "d", "e", "f"], [1, 0]
            )
        )

    def test_multipleRequiredEventsNotInLargestPoints(self) -> None:
        assert countingPoints(2, True) == generateBaseResults(
            [
                1,
                4,
            ]
        )
        assert countingPoints(3, True) == generateBaseResults(
            [
                1,
                2,
                4,
            ]
        )
        assert countingPoints(4, True) == generateBaseResults(
            [
                1,
                2,
                5,
                4,
            ]
        )
