from typing import Any, List, Dict

from ..database.league import League
from ..database.competitor import Competitor

Result = Dict[str, Any]


def matchResultsToCompetitors(results: List[Result], league: League) -> List[Result]:
    competitors = Competitor.getByLeague(league.name)

    return [
        {**result, "competitor": matchResultToCompetitor(result, competitors, league)}
        for result in results
    ]


def matchResultToCompetitor(
    result: Result, competitors: List[Competitor], league: League
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
    return resultProperty.strip().upper() == competitorProperty.strip().upper()


def primaryMatch(result: Result, competitor: Competitor, league: League) -> bool:
    return match(result["name"], competitor.name) and (
        competitor.course == result["course"] or league.leagueScoring == "overall"
    )


def secondaryMatch(result: Result, competitor: Competitor, league: League) -> bool:
    return (
        match(nameToInitial(competitor.name), nameToInitial(result["name"]))
        and (competitor.course == result["course"] or league.leagueScoring == "overall")
        and (
            match(competitor.ageClass, result["ageClass"])
            or match(competitor.club, result["club"])
        )
    )
