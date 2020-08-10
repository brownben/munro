def assignPoints(data):
    dataWithPoints = []

    for result in data:
        resultWithPoints = result
        points = result.get("file_points", None)

        resultWithPoints["points"] = points if type(points) == int else 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints
