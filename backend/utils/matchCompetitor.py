from typing import Any, List

from ..database import League, Competitor


def matchResultsToCompetitors(results: List[dict], league: League) -> List[dict[str, Any]]:
    competitors = Competitor.getByLeague(league.name)

    return [
        {**result, "competitor": matchResultToCompetitor(result, competitors)}
        for result in results
    ]


def matchResultToCompetitor(
    result: dict, competitors: List[Competitor], league: League
) -> int:
    for competitor in competitors:
        if primaryMatch(result, competitor, league):
            return competitor.id

    for competitor in competitors:
        if secondaryMatch(result, competitor, league):
            return competitor.id

    return Competitor(result).create()


def nameToInitial(name: str) -> str:
    name = name.strip()
    splitName = name.split(" ", 1)

    if len(splitName) > 1:
        return splitName[0][0] + " " + splitName[1]
    else:
        return name


def match(resultProperty: str, competitorProperty: str) -> bool:
    return resultProperty.strip().upper() == competitorProperty.strip.upper()


def primaryMatch(result: dict, competitor: Competitor, league: League) -> bool:
    return match(result["name"], competitor.name) and (
        competitor.course == competitor["course"] or league.leagueScoring == "overall"
    )


def secondaryMatch(result: dict, competitor: Competitor, league: League) -> bool:
    return (
        match(nameToInitial(competitor.name), nameToInitial(result["name"]))
        and (
            competitor.course == competitor["course"]
            or league.leagueScoring == "overall"
        )
        and (
            match(competitor.ageClass, competitor["ageClass"])
            or match(competitor.club, competitor["club"])
        )
    )
