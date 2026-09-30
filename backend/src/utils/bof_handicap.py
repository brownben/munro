BOF_HANDICAP_MODIFIER = "BofHandicap"

# British Orienteering running speed ratios (Rules of Orienteering, Appendix B section 7)
BOF_SPEED_RATIOS: dict[str, float] = {
    "M10": 0.74, "W10": 0.73,
    "M12": 0.70, "W12": 0.62,
    "M14": 0.80, "W14": 0.65,
    "M16": 0.84, "W16": 0.67,
    "M18": 0.90, "W18": 0.70,
    "M20": 0.92, "W20": 0.71,
    "M21": 1.00, "W21": 0.82,
    "M35": 0.92, "W35": 0.71,
    "M40": 0.89, "W40": 0.69,
    "M45": 0.86, "W45": 0.67,
    "M50": 0.82, "W50": 0.63,
    "M55": 0.77, "W55": 0.58,
    "M60": 0.70, "W60": 0.53,
    "M65": 0.64, "W65": 0.48,
    "M70": 0.57, "W70": 0.42,
    "M75": 0.50, "W75": 0.35,
    "M80": 0.41, "W80": 0.28,
    "M85": 0.32, "W85": 0.19,
}  # fmt: skip


def get_bof_speed_ratio(age_class: str) -> float:
    """Gets the BOF speed ratio for an age class, 1 if the age class is unknown"""
    return BOF_SPEED_RATIOS.get(age_class, 1)
