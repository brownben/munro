scottish_clubs = {
    "AROS",
    "AUOC",
    "AYROC",
    "BASOC",
    "CLYDE",
    "ECKO",
    "ELO",
    "ESOC",
    "EUOC",
    "FVO",
    "GRAMP",
    "GUOC",
    "INT",
    "INVOC",
    "KFO",
    "MAROC",
    "MA",
    "MOR",
    "RR",
    "SOLWAY",
    "STAG",
    "STUOC",
    "TAY",
    "TINTO",
    "USOC",
}


def club_matches_filter(filter: str, club: str) -> bool:
    if not filter:
        return True

    eligible_clubs = set(filter.split("|"))

    if "{scottish_clubs}" in eligible_clubs:
        eligible_clubs.update(scottish_clubs)

    return club in eligible_clubs
