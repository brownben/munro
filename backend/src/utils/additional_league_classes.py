import re

from ..schemas import AdditionalLeagueClass

AGE_CLASS_PATTERN = re.compile(r"[<>]?[MW]?[0-9]+")


def parse_additional_league_classes(value: str | None) -> list[AdditionalLeagueClass]:
    """Parse `name:class:age class` entries separated by commas, skipping invalid ones"""
    if not value:
        return []

    classes: list[AdditionalLeagueClass] = []
    for entry in value.split(","):
        parts = [part.strip() for part in entry.split(":")]
        if len(parts) != 3:
            continue

        name, class_name, age_class = parts
        if name and class_name and AGE_CLASS_PATTERN.fullmatch(age_class):
            classes.append(
                AdditionalLeagueClass(
                    name=name, class_name=class_name, age_class=age_class
                )
            )

    return classes
