from datetime import date
from typing import Iterable

class Calendar:
    events: set[Event]
    def __init__(self) -> None: ...
    def serialize_iter(self) -> Iterable[str]: ...

class Event:
    def __init__(
        self,
        name: str | None,
        begin: date | None,
        description: str | None,
        location: str | None,
        url: str | None,
        organizer: Organizer | None,
    ) -> None: ...
    def make_all_day(self) -> None: ...

class Organizer:
    def __init__(self, email: str | None, common_name: str | None) -> None: ...
