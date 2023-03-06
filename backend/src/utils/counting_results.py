from itertools import groupby
from typing import Iterable, Optional, Set

from ..schemas import League, LeagueClass, LeagueEvent
from ..schemas import LeagueResultScore as Result


def find_counting_results(
    results: Iterable[Optional[Result]],
    league: League,
    events: list[LeagueEvent] = [],
    league_groups: dict[int, tuple[int, int]] = {},
    league_class: Optional[LeagueClass] = None,
) -> Set[Result]:
    """Returns the results that are used as their counting scores when calculating their total points"""

    if league_class is not None:
        max_number_of_counting_results = (
            league_class.number_of_counting_events or league.number_of_counting_events
        )
    else:
        max_number_of_counting_results = league.number_of_counting_events

    remaining_results: Set[Result] = set(result for result in results if result)
    counting_results: Set[Result] = set()

    # If any results are marked as compulsory they will always be included in the total
    compulsory_events = {event.event for event in events if event.compulsory}
    for result in remaining_results:
        if result.event in compulsory_events:
            counting_results.add(result)
    remaining_results.difference_update(counting_results)

    # If they haven't got a score for a compulsory event, they can't use another result
    if len(counting_results) < len(compulsory_events):
        max_number_of_counting_results -= len(compulsory_events) - len(counting_results)

    # If a subset of a league (a group) has a required minimum/ maximum number of events counting
    groups: dict[int, list[str]] = {
        group_name: [event.event for event in events_in_group]
        for group_name, events_in_group in groupby(events, lambda x: x.league_group)
        if group_name
    }
    for group_name, group_events in groups.items():
        group_min, group_max = league_groups[group_name]

        results_in_group = {
            result for result in remaining_results if result.event in group_events
        }
        sorted_results_in_group = sorted(
            results_in_group, key=lambda x: x.score, reverse=True
        )

        # Add the top results up to the minimum counting
        counting_results.update(sorted_results_in_group[:group_min])
        remaining_results.difference_update(counting_results)
        # Remove the bottom results which included would take the number over the maximum
        remaining_results.difference_update(sorted_results_in_group[group_max:])

    # Then add the largest results left until the max number is reached
    number_of_results_left = max_number_of_counting_results - len(counting_results)
    sorted_results = sorted(
        list(remaining_results), key=lambda x: x.score, reverse=True
    )

    counting_results.update(sorted_results[:number_of_results_left])

    return counting_results
