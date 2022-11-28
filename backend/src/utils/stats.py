import statistics


def average(values: list[int]) -> float:
    try:
        return statistics.mean(values)
    except statistics.StatisticsError:
        return 0


def standard_deviation(values: list[int]) -> float:
    try:
        return statistics.stdev(values)
    except statistics.StatisticsError:
        return 0
