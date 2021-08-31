from collections import defaultdict
import statistics
import re

from typing import Any, Dict, List, Tuple, TypedDict, Union
from ..database.league import League


def isValidResult(result: Dict[str, Any]) -> bool:
    return (
        type(result["position"]) == int
        and result["position"] > 0
        and not result["incomplete"]
    )


def occuracesOfPosition(results: List[Dict[str, Any]], position: int) -> int:
    return len([1 for row in results if row["position"] == position])


def getStandardDeviation(list: List[int]) -> float:
    try:
        return statistics.stdev(list)
    except:
        return 0


CourseStatistics = TypedDict(
    "CourseStatistics", {"average": float, "standardDeviation": float}
)


def calculateCourseStatistics(
    results: List[Dict[str, Any]]
) -> Dict[str, CourseStatistics]:
    courseTimes = defaultdict(list)

    for result in results:
        if isValidResult(result):
            courseTimes[result["course"]].append(result["time"])

    return {
        course: {
            "average": statistics.mean(times),
            "standardDeviation": getStandardDeviation(times),
        }
        for course, times in courseTimes.items()
    }


def calculateCourseTop3Average(data: List[Dict[str, Any]]) -> Dict[str, float]:
    courseTimes = defaultdict(list)

    for result in data:
        if not result["incomplete"] and type(result["time"]) == int:
            courseTimes[result["course"]].append(result["time"])

    return {
        course: statistics.mean(sorted(times)[:3])
        for course, times in courseTimes.items()
    }


# Course/ Age Class Multipliers

multipliers: Dict[str, Dict[str, int]] = {
    "WHITE": {
        "WHITE": 1000,
        "YELLOW": 1200,
        "ORANGE": 1440,
        "LIGHT GREEN": 1728,
        "SHORT GREEN": 1901,
        "GREEN": 2091,
        "SHORT BLUE": 2300,
        "BLUE": 2530,
        "SHORT BROWN": 2783,
        "BROWN": 3061,
        "BLACK": 3674,
    },
    "YELLOW": {
        "WHITE": 800,
        "YELLOW": 1000,
        "ORANGE": 1200,
        "LIGHT GREEN": 1440,
        "SHORT GREEN": 1584,
        "GREEN": 1742,
        "SHORT BLUE": 1917,
        "BLUE": 2108,
        "SHORT BROWN": 2319,
        "BROWN": 2551,
        "BLACK": 3061,
    },
    "ORANGE": {
        "WHITE": 640,
        "YELLOW": 800,
        "ORANGE": 1000,
        "LIGHT GREEN": 1200,
        "SHORT GREEN": 1320,
        "GREEN": 1452,
        "SHORT BLUE": 1597,
        "BLUE": 1757,
        "SHORT BROWN": 1933,
        "BROWN": 2126,
        "BLACK": 2551,
        "LONG ORANGE": 1100,
    },
    "LIGHT GREEN": {
        "WHITE": 512,
        "YELLOW": 640,
        "ORANGE": 800,
        "LIGHT GREEN": 1000,
        "SHORT GREEN": 1100,
        "GREEN": 1210,
        "SHORT BLUE": 1331,
        "BLUE": 1464,
        "SHORT BROWN": 1611,
        "BROWN": 1772,
        "BLACK": 2126,
    },
    "SHORT GREEN": {
        "WHITE": 461,
        "YELLOW": 576,
        "ORANGE": 720,
        "LIGHT GREEN": 900,
        "SHORT GREEN": 1000,
        "GREEN": 1100,
        "SHORT BLUE": 1210,
        "BLUE": 1331,
        "SHORT BROWN": 1464,
        "BROWN": 1611,
        "BLACK": 1933,
    },
    "GREEN": {
        "WHITE": 415,
        "YELLOW": 518,
        "ORANGE": 648,
        "LIGHT GREEN": 810,
        "SHORT GREEN": 900,
        "GREEN": 1000,
        "SHORT BLUE": 1100,
        "BLUE": 1210,
        "SHORT BROWN": 1331,
        "BROWN": 1464,
        "BLACK": 1757,
    },
    "SHORT BLUE": {
        "WHITE": 373,
        "YELLOW": 467,
        "ORANGE": 583,
        "LIGHT GREEN": 729,
        "SHORT GREEN": 810,
        "GREEN": 900,
        "SHORT BLUE": 1000,
        "BLUE": 1100,
        "SHORT BROWN": 1210,
        "BROWN": 1331,
        "BLACK": 1597,
    },
    "BLUE": {
        "WHITE": 299,
        "YELLOW": 373,
        "ORANGE": 467,
        "LIGHT GREEN": 583,
        "SHORT GREEN": 729,
        "GREEN": 810,
        "SHORT BLUE": 900,
        "BLUE": 1000,
        "SHORT BROWN": 1100,
        "BROWN": 1210,
        "BLACK": 1452,
    },
    "SHORT BROWN": {
        "WHITE": 269,
        "YELLOW": 336,
        "ORANGE": 420,
        "LIGHT GREEN": 525,
        "SHORT GREEN": 656,
        "GREEN": 729,
        "SHORT BLUE": 810,
        "BLUE": 900,
        "SHORT BROWN": 1000,
        "BROWN": 1100,
        "BLACK": 1320,
    },
    "BROWN": {
        "WHITE": 242,
        "YELLOW": 302,
        "ORANGE": 378,
        "LIGHT GREEN": 472,
        "SHORT GREEN": 590,
        "GREEN": 656,
        "SHORT BLUE": 729,
        "BLUE": 810,
        "SHORT BROWN": 900,
        "BROWN": 1000,
        "BLACK": 1200,
    },
    "BLACK": {
        "WHITE": 193,
        "YELLOW": 242,
        "ORANGE": 302,
        "LIGHT GREEN": 378,
        "SHORT GREEN": 472,
        "GREEN": 525,
        "SHORT BLUE": 583,
        "BLUE": 648,
        "SHORT BROWN": 720,
        "BROWN": 800,
        "BLACK": 1000,
    },
    "LONG ORANGE": {},
}


def toAge(num: str) -> int:
    try:
        return int(num)
    except:
        return 21


def getStandardCourseForAgeClass(age: int, gender: str) -> str:
    def maleAgeClasses(age: int) -> str:
        if age <= 10:
            return "YELLOW"
        elif age <= 12:
            return "ORANGE"
        elif age <= 14:
            return "LIGHT GREEN"
        elif age <= 16:
            return "BLUE"
        elif age >= 75:
            return "SHORT GREEN"
        elif age >= 70:
            return "GREEN"
        elif age >= 65:
            return "SHORT BLUE"
        elif age >= 55:
            return "BLUE"
        elif age >= 45:
            return "SHORT BROWN"
        else:
            return "BROWN"

    def femaleAgeClasses(age: int) -> str:
        if age <= 10:
            return "YELLOW"
        elif age <= 12:
            return "ORANGE"
        elif age <= 14:
            return "LIGHT GREEN"
        elif age <= 16:
            return "GREEN"
        elif age >= 65:
            return "SHORT GREEN"
        elif age >= 55:
            return "GREEN"
        elif age >= 45:
            return "SHORT BLUE"
        elif age >= 35:
            return "BLUE"
        elif age >= 21:
            return "BROWN"
        else:
            return "BLUE"

    if gender == "W":
        return femaleAgeClasses(age)
    else:
        return maleAgeClasses(age)


def parseAgeClass(ageClass: str) -> Tuple[str, int]:
    # Only works for standard orienteering age classes
    if len(ageClass) > 1:
        numbersInAgeClass = re.findall(r"\d+", ageClass)
        if len(numbersInAgeClass) >= 1:
            age = toAge(numbersInAgeClass[0])
        else:
            age = 21

        gender = ageClass[0].upper()

    else:
        gender = "M"
        age = 21

    return (gender, age)


def getMultiplier(ageClass: str, courseRan: str) -> int:
    gender, age = parseAgeClass(ageClass)

    standardCourse = getStandardCourseForAgeClass(age, gender)

    return multipliers.get(standardCourse, multipliers["BROWN"]).get(
        courseRan.upper(), 1000
    )


def isAgeClassEligible(ageClass: str, specifiedAgeClass: str, league: League):
    ageClassMatchingSetting = league.getAdditionalSettingsAsJSON().get(
        "ageClassMatching"
    )

    if ageClassMatchingSetting == "exact":
        return matchesAgeClassExactly(ageClass, specifiedAgeClass)
    elif ageClassMatchingSetting == "exactWithB":
        return matchesAgeClassExactlyWithBClass(ageClass, specifiedAgeClass)

    return matchesAgeClass(ageClass, specifiedAgeClass)


def matchesAgeClass(ageClass: str, specifiedAgeClass: str) -> bool:
    gender, age = parseAgeClass(ageClass)
    specifiedGender, specifiedAge = parseAgeClass(specifiedAgeClass)

    def isAgeEligible(age: int, specifiedAge: int) -> bool:
        if specifiedAge == 21:
            return True
        elif specifiedAge > 21:
            return age >= specifiedAge

        return age <= specifiedAge

    def isGenderEligible(gender: str, specifiedGender: str) -> bool:
        if gender == specifiedGender:
            return True
        elif gender == "W":
            return True

        return False

    return isAgeEligible(age, specifiedAge) and isGenderEligible(
        gender, specifiedGender
    )


def matchesAgeClassExactly(ageClass: str, specifiedAgeClass: str) -> bool:
    gender, age = parseAgeClass(ageClass)
    specifiedGender, specifiedAge = parseAgeClass(specifiedAgeClass)

    return gender == specifiedGender and age == specifiedAge


def matchesAgeClassExactlyWithBClass(ageClass: str, specifiedAgeClass: str) -> bool:
    gender, age = parseAgeClass(ageClass)
    specifiedGender, specifiedAge = parseAgeClass(specifiedAgeClass)

    return gender == specifiedGender and (
        age == specifiedAge or age == specifiedAge + 2
    )
