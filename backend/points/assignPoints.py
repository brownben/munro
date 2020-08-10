from .positionBased import (
    assignPoints as assignPointsPosition,
    assignPoints99WithDraw as assignPointsPosition99WithDraw,
)
from .timeFromAverageBased import assignPoints as assignPointsTimeAverage
from .fileBased import assignPoints as assignPointsFile


def assignPoints(data, leagueScoringMethod):
    # Choses which points algorithm to use
    if "position99average" in leagueScoringMethod:
        return assignPointsPosition99WithDraw(data)
    elif "position" in leagueScoringMethod:
        return assignPointsPosition(data, leagueScoringMethod)
    elif "timeAverage" in leagueScoringMethod:
        return assignPointsTimeAverage(data, leagueScoringMethod)
    elif "file" in leagueScoringMethod:
        return assignPointsFile(data)
    else:
        return False
