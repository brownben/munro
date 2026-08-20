from ..schemas import LeagueResult

DYNAMIC_RESULT_TYPES = {"max", "average", "manual", "third"}
CALCULATED_RESULT_TYPES = {"max", "average", "third"}


def calculate_dynamic_results(league_result: LeagueResult) -> LeagueResult:
    standard_scores = [
        point.score
        for point in league_result.points
        if point and point.type not in DYNAMIC_RESULT_TYPES
    ]

    if len(standard_scores) != len(league_result.points):
        for point in league_result.points:
            if point:
                if not standard_scores and point.type in CALCULATED_RESULT_TYPES:
                    point.score = 0
                elif point.type == "max":
                    point.score = max(standard_scores)
                elif point.type == "average":
                    point.score = round(sum(standard_scores) / len(standard_scores))
                elif point.type == "third":
                    sorted_scores = sorted(standard_scores, reverse=True)
                    point.score = sorted_scores[2] if len(sorted_scores) >= 3 else 0

    return league_result
