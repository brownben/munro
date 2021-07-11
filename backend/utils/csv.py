from typing import Any, Callable, Dict, List, Tuple, Union

from .helpers import toSeconds
from ..database.league import League
from ..database.event import Event


expectedHeaders: List[Tuple[List[str], str]] = [
    (["FIRST NAME", "FIRSTNAME"], "firstName"),
    (["SURNAME"], "surname"),
    (["NAME"], "name"),
    (["TEXT1", "CATEGORY", "AGE CLASS", "AGECLASS"], "ageClass"),
    (["CITY", "CLUB"], "club"),
    (["COURSE", "COURSECLASS"], "course"),
    (["TIME", "RACETIME"], "time"),
    (["PL", "POS.", "POS", "POSITION"], "position"),
    (
        ["NC", "NONCOMPETITIVE", "NON COMPETITIVE", "NON-COMPETITIVE"],
        "nonCompetitive",
    ),
    (["STATUS", "CLASSIFIER"], "status"),
    (["POINTS"], "file_points"),
]


def splitFile(rawFile: str) -> List[List[str]]:
    rows = rawFile.splitlines()

    numberOfColons = rows[0].count(";")
    numberOfCommas = rows[0].count(",")

    separator = "," if numberOfCommas > numberOfColons else ";"

    return [row.split(separator) for row in rows]


def checkHeader(value: str) -> Union[str, None]:
    for expectedValues, mappedValue in expectedHeaders:
        if value.strip().upper() in expectedValues:
            return mappedValue

    return None


def getHeaderLocations(firstRow: List[str]) -> Dict[str, int]:
    locations = {}

    for index, value in enumerate(firstRow):
        foundHeader = checkHeader(value)
        if foundHeader and foundHeader not in locations:
            locations[foundHeader] = index

    return locations


def allHeadersArePresent(locations: Dict[str, int]) -> bool:
    hasNameAndSurname = "firstName" in locations and "surname" in locations
    hasName = "name" in locations

    otherHeaders = ["course", "time"]
    hasOtherRequiredHeaders = all([header in locations for header in otherHeaders])

    if (hasName or hasNameAndSurname) and hasOtherRequiredHeaders:
        return True
    else:
        return False


def createGetValue(headerLocations: Dict[str, int]) -> Callable[[List[str], str], Any]:
    def getValue(row: List[str], item: str) -> str:
        itemPosition = headerLocations.get(item, False)

        if itemPosition:
            try:
                return row[itemPosition]
            except IndexError:
                return ""
        else:
            return ""

    return getValue


def parseFileToDictionaries(
    data: List[List[str]], headerLocations: Dict[str, int], league: League, event: Event
) -> List[Dict[str, Any]]:
    getValue = createGetValue(headerLocations)

    rowWithFixedTimes = fixTimesFromExcel(data[1:], headerLocations["time"])

    return [
        {
            "name": getName(row, headerLocations),
            "ageClass": getValue(row, "ageClass"),
            "club": getValue(row, "club"),
            "course": getValue(row, "course"),
            "time": toSeconds(getValue(row, "time")),
            "position": getPosition(row, getValue),
            "incomplete": isResultIncomplete(row, getValue),
            "file_points": getFilePoints(row, getValue),
            "league": league.getLeagueOfCompetitors(),
            "event": event.id,
            "type": "",
        }
        for row in rowWithFixedTimes
    ]


def getName(row: List[str], headerLocations: Dict[str, int]) -> str:
    if "firstName" in headerLocations:
        return row[headerLocations["firstName"]] + " " + row[headerLocations["surname"]]

    return row[headerLocations["name"]]


def getPosition(row: List[str], getValue: Callable[[List[str], str], Any]) -> int:
    try:
        return int(getValue(row, "position"))
    except ValueError:
        return -1


def getFilePoints(row: List[str], getValue: Callable[[List[str], str], Any]) -> int:
    try:
        return int(getValue(row, "file_points"))
    except ValueError:
        return 0


def isResultIncomplete(
    row: List[str], getValue: Callable[[List[str], str], Any]
) -> bool:
    nonComp = getValue(row, "nonCompetitive")
    status = getValue(row, "status")

    return nonComp == "Y" or nonComp == "1" or (status != "" and status != "0")


def fixTimesFromExcel(results: List[List[str]], time: int) -> List[List[str]]:
    def resultHasHoursNoSeconds(result: List[str]) -> bool:
        hasHours = result[time].count(":") >= 2
        hasZeroSeconds = result[time][-3:] == ":00"

        return hasHours and hasZeroSeconds

    resultsMissingSeconds = all([resultHasHoursNoSeconds(result) for result in results])

    if resultsMissingSeconds:
        for result in results:
            result[time] = result[time][:-3]

    return results
