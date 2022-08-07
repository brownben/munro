import statistics
from typing import List


def average(values: List[int]) -> float:
    try:
        return statistics.mean(values)
    except statistics.StatisticsError:
        return 0


def standard_deviation(values: List[int]) -> float:
    try:
        return statistics.stdev(values)
    except statistics.StatisticsError:
        return 0
