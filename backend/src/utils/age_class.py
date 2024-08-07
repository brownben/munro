import datetime
import re

Gender = str
Age = int


def _parse_age(num: str | int) -> int:
    """Parse a string which represents an age. Fallbacks to 21"""
    try:
        return int(num)
    except ValueError:
        return 21


def parse_age_class(age_class: str) -> tuple[Gender, Age]:
    """Parse a provided age class string into an age and gender which can be processed"""

    age_class = age_class.upper()

    number_in_age_class = re.findall(r"\d+|$", age_class)[0]
    age = _parse_age(number_in_age_class)

    female_identifying_characters = ("W", "F", "D")
    first_letter = re.findall(r"[MHWFD]|$", age_class)[0]
    gender = "W" if first_letter in female_identifying_characters else "M"

    return gender, age


def is_age_class_eligible(specified_string: str, age_class_string: str) -> bool:
    """Check if an age class is eligible to be competitive in the specified age class"""

    if specified_string == age_class_string:
        return True

    gender, age = parse_age_class(age_class_string)
    specified_gender, specified_age = parse_age_class(specified_string)

    def is_age_eligible() -> bool:
        # If 21, it is Open. All age classes are eligible
        if specified_age == 21:
            return True

        # If a senior age class, only age classes older count
        elif specified_age > 21:
            return age >= specified_age

        # Else is a junior age class, only age classes lower count
        return age <= specified_age

    def is_gender_eligible() -> bool:
        # either gender matches, or is a women and is eligible for mens/open
        return gender in (specified_gender, "W")

    return is_age_eligible() and is_gender_eligible()


def is_age_class_eligible_exact(specified_string: str, age_class_string: str) -> bool:
    gender, age = parse_age_class(age_class_string)
    specified_gender, specified_age = parse_age_class(specified_string)

    return gender == specified_gender and age == specified_age


def is_age_class_eligible_exact_with_b_class(
    specified_string: str, age_class_string: str
) -> bool:
    gender, age = parse_age_class(age_class_string)
    specified_gender, specified_age = parse_age_class(specified_string)

    return gender == specified_gender and (
        age == specified_age or age == specified_age + 2
    )


def is_age_class_eligible_exact_gender(
    specified_string: str, age_class_string: str
) -> bool:
    gender, age = parse_age_class(age_class_string)
    specified_gender, specified_age = parse_age_class(specified_string)

    def is_age_eligible() -> bool:
        # If 21, it is Open. All age classes are eligible
        if specified_age == 21:
            return True

        # If a senior age class, only age classes older count
        elif specified_age > 21:
            return age >= specified_age

        # Else is a junior age class, only age classes lower count
        return age <= specified_age

    return is_age_eligible() and gender == specified_gender


def is_age_class_eligible_over_18(specified_string: str, age_class_string: str) -> bool:
    gender, age = parse_age_class(age_class_string)
    specified_gender, specified_age = parse_age_class(specified_string)

    def is_age_eligible() -> bool:
        # If less than 18 they are not a senior
        if age < 18:
            return False

        # If 21, it is Open. All age classes are eligible
        if specified_age == 21:
            return True

        # If a senior age class, only age classes older count
        elif specified_age > 21:
            return age >= specified_age

        # Else is a junior age class, only age classes lower count
        return age <= specified_age

    def is_gender_eligible() -> bool:
        # either gender matches, or is a women and is eligible for mens/open
        return gender in (specified_gender, "W")

    return is_age_eligible() and is_gender_eligible()


def age_class_matches_filter(filter: str, age_class: str) -> bool:
    if not filter:
        return True

    specified_age_class = filter.split("-")[-1]

    if filter.startswith("exact-"):
        return is_age_class_eligible_exact(specified_age_class, age_class)
    elif filter.startswith("exactWithB-"):
        return is_age_class_eligible_exact_with_b_class(specified_age_class, age_class)
    elif filter.startswith("exactGender-"):
        return is_age_class_eligible_exact_gender(specified_age_class, age_class)
    elif filter.startswith("older18-"):
        return is_age_class_eligible_over_18(specified_age_class, age_class)

    return is_age_class_eligible(specified_age_class, age_class)


def get_correct_age_for_age_class(age: int) -> int:
    if age <= 10:
        return 10
    elif age < 21:
        return age + (age % 2)
    elif age > 35:
        return age - (age % 5)
    else:
        return 21


def get_year_from_date(date: str) -> int:
    """Parse a year from a date, either just a year or in YYYY-MM-DD format"""
    if date.count("-") == 2:
        raw_year, month, day = date.split("-")
        return int(raw_year or 0)
    else:
        return int(date or 0)


def date_to_age_class(date: str, gender: str) -> str:
    """Takes a date and transforms it into an age class"""
    year = get_year_from_date(date)
    current_year = datetime.datetime.now().year

    age = current_year - year if year else 21
    age = get_correct_age_for_age_class(age)

    gender, age = parse_age_class(f"{gender}{age}")  # Standardise W to F

    return f"{gender}{age}"
