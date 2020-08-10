from ..fileBased import *

"""
def assignPoints(data):
    dataWithPoints = []

    for result in data:
        resultWithPoints = result
        points = result.get("file_points", None)

        resultWithPoints["points"] = points if type(points) == int else 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints

"""


class Test_assignPoints:
    def test_emptyDataSet(self):
        assert assignPoints([]) == []

    def test_noFilePoints(self):
        listToRecord = lambda l: [{"file_point": item} for item in l]
        listToRecordWithPoints = lambda l: [
            {"file_point": item, "points": 0} for item in l
        ]

        assert assignPoints(listToRecord([0])) == listToRecordWithPoints([0])
        assert assignPoints(listToRecord([1])) == listToRecordWithPoints([1])
        assert assignPoints(listToRecord([77])) == listToRecordWithPoints([77])
        assert assignPoints(listToRecord([1, 2, 3])) == listToRecordWithPoints(
            [1, 2, 3]
        )

    def test_withFilePoints(self):
        listToRecord = lambda l: [{"file_points": item} for item in l]
        listToRecordWithPoints = lambda l: [
            {"file_points": item, "points": item} for item in l
        ]

        assert assignPoints(listToRecord([0])) == listToRecordWithPoints([0])
        assert assignPoints(listToRecord([1])) == listToRecordWithPoints([1])
        assert assignPoints(listToRecord([77])) == listToRecordWithPoints([77])
        assert assignPoints(listToRecord([1, 2, 3])) == listToRecordWithPoints(
            [1, 2, 3]
        )
