from ..schemas import LeagueResult

DYNAMIC_RESULT_TYPES = {"max", "average", "manual"}


def calculate_dynamic_results(league_result: LeagueResult) -> LeagueResult:
    standard_scores = [
        point.score
        for point in league_result.points
        if point and point.type not in DYNAMIC_RESULT_TYPES
    ]

    if len(standard_scores) != len(league_result.points):
        for point in league_result.points:
            if point:
                if len(standard_scores) == 0 and point.type in {"max", "average"}:
                    point.score = 0
                elif point.type == "max":
                    point.score = max(standard_scores)
                elif point.type == "average":
                    point.score = round(sum(standard_scores) / len(standard_scores))

    return league_result
