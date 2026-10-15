from ..schemas import AdditionalLeagueClass


def parse_additional_league_classes(value: str | None) -> list[AdditionalLeagueClass]:
    """Parse `name:class:gender:min age:max age` entries separated by commas

    Gender is `M`, `W` or empty for both. Min and max age are optional integers.
    Invalid entries are skipped.
    """
    if not value:
        return []

    classes: list[AdditionalLeagueClass] = []
    for entry in value.split(","):
        parts = [part.strip() for part in entry.split(":")]
        if len(parts) != 5:
            continue

        name, class_name, gender, min_age, max_age = parts
        if not name or not class_name or gender not in ("", "M", "W"):
            continue
        if (min_age and not min_age.isdecimal()) or (
            max_age and not max_age.isdecimal()
        ):
            continue

        classes.append(
            AdditionalLeagueClass(
                name=name,
                class_name=class_name,
                gender=gender or None,
                min_age=int(min_age) if min_age else None,
                max_age=int(max_age) if max_age else None,
            )
        )

    return classes
