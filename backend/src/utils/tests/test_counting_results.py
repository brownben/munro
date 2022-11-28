import unittest
from typing import Iterable

from ...schemas import League, LeagueEvent
from ...schemas import LeagueResultScore as Result
from ..counting_results import find_counting_results


def league_config(number_of_counting_events: int) -> League:
    return League(
        number_of_counting_events=number_of_counting_events,
        name="",
        tagline="",
        year=0,
        coordinator="",
        more_information="",
        website="http://example.com",
        scoring_method="",
        competitor_pool="",
    )


def generate_results(*points: int) -> list[Result]:
    return [
        Result(event=str(index), score=point, counting=False, type="")
        for index, point in enumerate(points)
    ]


def event(id: str, compulsory: bool = False, group: str = "") -> LeagueEvent:
    return LeagueEvent(
        id=0,
        event=id,
        league="",
        compulsory=compulsory,
        league_group=group,
        overridden_scoring_method="",
        expected_courses={},
    )


def counting_results(
    results: list[Result], counting_events: int, events: list[LeagueEvent] = []
) -> Iterable[Result]:
    return find_counting_results(
        results, league=league_config(counting_events), events=events
    )


class TestCountingEvents(unittest.TestCase):
    def test_no_results_or_events(self) -> None:
        self.assertEqual(find_counting_results([], league_config(1)), set())

    def test_no_results(self) -> None:
        self.assertEqual(
            find_counting_results(
                results=[],
                events=[event("A"), event("B")],
                league=league_config(1),
            ),
            set(),
        )

    def test_picks_all_results_if_less_than_maximum(self) -> None:
        results = generate_results(50, 45, 46)

        self.assertEqual(
            counting_results(results, counting_events=3),
            set(results),
        )
        self.assertEqual(
            counting_results(results, counting_events=5),
            set(results),
        )
        self.assertEqual(
            counting_results(results, counting_events=10),
            set(results),
        )

    def test_picks_all_results_if_more_than_maximum(self) -> None:
        results = generate_results(50, 45, 46)
        self.assertEqual(
            counting_results(results, counting_events=0),
            set([]),
        )
        self.assertEqual(
            counting_results(results, counting_events=1),
            set([results[0]]),
        )
        self.assertEqual(
            counting_results(results, counting_events=2),
            set([results[0], results[2]]),
        )

        results = generate_results(42, 52, 12, 36, 51)
        self.assertEqual(
            counting_results(results, counting_events=1),
            set([results[1]]),
        )
        self.assertEqual(
            counting_results(results, counting_events=2),
            set([results[1], results[4]]),
        )
        self.assertEqual(
            counting_results(results, counting_events=3),
            set([results[1], results[4], results[0]]),
        )
        self.assertEqual(
            counting_results(results, counting_events=5),
            set(results),
        )

    def test_picks_compulsory_event_if_maximum(self) -> None:
        results = generate_results(50, 45, 46)
        self.assertEqual(
            counting_results(results, counting_events=1, events=[event("0", True)]),
            set([results[0]]),
        )
        self.assertEqual(
            counting_results(results, counting_events=2, events=[event("0", True)]),
            set([results[0], results[2]]),
        )
        self.assertEqual(
            counting_results(
                results,
                counting_events=1,
                events=[event("0", True), event("1"), event("2")],
            ),
            set([results[0]]),
        )

        results = generate_results(42, 52, 12, 36, 51)
        self.assertEqual(
            counting_results(results, counting_events=1, events=[event("1", True)]),
            set([results[1]]),
        )
        self.assertEqual(
            counting_results(results, counting_events=2, events=[event("4", True)]),
            set([results[1], results[4]]),
        )

    def test_compulsory_no_result(self) -> None:
        results = generate_results(50, 45, 46)
        self.assertEqual(
            counting_results(results, counting_events=1, events=[event("7", True)]),
            set(),
        )
        self.assertEqual(
            counting_results(results, counting_events=2, events=[event("7", True)]),
            set([results[0]]),
        )

        results = generate_results(42, 52, 12, 36, 51)
        self.assertEqual(
            counting_results(results, counting_events=3, events=[event("7", True)]),
            set([results[1], results[4]]),
        )
        self.assertEqual(
            counting_results(
                results, counting_events=3, events=[event("7", True), event("A", True)]
            ),
            set([results[1]]),
        )

    def test_compulsory_event_not_largest(self) -> None:
        results = generate_results(50, 45, 46)
        self.assertEqual(
            counting_results(results, counting_events=1, events=[event("1", True)]),
            set([results[1]]),
        )
        self.assertEqual(
            counting_results(results, counting_events=2, events=[event("1", True)]),
            set(results[:2]),
        )

        results = generate_results(42, 52, 12, 36, 51)
        self.assertEqual(
            counting_results(results, counting_events=3, events=[event("3", True)]),
            set([results[1], results[4], results[3]]),
        )
        self.assertEqual(
            counting_results(
                results, counting_events=3, events=[event("3", True), event("4", True)]
            ),
            set([results[1], results[4], results[3]]),
        )
        self.assertEqual(
            counting_results(
                results,
                counting_events=3,
                events=[event("3", True), event("4", True), event("2", True)],
            ),
            set([results[2], results[4], results[3]]),
        )

    def test_league_groups_would_have_been_picked(self) -> None:
        results = generate_results(50, 45, 59, 41, 48)

        self.assertEqual(
            find_counting_results(
                results,
                events=[event("0", group="Short"), event("2", group="Short")],
                league=league_config(number_of_counting_events=2),
                league_groups={"Short": (0, 3)},
            ),
            set([results[0], results[2]]),
        )
        self.assertEqual(
            find_counting_results(
                results,
                events=[event("0", group="Short"), event("2", group="Short")],
                league=league_config(number_of_counting_events=2),
                league_groups={"Short": (0, 2)},
            ),
            set([results[0], results[2]]),
        )
        self.assertEqual(
            find_counting_results(
                results,
                events=[event("0", group="Short"), event("2", group="Short")],
                league=league_config(number_of_counting_events=1),
                league_groups={"Short": (0, 2)},
            ),
            set([results[2]]),
        )
        self.assertEqual(
            find_counting_results(
                results,
                events=[event("0", group="Short"), event("2", group="Short")],
                league=league_config(number_of_counting_events=3),
                league_groups={"Short": (0, 2)},
            ),
            set([results[0], results[2], results[4]]),
        )

    def test_league_groups_too_many_for_group(self) -> None:
        results = generate_results(50, 45, 59, 41, 48)

        self.assertEqual(
            find_counting_results(
                results,
                events=[event("0", group="Short"), event("2", group="Short")],
                league=league_config(number_of_counting_events=2),
                league_groups={"Short": (0, 1)},
            ),
            set([results[2], results[4]]),
        )
        self.assertEqual(
            find_counting_results(
                results,
                events=[
                    event("0", group="Short"),
                    event("2", group="Short"),
                    event("4", group="Short"),
                    event("3", group="Short"),
                ],
                league=league_config(number_of_counting_events=3),
                league_groups={"Short": (0, 2)},
            ),
            set([results[0], results[2], results[1]]),
        )
        self.assertEqual(
            find_counting_results(
                results,
                events=[
                    event("0", group="Short"),
                    event("2", group="Short"),
                    event("4", group="Short"),
                    event("3", group="Short"),
                ],
                league=league_config(number_of_counting_events=3),
                league_groups={"Short": (0, 0)},
            ),
            set([results[1]]),
        )

    def test_league_groups_too_few_for_group(self) -> None:
        results = generate_results(50, 45, 59, 41, 48)

        self.assertEqual(
            find_counting_results(
                results,
                events=[event("0", group="Short"), event("2", group="Short")],
                league=league_config(number_of_counting_events=2),
                league_groups={"Short": (1, 5)},
            ),
            set([results[2], results[0]]),
        )
        self.assertEqual(
            find_counting_results(
                results,
                events=[
                    event("0", group="Short"),
                    event("2", group="Short"),
                    event("4", group="Short"),
                    event("3", group="Short"),
                ],
                league=league_config(number_of_counting_events=3),
                league_groups={"Short": (2, 3)},
            ),
            set([results[0], results[2], results[4]]),
        )
