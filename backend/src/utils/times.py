def parse_time(time: str) -> int:
    """Parse an elapsed time string into seconds"""

    splitTime = time.split(":")

    if time == "" or len(splitTime) not in [2, 3]:
        return 0

    try:
        if len(splitTime) == 2:
            hours = 0
            minutes = int(splitTime[0])
            seconds = int(splitTime[1])
        else:
            hours = int(splitTime[0])
            minutes = int(splitTime[1])
            seconds = int(splitTime[2])

        return (hours * 3600) + (minutes * 60) + seconds

    except ValueError:
        return 0


def is_valid_time(string: str) -> bool:
    """Check if a string is a valid elapsed time"""

    return parse_time(string) != 0
