def assignPosition(results):
    # Assign 1st, 2nd, 3rd, etc based off total points
    lastPosition = 0
    position = 0
    lastPoints = -1
    for result in results:
        if result["totalPoints"] == lastPoints:
            result["position"] = lastPosition
            position += 1
        else:
            position += 1
            lastPosition = position
            result["position"] = position

        lastPoints = result["totalPoints"]

    return results


def assignPositionsMultipleCourses(results):
    lastCourse = False
    lastPosition = 0
    lastTime = -1
    numberTied = 1

    for result in results:
        if result["course"] != lastCourse:
            lastPosition = 0
            lastCourse = result["course"]
            lastTime = -1
            numberTied = 1

        if result["time"] != lastTime:
            lastTime = result["time"]
            lastPosition += numberTied
            numberTied = 0

        if not result["incomplete"]:
            numberTied += 1
            result["position"] = lastPosition

        else:
            result["position"] = -1

    return results
