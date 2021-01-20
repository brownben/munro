from typing import List
from ..utils.points import assignPoints


def assignFileBasedPoints(results: List[dict]):
    return assignPoints(results, "file")


class Test_PositionBasedPoints:
    def test_emptyData(self) -> None:
        assert assignPoints([], "") == []
        assert assignPoints([], "Double") == []
        assert assignPoints([], "50") == []
        assert assignPoints([], "Double50") == []

    def test_normalResults(self) -> None:
        results = [{"position": i, "incomplete": False} for i in range(1, 6)]
        output = [
            {"position": i + 1, "points": 100 - i, "incomplete": False}
            for i in range(5)
        ]
        assert assignPoints(results, "position") == output

    def test_normalResults99(self) -> None:
        results = [{"position": i, "incomplete": False} for i in range(1, 6)]
        output = [
            {"position": i + 1, "points": 99 - i, "incomplete": False} for i in range(5)
        ]
        assert assignPoints(results, "position99") == output

    def test_normalResultsDouble(self) -> None:
        results = [{"position": i, "incomplete": False} for i in range(1, 6)]
        output = [
            {"position": i + 1, "points": 200 - 2 * i, "incomplete": False}
            for i in range(5)
        ]
        assert assignPoints(results, "positionDouble") == output

    def test_normalResults50Double(self) -> None:
        results = [{"position": i, "incomplete": False} for i in range(1, 6)]
        output = [
            {"position": i + 1, "points": 100 - 2 * i, "incomplete": False}
            for i in range(5)
        ]
        assert assignPoints(results, "position50Double") == output

    def test_invalidResults(self) -> None:
        results = [{"position": i, "incomplete": True} for i in range(1, 5)]
        output = [{"position": i, "points": 0, "incomplete": True} for i in range(1, 5)]
        assert assignPoints(results, "position") == output


class Test_PositionBasedPoints99WithDraw:
    def test_emptyData(self) -> None:
        assert assignPoints([], "position99average") == []

    def test_normalResults(self) -> None:
        results = [{"position": i, "incomplete": False} for i in range(1, 6)]
        output = [
            {"position": i + 1, "points": 99 - i, "incomplete": False} for i in range(5)
        ]
        assert assignPoints(results, "position99average") == output

    def test_drawnResults(self) -> None:
        results = [
            {"position": 1, "incomplete": False},
            {"position": 2, "incomplete": False},
            {"position": 2, "incomplete": False},
            {"position": 2, "incomplete": False},
            {"position": 5, "incomplete": False},
            {"position": 6, "incomplete": False},
            {"position": 6, "incomplete": False},
        ]
        output = [
            {"position": 1, "points": 99, "incomplete": False},
            {"position": 2, "points": 97, "incomplete": False},
            {"position": 2, "points": 97, "incomplete": False},
            {"position": 2, "points": 97, "incomplete": False},
            {"position": 5, "points": 95, "incomplete": False},
            {"position": 6, "points": 93.5, "incomplete": False},
            {"position": 6, "points": 93.5, "incomplete": False},
        ]
        assert assignPoints(results, "position99average") == output

    def test_invalidResults(self) -> None:
        results = [{"position": i, "incomplete": True} for i in range(1, 5)]
        output = [{"position": i, "points": 0, "incomplete": True} for i in range(1, 5)]
        assert assignPoints(results, "position99average") == output


class Test_FileBasedPoints:
    def test_emptyDataSet(self) -> None:
        assert assignFileBasedPoints([]) == []

    def test_noFilePoints(self) -> None:
        listToRecord = lambda l: [{"file_point": item} for item in l]
        listToRecordWithPoints = lambda l: [
            {"file_point": item, "points": 0} for item in l
        ]

        assert assignFileBasedPoints(listToRecord([0])) == listToRecordWithPoints([0])
        assert assignFileBasedPoints(listToRecord([1])) == listToRecordWithPoints([1])
        assert assignFileBasedPoints(listToRecord([77])) == listToRecordWithPoints([77])
        assert assignFileBasedPoints(listToRecord([1, 2, 3])) == listToRecordWithPoints(
            [1, 2, 3]
        )

    def test_withFilePoints(self) -> None:
        listToRecord = lambda l: [{"file_points": item} for item in l]
        listToRecordWithPoints = lambda l: [
            {"file_points": item, "points": item} for item in l
        ]

        assert assignFileBasedPoints(listToRecord([0])) == listToRecordWithPoints([0])
        assert assignFileBasedPoints(listToRecord([1])) == listToRecordWithPoints([1])
        assert assignFileBasedPoints(listToRecord([77])) == listToRecordWithPoints([77])
        assert assignFileBasedPoints(listToRecord([1, 2, 3])) == listToRecordWithPoints(
            [1, 2, 3]
        )


class Test_TimeFromAverageBasedPoints:
    def test_invalidResult(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": True, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": True,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeAverage") == output

    def test_oneResult(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1000,
            },
        ]
        assert assignPoints(results, "timeAverage") == output

    def test_oneResult100Base(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 100,
            },
        ]
        assert assignPoints(results, "timeAverage100") == output

    def test_threeResults(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 6, "incomplete": False, "position": 2},
            {"course": "red", "time": 8, "incomplete": False, "position": 3},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1200,
            },
            {
                "course": "red",
                "time": 6,
                "incomplete": False,
                "position": 2,
                "points": 1000,
            },
            {
                "course": "red",
                "time": 8,
                "incomplete": False,
                "position": 3,
                "points": 800,
            },
        ]
        assert assignPoints(results, "timeAverage") == output

    def test_negativeResult(self) -> None:
        results = [
            {"course": "red", "time": 2, "incomplete": False, "position": 1}
        ] * 50
        results.append(
            {"course": "red", "time": 12, "incomplete": False, "position": 4},
        )
        output = [
            {
                "course": "red",
                "time": 2,
                "incomplete": False,
                "position": 1,
                "points": 1028,
            },
        ] * 50
        output.append(
            {
                "course": "red",
                "time": 12,
                "incomplete": False,
                "position": 4,
                "points": 0,
            },
        )
        assert assignPoints(results, "timeAverage") == output


from ..utils.points import assignPoints


class Test_TimeFromTop3BasedPoints:
    def test_invalidResult(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": True, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": True,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeTop3") == output

    def test_oneResult(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1000,
            },
        ]
        assert assignPoints(results, "timeTop3") == output

    def test_threeResults(self) -> None:
        results = [
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 6, "incomplete": False, "position": 2},
            {"course": "red", "time": 8, "incomplete": False, "position": 3},
        ]
        output = [
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1500,
            },
            {
                "course": "red",
                "time": 6,
                "incomplete": False,
                "position": 2,
                "points": 1000,
            },
            {
                "course": "red",
                "time": 8,
                "incomplete": False,
                "position": 3,
                "points": 750,
            },
        ]
        assert assignPoints(results, "timeTop3") == output

    def test_fiveResultsRandomOrder(self) -> None:
        results = [
            {"course": "red", "time": 12, "incomplete": False, "position": 1},
            {"course": "red", "time": 8, "incomplete": False, "position": 1},
            {"course": "red", "time": 155, "incomplete": False, "position": 1},
            {"course": "red", "time": 4, "incomplete": False, "position": 1},
            {"course": "red", "time": 65, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 12,
                "incomplete": False,
                "position": 1,
                "points": 667,
            },
            {
                "course": "red",
                "time": 8,
                "incomplete": False,
                "position": 1,
                "points": 1000,
            },
            {
                "course": "red",
                "time": 155,
                "incomplete": False,
                "position": 1,
                "points": 52,
            },
            {
                "course": "red",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 2000,
            },
            {
                "course": "red",
                "time": 65,
                "incomplete": False,
                "position": 1,
                "points": 123,
            },
        ]
        assert assignPoints(results, "timeTop3") == output

    def test_noTime(self) -> None:
        results = [
            {"course": "red", "time": 0, "incomplete": False, "position": 1},
        ]
        output = [
            {
                "course": "red",
                "time": 0,
                "incomplete": False,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeTop3") == output


class Test_TimeFromTop3AdjustedPoints:
    def test_invalidResult(self) -> None:
        results = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": True,
                "position": 1,
            },
        ]
        output = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": True,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output

    def test_oneResult(self) -> None:
        results = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
            },
        ]
        output = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1200,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output

    def test_threeResults(self) -> None:
        results = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
            },
            {
                "course": "BLACK",
                "ageClass": "M21",
                "time": 6,
                "incomplete": False,
                "position": 2,
            },
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 8,
                "incomplete": False,
                "position": 3,
            },
        ]
        output = [
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 4,
                "incomplete": False,
                "position": 1,
                "points": 1800,
            },
            {
                "course": "BLACK",
                "ageClass": "M21",
                "time": 6,
                "incomplete": False,
                "position": 2,
                "points": 1200,
            },
            {
                "course": "Black",
                "ageClass": "M21",
                "time": 8,
                "incomplete": False,
                "position": 3,
                "points": 900,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output

    def test_noTime(self) -> None:
        results = [
            {
                "course": "Brown",
                "ageClass": "M21",
                "time": 0,
                "incomplete": False,
                "position": 1,
            },
        ]
        output = [
            {
                "course": "Brown",
                "ageClass": "M21",
                "time": 0,
                "incomplete": False,
                "position": 1,
                "points": 0,
            },
        ]
        assert assignPoints(results, "timeTop3Adjusted") == output
