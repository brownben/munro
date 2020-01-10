from database import results


def calculate(league):
    dynamicResults = results.getDynamicResults(league)

    for result in dynamicResults:
        points = results.getResultsForCompetitorNonDynamic(result["competitor"])

        if result["type"] == "max":
            results.updatePoints(result["id"], max(points))
        elif result["type"] == "average":
            average = round(sum(points) / len(points))
            results.updatePoints(result["id"], average)

