import os
import base64
from typing import Union

from .database import query, queryWithResult, queryWithResults
from .league import League

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
    "uploadKey",
]


def generateUploadKey():
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
    leagueName: str

    # results
    resultUploaded: bool
    results: str
    winsplits: str
    routegadget: str
    userSubmittedResults: bool

    uploadKey: str

    def __init__(self, event: Union[dict, list]):
        if type(event) == dict:
            for key in event:
                self.setattr(key, event[key])

        else:
            for (index, key) in enumerate(properties):
                setattr(self, key, event[index])

    def toDictionary(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "website": self.website,
            "organiser": self.organiser,
            "moreInformation": self.moreInformation,
            "leagueName": self.leagueName,
            "resultUploaded": self.resultUploaded,
            "results": self.results,
            "winsplits": self.winsplits,
            "routegadget": self.routegadget,
            "userSubmittedResults": self.userSubmittedResults,
        }

    def toDictionaryWithUploadKey(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "website": self.website,
            "organiser": self.organiser,
            "moreInformation": self.moreInformation,
            "leagueName": self.leagueName,
            "resultUploaded": self.resultUploaded,
            "results": self.results,
            "winsplits": self.winsplits,
            "routegadget": self.routegadget,
            "userSubmittedResults": self.userSubmittedResults,
            "uploadKey": self.uploadKey,
        }

    def getEventId(self):
        return (self.league + self.name + self.date).replace(" ", "")

    def getLeague(self):
        return League.getByName(self.leagueName)

    def create(self):
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
                uploadKey
            ) VALUES ()
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
                generateUploadKey(),
            ),
        )

    def create(self):
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
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
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
                generateUploadKey(),
            ),
        )

    def update(self, oldEventId: str):
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
            WHERE id=%s
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
                oldEventId,
            ),
        )

    @staticmethod
    def getAll():
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
                uploadKey
            FROM events
            ORDER BY date ASC
            """
        )
        return [Event(result) for result in databaseResult]

    @staticmethod
    def getById(eventId: str):
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
                uploadKey
            FROM events
            WHERE id=%s
            """,
            (eventId,),
        )
        return Event(databaseResult)

    @staticmethod
    def getByLeague(league: str):
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
                uploadKey
            FROM events
            WHERE league=%s
            """,
            (league,),
        )
        return [Event(result) for result in databaseResult]

    @staticmethod
    def getLatestWithResults():
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
                uploadKey
            FROM events
            WHERE resultUploaded = true
            ORDER BY date DESC
            LIMIT 12
            """
        )
        return [Event(result) for result in databaseResult]

    @staticmethod
    def exists(eventId: str) -> bool:
        return bool(Event.getById(eventId))

    @staticmethod
    def deleteById(eventId: str):
        query(
            """
            DELETE FROM events
            WHERE id=%s
            """,
            (eventId,),
        )

    @staticmethod
    def deleteAll():
        query("DELETE FROM events")
