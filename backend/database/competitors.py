from .sqlQuery import query, queryWithOneResult, queryWithResults


def competitorToJSON(competitor):
    # Convert data from SQL to Object
    if competitor:
        return {
            "id": competitor[0],
            "name": competitor[1],
            "ageClass": competitor[2],
            "club": competitor[3],
            "course": competitor[4],
            "league": competitor[5],
        }
    else:
        return False


# Competitor Database Functions


def createCompetitor(data):
    result = queryWithOneResult(
        """
        INSERT INTO competitors (name, ageClass, club, course, league)
        VALUES (%s,%s,%s,%s,%s)
        RETURNING rowid
        """,
        (
            data["name"],
            data["ageClass"],
            data["club"],
            data["course"],
            data["league"],
        ),
    )
    return result[0]


def updateCompetitor(data):
    query(
        """
        UPDATE competitors
        SET name=%s,ageClass=%s,club=%s,course=%s, league=%s
        WHERE rowid=%s
    """,
        (
            data["name"],
            data["ageClass"],
            data["club"],
            data["course"],
            data["league"],
            data["id"],
        ),
    )


def deleteCompetitor(rowid):
    query("DELETE FROM competitors WHERE rowid=%s", (rowid,))


def findCompetitor(competitorId):
    result = queryWithOneResult(
        """
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors
        WHERE rowid=%s
    """,
        (competitorId,),
    )
    return competitorToJSON(result)


def getAllCompetitors():
    result = queryWithResults(
        """
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors
    """
    )
    return list(map(competitorToJSON, result))


def getCompetitorsByLeague(league):
    result = queryWithResults(
        """
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors
        WHERE league=%s
    """,
        (league,),
    )
    return list(map(competitorToJSON, result))


def deleteAllCompetitors():
    query("DELETE FROM competitors")


def mergeCompetitors(competitorKeep, competitorMerge):
    query(
        """
        UPDATE results
        SET competitor=%s
        WHERE competitor=%s
    """,
        (competitorKeep, competitorMerge),
    )
    query(
        """
        DELETE FROM competitors
        WHERE rowid=%s
    """,
        (competitorMerge,),
    )
