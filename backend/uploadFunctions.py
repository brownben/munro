# Functions to Match Competitors during upload and to remove competitors with the wrong course during upload


def nameToInitial(name):
    # Get initial from a name, for matching of surname + initial
    # Returns initial concatenated to surname
    name = name.strip()
    splitName = name.split(' ', 1)

    if (len(splitName) > 1):
        return splitName[0][0] + ' ' + splitName[1]
    else:
        return name


def matchCompetitor(competitorList, result):
    # Find correct competitor to match to, check name and course match
    for competitor in competitorList:
        if competitor['name'] == result['name'] and competitor['course'] == result['course']:
            return competitor

    # Else check that initial, surname, course and either club or age class match
    for competitor in competitorList:
        if (
            (nameToInitial(competitor['name']) == nameToInitial(result['name'])) and
            (competitor['course'] == result['course']) and
            (competitor['ageClass'] == result['ageClass'] or
             (competitor['club'] == result['club']))
        ):
            return competitor

    return False


def removeExtraCourses(results, courses):
    # Remove competitors with courses that are not configured for the league
    upperCourses = [course.upper() for course in courses]
    resultsWithCoursesRemoved = []
    for result in results:
        if result['course'].upper() in upperCourses:
            resultsWithCoursesRemoved.append(result)

    return resultsWithCoursesRemoved
