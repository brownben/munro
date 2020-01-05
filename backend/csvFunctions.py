# Functions to read and parse the CSV files into processable records


def splitData(rawData):
    # Split CSV into 2D Array
    rows = rawData.split('\n')
    splitData = []
    for row in rows:
        colon = row.strip().split(';')
        comma = row.strip().split(',')
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
        [['FIRST NAME', 'FIRSTNAME'], 'firstName'],
        [['SURNAME'], 'surname'],
        [['NAME'], 'name'],
        [['TEXT1', 'CATEGORY', 'AGE CLASS', 'AGECLASS'], 'ageClass'],
        [['CITY', 'CLUB'], 'club'],
        [['COURSE', 'COURSECLASS'], 'course'],
        [['TIME', 'RACETIME'], 'time'],
        [['PL', 'POS.', 'POS', 'POSITION'], 'position'],
        [['NC', 'NONCOMPETITIVE'], 'nonCompetitive'],
        [['STATUS', 'CLASSIFIER'], 'status'],
    ]
    if headerRow:
        headerRow[-1] = headerRow[-1].strip()
        for cell in enumerate(headerRow):
            for header in expectedHeaders:
                if headerRow[cell].upper() in header[0] and header[1] not in locations:
                    locations[header[1]] = cell
                    break

        if checkAllHeadersPresent(list(locations.keys())):
            return locations
        else:
            return False
    else:
        return False


def checkAllHeadersPresent(headersList):
    # Check all expected field are in the file
    if ('firstName' in headersList and 'surname' in headersList) or 'name' in headersList:
        otherHeaders = ['ageClass', 'club', 'course',
                        'time', 'position', 'nonCompetitive', 'status']
        for header in otherHeaders:
            if header not in headersList:
                return False
        return True
    else:
        return False


def timeToSeconds(time):
    # Convert time from HH:MM:SS and MMM:SS to seconds for easier calculations
    if time != '':
        splitTime = time.split(':')
        if len(splitTime) == 2:
            hours = 0
            minutes = int(splitTime[0])
            seconds = int(splitTime[1])
        elif len(splitTime) == 3:
            hours = int(splitTime[0])
            minutes = int(splitTime[1])
            seconds = int(splitTime[2])
        else:
            return 0

        return (hours * 3600) + (minutes * 60) + seconds
    else:
        return 0


def parseToObjects(data, headerLocations):
    # Parse each row into an object to make it clearer to read
    parsedData = []

    for row in data[1:]:
        parsedRow = {}

        if 'firstName' in headerLocations:
            parsedRow['name'] = row[headerLocations['firstName']] + \
                ' ' + row[headerLocations['surname']]
        else:
            parsedRow['name'] = row[headerLocations['name']]

        parsedRow['ageClass'] = row[headerLocations['ageClass']]
        parsedRow['club'] = row[headerLocations['club']]
        parsedRow['course'] = row[headerLocations['course']]
        parsedRow['time'] = timeToSeconds(row[headerLocations['time']])
        try:
            parsedRow['position'] = int(row[headerLocations['position']])
        except ValueError:
            parsedRow['position'] = ''
        parsedRow['incomplete'] = row[headerLocations['nonCompetitive']] == 'Y' or row[headerLocations['nonCompetitive']] == '1' or (
            row[headerLocations['status']] != '' and row[headerLocations['status']] != '0')

        parsedData.append(parsedRow)

    return parsedData
