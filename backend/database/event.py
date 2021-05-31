from __future__ import annotations
import os
import base64
import json
from typing import Any, Dict, List, Optional, Union

from .database import query, queryWithResult, queryWithResults
from .league import League


def getJSON(data: str) -> Dict[str, Any]:
    if data:
        try:
            return json.loads(data)
        except:
            return {}
    return {}


properties = [
    "id",
    "name",
    "date",
    "website",
    "organiser",
    "moreInformation",
    "leagueName",
    "resultUploaded",
    "results",
    "winsplits",
    "routegadget",
    "userSubmittedResults",
    "secondaryLeague",
    "requiredInTotal",
    "additionalSettings",
    "uploadKey",
]


def generateUploadKey() -> str:
    # Generate Random Upload Key
    random = os.urandom(15)
    string = str(base64.b64encode(random))
    return string[2:22]


class Event:
    # event information
    id: str
    name: str
    date: str
    website: str
    organiser: str
    moreInformation: str
    league: Optional[str]  # from initilization
    leagueName: str

    # results in second league
    secondaryLeague: Optional[str]

    # results
    resultUploaded: bool
    results: str
    winsplits: str
    routegadget: str
    userSubmittedResults: bool
    requiredInTotal: bool
    additionalSettings: str

    uploadKey: str

    def __init__(self, event):
        if type(event) == dict:
            for key in event:
                setattr(self, key, event[key])

        else:
            for (index, key) in enumerate(properties):
                setattr(self, key, event[index])

        if hasattr(self, "league") and self.league:
            self.leagueName = self.league

    def toDictionary(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "website": self.website,
            "organiser": self.organiser,
            "moreInformation": self.moreInformation,
            "league": self.leagueName,
            "resultUploaded": self.resultUploaded,
            "results": self.results,
            "winsplits": self.winsplits,
            "routegadget": self.routegadget,
            "userSubmittedResults": self.userSubmittedResults,
            "secondaryLeague": self.secondaryLeague,
            "additionalSettings": self.additionalSettings,
            "requiredInTotal": self.requiredInTotal,
        }

    def toDictionaryWithUploadKey(self) -> Dict[str, Any]:
        return {
            **self.toDictionary(),
            "uploadKey": self.uploadKey,
        }

    def getEventId(self) -> str:
        return (self.leagueName + self.name + self.date).replace(" ", "")

    def getLeague(self) -> League:
        return League.getByName(self.leagueName)

    def getAdditionalSettingsAsJSON(self) -> Dict[str, Any]:
        return getJSON(self.additionalSettings)

    def create(self) -> None:
        query(
            """
            INSERT INTO events (
                id,
                name,
                date,
                website,
                organiser,
                moreInformation,
                league,
                resultUploaded,
                results,
                winsplits,
                routegadget,
                userSubmittedResults,
                secondaryLeague,
                requiredInTotal,
                additionalSettings,
                uploadKey
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                self.getEventId(),
                self.name,
                self.date,
                self.website,
                self.organiser,
                self.moreInformation,
                self.league,
                self.resultUploaded,
                self.results,
                self.winsplits,
                self.routegadget,
                self.userSubmittedResults,
                self.secondaryLeague,
                self.requiredInTotal,
                self.additionalSettings,
                generateUploadKey(),
            ),
        )

    def update(self, oldEventId: str) -> None:
        query(
            """
            UPDATE events SET
                id=%s,
                name=%s,
                date=%s,
                website=%s,
                organiser=%s,
                moreInformation=%s,
                league=%s,
                resultUploaded=%s,
                results=%s,
                winsplits=%s,
                routegadget=%s,
                userSubmittedResults=%s,
                secondaryLeague=%s,
                requiredInTotal=%s,
                additionalSettings=%s
            WHERE id=%s
            """,
            (
                self.getEventId(),
                self.name,
                self.date,
                self.website,
                self.organiser,
                self.moreInformation,
                self.leagueName,
                self.resultUploaded,
                self.results,
                self.winsplits,
                self.routegadget,
                self.userSubmittedResults,
                self.secondaryLeague,
                self.requiredInTotal,
                self.additionalSettings,
                oldEventId,
            ),
        )

    def setResultUploaded(self) -> None:
        query(
            """
            UPDATE events
            SET resultUploaded=%s
            WHERE id=%s
            """,
            (True, self.getEventId()),
        )

    def setResultUploadedWithURLs(
        self, results: str, winsplits: str, routegadget: str
    ) -> None:
        query(
            """
            UPDATE events
            SET
                resultUploaded=%s,
                results=%s,
                winsplits=%s,
                routegadget=%s
            WHERE id=%s
            """,
            (True, results, winsplits, routegadget, self.id),
        )

    @staticmethod
    def getAll() -> List[Event]:
        databaseResult = queryWithResults(
            """
            SELECT
                id,
                name,
                date,
                website,
                organiser,
                moreInformation,
                league,
                resultUploaded,
                results,
                winsplits,
                routegadget,
                userSubmittedResults,
                secondaryLeague,
                requiredInTotal,
                additionalSettings,
                uploadKey
            FROM events
            ORDER BY date ASC, name ASC
            """
        )
        return [Event(result) for result in databaseResult]

    @staticmethod
    def getById(eventId: str) -> Optional[Event]:
        databaseResult = queryWithResult(
            """
            SELECT
                id,
                name,
                date,
                website,
                organiser,
                moreInformation,
                league,
                resultUploaded,
                results,
                winsplits,
                routegadget,
                userSubmittedResults,
                secondaryLeague,
                requiredInTotal,
                additionalSettings,
                uploadKey
            FROM events
            WHERE id=%s
            """,
            (eventId,),
        )

        if not databaseResult:
            return None

        return Event(databaseResult)

    @staticmethod
    def getByLeague(league: str) -> List[Event]:
        databaseResult = queryWithResults(
            """
            SELECT
                id,
                name,
                date,
                website,
                organiser,
                moreInformation,
                league,
                resultUploaded,
                results,
                winsplits,
                routegadget,
                userSubmittedResults,
                secondaryLeague,
                requiredInTotal,
                additionalSettings,
                uploadKey
            FROM events
            WHERE league=%s OR secondaryLeague=%s
            ORDER BY date ASC, name ASC
            """,
            (league, league),
        )
        return [Event(result) for result in databaseResult]

    @staticmethod
    def getByLeagueWithResults(league: str) -> List[Event]:
        databaseResult = queryWithResults(
            """
            SELECT
                id,
                name,
                date,
                website,
                organiser,
                moreInformation,
                league,
                resultUploaded,
                results,
                winsplits,
                routegadget,
                userSubmittedResults,
                secondaryLeague,
                requiredInTotal,
                additionalSettings,
                uploadKey
            FROM events
            WHERE
                (league=%s OR secondaryLeague=%s)
                AND resultUploaded=%s
            ORDER BY date ASC, name ASC
            """,
            (league, league, True),
        )
        return [Event(result) for result in databaseResult]

    @staticmethod
    def getLatestWithResults() -> List[Event]:
        databaseResult = queryWithResults(
            """
            SELECT
                id,
                name,
                date,
                website,
                organiser,
                moreInformation,
                league,
                resultUploaded,
                results,
                winsplits,
                routegadget,
                userSubmittedResults,
                secondaryLeague,
                requiredInTotal,
                additionalSettings,
                uploadKey
            FROM events
            WHERE resultUploaded = true
            ORDER BY date DESC, name ASC
            LIMIT 12
            """
        )
        return [Event(result) for result in databaseResult]

    @staticmethod
    def exists(eventId: str) -> bool:
        return bool(Event.getById(eventId))

    @staticmethod
    def deleteById(eventId: str) -> None:
        query(
            """
            DELETE FROM events
            WHERE id=%s
            """,
            (eventId,),
        )

    @staticmethod
    def deleteAll() -> None:
        query("DELETE FROM events")
