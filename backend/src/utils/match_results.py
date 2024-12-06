from collections.abc import Iterable

from ..schemas import Competitor
from .import_file import ImportedResult
from .names import matches_equivalent_name, name_to_initial


def strings_match(stringA: str, stringB: str) -> bool:
    """Check if 2 strings are equivalent when uppercase"""

    return stringA.strip().upper() == stringB.strip().upper()


def match_result_to_competitor(
    result: ImportedResult,
    competitors: Iterable[Competitor],
) -> Competitor | None:
    """Find a competitor which matches the given result"""

    def name_matches(competitor: Competitor) -> bool:
        return strings_match(result.name, competitor.name)

    def initial_matches(competitor: Competitor) -> bool:
        return name_to_initial(result.name) == name_to_initial(competitor.name)

    for competitor in competitors:
        if name_matches(competitor):
            return competitor

    for competitor in competitors:
        has_matching_age_class = strings_match(result.age_class, competitor.age_class)
        has_matching_club = strings_match(result.club, competitor.club)

        if (
            initial_matches(competitor)
            or matches_equivalent_name(result.name, competitor.name)
        ) and (has_matching_age_class or has_matching_club):
            return competitor

    return None
