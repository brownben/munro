equivalent_names_with_different_initials = (
    ("Aaron", "Ron"),
    ("Abigail", "Gail"),
    ("Adrian", "Ryan"),
    ("Adrian", "Ian"),
    ("Albert", "Bert"),
    ("Alexander", "Xander"),
    ("Alexander", "Sandy"),
    ("Alexander", "Sasha"),
    ("Alexandra", "Lexi"),
    ("Alexandra", "Sasha"),
    ("Alexandra", "Sandra"),
    ("Alexandre", "Lex"),
    ("Alfred", "Fred"),
    ("Alfred", "Freddy"),
    ("Amanda", "Mandy"),
    ("Amanda", "Mand"),
    ("Andrew", "Drew"),
    ("Angus", "Gus"),
    ("Angus", "Gussy"),
    ("Anthony", "Tony"),
    ("Antoine", "Tony"),
    ("Antoinette", "Toni"),
    ("Bailee", "Lee"),
    ("Bailey", "Lee"),
    ("Brian", "Ian"),
    ("Brian", "Ryan"),
    ("Bryan", "Ian"),
    ("Bryan", "Ryan"),
    ("Byron", "Ron"),
    ("Byron", "Ronny"),
    ("Cameron", "Ron"),
    ("Cameron", "Ronny"),
    ("Carolyn", "Lyn"),
    ("Carolyn", "Lynn"),
    ("Carolyn", "Lynne"),
    ("Cassandra", "Sandra"),
    ("Cassandra", "Sandy"),
    ("Catherine", "Katie"),
    ("Catherine", "Erin"),
    ("Christian", "Ian"),
    ("Christina", "Tina"),
    ("Christopher", "Kit"),
    ("Cynthia", "Pianoman"),
    ("Damian", "Ian"),
    ("Dominic", "Nick"),
    ("Dominic", "Nicky"),
    ("Edward", "Ned"),
    ("Edward", "Ted"),
    ("Elizabeth", "Betty"),
    ("Elizabeth", "Beth"),
    ("Elizabeth", "Lisa"),
    ("Elizabeth", "Lissie"),
    ("Elizabeth", "Lily"),
    ("Elizabeth", "Lizzy"),
    ("Elizabeth", "Lizzie"),
    ("Elizabeth", "Liz"),
    ("Elizabeth", "Liza"),
    ("Frederick", "Eric"),
    ("Frederick", "Erick"),
    ("Frederick", "Rick"),
    ("Frederick", "Ricky"),
    ("Fredrick", "Rick"),
    ("Hannah", "Anna"),
    ("Hannah", "Ann"),
    ("Hannah", "Annie"),
    ("Isabella", "Bella"),
    ("John", "Ian"),
    ("Johnathan", "Nathan"),
    ("Jonathan", "Nathan"),
    ("Jordan", "Dan"),
    ("Jordan", "Danny"),
    ("Julian", "Ian"),
    ("Katherine", "Erin"),
    ("Katrina", "Trina"),
    ("Maximilian", "Ian"),
    ("Melanie", "Elaine"),
    ("Melinda", "Linda"),
    ("Melissa", "Lissa"),
    ("Michelle", "Shell"),
    ("Michelle", "Shelly"),
    ("Michelle", "Chelle"),
    ("Natasha", "Tasha"),
    ("Natasha", "Tash"),
    ("Olivia", "Liv"),
    ("Olivia", "Via"),
    ("Patricia", "Tricia"),
    ("Patricia", "Trish"),
    ("Patricia", "Trisha"),
    ("Priscilla", "Cilla"),
    ("Rebecca", "Becky"),
    ("Rebecca", "Becca"),
    ("Rebecca", "Bex"),
    ("Richard", "Dick"),
    ("Riley", "Lee"),
    ("Robert", "Bob"),
    ("Robert", "Bobby"),
    ("Robert", "Bert"),
    ("Roberta", "Bobbie"),
    ("William", "Bill"),
    ("William", "Liam"),
    ("Yvonne", "Von"),
)


def name_to_initial(name: str) -> str:
    """Get the initial and surname for a full name"""

    name = name.strip()
    splitName = name.split(" ", 1)

    if len(splitName) > 1:
        return f"{splitName[0][0]} {splitName[1]}".upper()
    else:
        return name.upper()


def get_split_name(name: str) -> list[str]:
    """Get tuple with first name and surname"""

    splitName = name.strip().split(" ", 1)
    return splitName if len(splitName) == 2 else [name, ""]


def given_names_are_equivalent(name: str, competitor_name: str) -> bool:
    """Takes 2 given names and returns True if one is a shortened version of the other"""

    matching_pairs = [
        name_pair
        for name_pair in equivalent_names_with_different_initials
        if name in name_pair or competitor_name in name_pair
    ]

    for pair in matching_pairs:
        if (pair[0] == name and competitor_name == pair[1]) or (
            pair[1] == name and competitor_name == pair[0]
        ):
            return True

    return False


def matches_equivalent_name(name: str, competitor_name: str) -> bool:
    """Checks if one given name is shortened version of another and the surnames match"""

    given_name, surname = get_split_name(name)
    competitor_name, competitor_surname = get_split_name(competitor_name)

    surnames_match = surname == competitor_surname
    names_are_equivalent = given_names_are_equivalent(given_name, competitor_name)

    return surnames_match and names_are_equivalent
