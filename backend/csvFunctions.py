# Functions to read and parse the CSV files into processable records


def splitData(rawData):
    # Split CSV into 2D Array
    rows = rawData.split("\n")
    splitData = []
    for row in rows:
        colon = row.strip().split(";")
        comma = row.strip().split(",")
        if len(comma) > len(colon):
            splitData.append(comma)
        else:
            splitData.append(colon)

    return splitData


def findHeaders(data):
    # Find the location of each field in the CSV file by reading the header
    locations = {}
    headerRow = data[0]

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

    if not headerRow:
        return False

    headerRow[-1] = headerRow[-1].strip()
    for cell, value in enumerate(headerRow):
        locations = checkHeader(cell, value, expectedHeaders, locations)

    return checkAllHeadersPresent(list(locations.keys()), locations)


def checkHeader(cell, value, expectedHeaders, locations):
    for header in expectedHeaders:
        if value.upper() in header[0] and header[1] not in locations:
            locations[header[1]] = cell
            return locations
    return locations


def checkAllHeadersPresent(headersList, locations):
    # Check all expected field are in the file
    otherHeaders = [
        "course",
        "time",
    ]

    hasNameAndSurname = "firstName" in headersList and "surname" in headersList
    hasName = "name" in headersList
    hasOtherHeaders = all([header in headersList for header in otherHeaders])

    if not ((hasName or hasNameAndSurname) and hasOtherHeaders):
        return False

    return locations


def timeToSeconds(time):
    # Convert time from HH:MM:SS and MMM:SS to seconds for easier calculations
    splitTime = time.split(":")
    if time == "" or len(splitTime) not in [2, 3]:
        return 0

    if len(splitTime) == 2:
        hours = 0
        minutes = int(splitTime[0])
        seconds = int(splitTime[1])
    elif len(splitTime) == 3:
        hours = int(splitTime[0])
        minutes = int(splitTime[1])
        seconds = int(splitTime[2])

    return (hours * 3600) + (minutes * 60) + seconds


def parseToObjects(data, headerLocations):
    # Parse each row into an object to make it clearer to read
    parsedData = []

    for row in data[1:]:
        parsedRow = {}

        parsedRow["name"] = getName(row, headerLocations)
        parsedRow["ageClass"] = getDataFromRow(row, headerLocations, "ageClass")
        parsedRow["club"] = getDataFromRow(row, headerLocations, "club")
        parsedRow["course"] = row[headerLocations["course"]]
        parsedRow["time"] = timeToSeconds(row[headerLocations["time"]])

        if headerLocations.get("file_points", False) and listGet(
            row, headerLocations["file_points"]
        ):
            parsedRow["file_points"] = int(row[headerLocations["file_points"]])

        try:
            parsedRow["position"] = int(listGet(row, headerLocations["position"]))
        except ValueError:
            parsedRow["position"] = ""

        parsedRow["incomplete"] = resultIncomplete(row, headerLocations)

        parsedData.append(parsedRow)

    return parsedData


def resultIncomplete(row, headerLocations):
    nonCompetitive = getDataFromRow(row, headerLocations, "nonCompetitive")
    status = getDataFromRow(row, headerLocations, "status")

    return (
        nonCompetitive == "Y"
        or nonCompetitive == "1"
        or (status != "" and status != "0")
    )


def getName(row, headerLocations):
    if "firstName" in headerLocations:
        return row[headerLocations["firstName"]] + " " + row[headerLocations["surname"]]

    return row[headerLocations["name"]]


def getDataFromRow(row, headers, item):
    itemPosition = headers.get(item, False)

    if itemPosition:
        return listGet(row, itemPosition)
    else:
        return ""


def listGet(array, item, fallback=""):
    item = array[item : item + 1]

    if item:
        return item[0]
    else:
        return fallback
