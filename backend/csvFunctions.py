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
    if headerRow:
        headerRow[-1] = headerRow[-1].strip()
        for cell in range(len(headerRow)):
            if headerRow[cell].upper() == 'FIRST NAME' or headerRow[cell].upper() == 'FIRSTNAME':
                if 'firstName' not in locations:
                    locations['firstName'] = cell
            elif headerRow[cell].upper() == 'SURNAME':
                if 'surname' not in locations:
                    locations['surname'] = cell
            elif headerRow[cell].upper() == 'NAME':
                if 'name' not in locations:
                    locations['name'] = cell
            elif headerRow[cell].upper() == 'TEXT1' or headerRow[cell].upper() == 'CATEGORY' or headerRow[cell].upper() == 'AGECLASS' or headerRow[cell].upper() == 'AGE CLASS':
                if 'ageClass' not in locations:
                    locations['ageClass'] = cell
            elif headerRow[cell].upper() == 'CITY' or headerRow[cell].upper() == 'CLUB':
                if 'club' not in locations:
                    locations['club'] = cell
            elif headerRow[cell].upper() == 'COURSE' or headerRow[cell].upper() == 'COURSECLASS':
                if 'course' not in locations:
                    locations['course'] = cell
            elif headerRow[cell].upper() == 'TIME' or headerRow[cell].upper() == 'RACETIME':
                if 'time' not in locations:
                    locations['time'] = cell
            elif headerRow[cell].upper() == 'PL' or headerRow[cell].upper() == 'POSITION':
                if 'position' not in locations:
                    locations['position'] = cell
            elif headerRow[cell].upper() == 'NC' or headerRow[cell].upper() == 'NONCOMPETITIVE':
                if 'nonCompetitive' not in locations:
                    locations['nonCompetitive'] = cell
            elif headerRow[cell].upper() == 'STATUS' or headerRow[cell].upper() == 'CLASSIFIER':
                if 'status' not in locations:
                    locations['status'] = cell
        if checkAllHeadersPresent(list(locations.keys())):
            return locations
        else:
            return False
    else:
        return False


def checkAllHeadersPresent(list):
    # Check all expected field are in the file
    if ('firstName' in list and 'surname' in list) or 'name' in list:
        otherHeaders = ['ageClass', 'club', 'course',
                        'time', 'position', 'nonCompetitive', 'status']
        for header in otherHeaders:
            if header not in list:
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
        except:
            parsedRow['position'] = ''
        parsedRow['incomplete'] = row[headerLocations['nonCompetitive']] == 'Y' or row[headerLocations['nonCompetitive']] == '1' or (
            row[headerLocations['status']] != '' and row[headerLocations['status']] != '0')

        parsedData.append(parsedRow)

    return parsedData
