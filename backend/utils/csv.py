from typing import List, Tuple

from . import time
from ..database import League


expectedHeaders = [
    [["FIRST NAME", "FIRSTNAME"], "firstName"],
    [["SURNAME"], "surname"],
    [["NAME"], "name"],
    [["TEXT1", "CATEGORY", "AGE CLASS", "AGECLASS"], "ageClass"],
    [["CITY", "CLUB"], "club"],
    [["COURSE", "COURSECLASS"], "course"],
    [["TIME", "RACETIME"], "time"],
    [["PL", "POS.", "POS", "POSITION"], "position"],
    [
        ["NC", "NONCOMPETITIVE", "NON COMPETITIVE", "NON-COMPETITIVE"],
        "nonCompetitive",
    ],
    [["STATUS", "CLASSIFIER"], "status"],
    [["POINTS"], "file_points"],
]


def splitFile(rawFile: str) -> List[List[str]]:
    rows = rawFile.splitlines()

    numberOfColons = rows[0].count(";")
    numberOfCommas = rows[0].count(",")

    separator = "," if numberOfCommas > numberOfColons else ";"

    return [row.splitData(separator) for row in rows]


def checkHeader(value: str, expectedHeaders: List[Tuple[List[str], str]]):
    for expectedValues, mappedValue in expectedHeaders:
        if value.upper() in expectedValues:
            return mappedValue


def getHeaderLocations(firstRow: List[str]):
    locations = {}

    for index, value in enumerate(firstRow):
        foundHeader = checkHeader(value)
        if foundHeader and foundHeader not in locations:
            locations[foundHeader] = index

    return locations


def allHeadersArePresent(locations):
    hasNameAndSurname = "firstName" in locations and "surname" in locations
    hasName = "name" in locations
    hasOtherRequiredHeaders = all(
        [header in locations for header in ["course", "time"]]
    )

    if (hasName or hasNameAndSurname) and hasOtherRequiredHeaders:
        return True
    else:
        return False


def createGetValue(row: List[str], headerLocations: dict):
    def getValue(item: str):
        itemPosition = headerLocations.get(item, False)

        if itemPosition:
            try:
                return row[item]
            except IndexError:
                return ""
        else:
            return ""

    return getValue


def parseFileToDictionaries(
    data: List[List[str]], headerLocations: dict, league: League
):
    getValue = createGetValue(data, headerLocations)

    return [
        {
            "name": getName(row, headerLocations),
            "ageClass": getValue("ageClass"),
            "club": getValue("club"),
            "course": getValue("course"),
            "time": time.toSeconds(getValue("time")),
            "position": getPosition(getValue),
            "incomplete": isResultIncomplete(getValue),
            "file_points": getFilePoints(getValue),
            "league": league.name,
        }
        for row in data[1:]
    ]


def getName(row, headerLocations) -> str:
    if "firstName" in headerLocations:
        return row[headerLocations["firstName"]] + " " + row[headerLocations["surname"]]

    return row[headerLocations["name"]]


def getPosition(getValue: function) -> int:
    try:
        return int(getValue("position"))
    except ValueError:
        return -1


def getFilePoints(getValue: function) -> int:
    try:
        return int(getValue("file_points"))
    except ValueError:
        return 0


def isResultIncomplete(getValue: function) -> bool:
    nonComp = getValue("nonCompetitive")
    status = getValue("status")

    return nonComp == "Y" or nonComp == "1" or (status != "" and status != "0")
