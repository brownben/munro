def splitData(rawData):
    # Split CSV into 2D Array
    rows = rawData.split('\n')
    splitData = []
    for row in rows:
        splitData.append(row.strip().split(';'))
    return splitData


def checkAllHeadersPresent(list):
    # Check all expected field are in the file
    if ('firstName' in list and 'surname' in list) or 'name' in list:
        otherHeaders = ['ageClass','club','course','time','position','nonCompetitive','status']
        for header in otherHeaders:
            if header not in list:
                return False
        return True
    else:
        return False

def findHeaders(data):
    # Find the location of each field in the CSV file by reading the header
    locations = {}
    headerRow = data[0]
    headerRow[-1] = headerRow[-1].strip()
    for cell in range(len(headerRow)):
        if headerRow[cell].upper() == 'FIRST NAME':
            locations['firstName'] = cell
        elif headerRow[cell].upper() == 'SURNAME':
            locations['surname'] = cell
        elif headerRow[cell].upper() == 'NAME':
            locations['name'] = cell
        elif headerRow[cell].upper() == 'TEXT1' or headerRow[cell].upper() == 'CATEGORY' or headerRow[cell].upper() == 'AGECLASS':
            locations['ageClass'] = cell
        elif headerRow[cell].upper() == 'CITY' or headerRow[cell].upper() == 'CLUB':
            locations['club'] = cell
        elif headerRow[cell].upper() == 'COURSE' or headerRow[cell].upper() == 'COURSECLASS':
            locations['course'] = cell
        elif headerRow[cell].upper() == 'TIME' or headerRow[cell].upper() == 'RACETIME':
            locations['time'] = cell
        elif headerRow[cell].upper() == 'PL' or headerRow[cell].upper() == 'POSITION':
            locations['position'] = cell
        elif headerRow[cell].upper() == 'NC' or headerRow[cell].upper() == 'NONCOMPETITIVE':
            locations['nonCompetitive'] = cell
        elif headerRow[cell].upper() == 'STATUS' or headerRow[cell].upper() == 'CLASSIFIER':
            locations['status'] = cell
    if checkAllHeadersPresent(list(locations.keys())):
        return locations
    else:
        return False

def parseToObjects(data, headerLocations):
    # Parse each row into an object to make it clearer to read
    parsedData = []

    for row in data[1:]:
        parsedRow = {}

        if 'firstName' in headerLocations:
            parsedRow['name'] = row[headerLocations['firstName']] +' '+ row[headerLocations['surname']]
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
        parsedRow['incomplete'] = row[headerLocations['nonCompetitive']] == 'Y' or row[headerLocations['nonCompetitive']] == '1' or (row[headerLocations['status']] != '' and row[headerLocations['status']] != '0')

        parsedData.append(parsedRow)

    return parsedData

def assignPoints(data, leagueScoringMethod):
    # Choses which points algorithm to use
    if leagueScoringMethod == 'position':
        return positionBasedPoints(data)
    else:
        return False

def positionBasedPoints(data):
    # Assign points 100 for 1st, 99 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if type(result['position']) == type(1) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 101 - result['position']

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def timeToSeconds(time):
    # Convert time from HH:MM:SS and MMM:SS to seconds for easieer calculations
    if time != '':
        splitTime = time.split(':')
        if len(splitTime) == 2:
            hours = 0
            minutes = int(splitTime[0])
            seconds = int(splitTime[1])
        else :
            hours = int(splitTime[0])
            minutes = int(splitTime[1])
            seconds = int(splitTime[2])

        return (hours * 3600) + (minutes * 60) + seconds
    else:
        return 0

def nameToInitial(name):
    # Get initial from a name, for matching of surname + initial
    splitName = name.split(' ',1)
    return splitName[0][0] + splitName[1]

def matchCompetitor(competitorList, result):
    # Find correct competitor to match to, check name and course match
    for competitor in competitorList:
        if competitor['name'] == result['name'] and competitor['course'] == result['course']:
            return competitor

    # Else check that initial, surname, course and either club or age class match
    for competitor in competitorList:
        if nameToInitial(competitor['name']) == nameToInitial(result['name']) and (competitor['name'].split(' ')[0] == result['name'].split(' ')[0]) and competitor['course'] == result['course'] and (competitor['ageClass'] == result['ageClass'] or competitor['club'] == result['club']):
            return competitor

    return False

def removeExtraCourses(results, courses):
    # Remove competitors with courses that are not configured for the league
    resultsWithCoursesRemoved = []
    for result in results:
        if result['course'] in courses:
            resultsWithCoursesRemoved.append(result)

    return resultsWithCoursesRemoved