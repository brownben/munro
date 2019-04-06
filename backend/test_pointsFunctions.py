import pytest
from pointsFunctions import *


def test_assignPoints():
    assert assignPoints(
         [],'position') == positionBasedPoints([])
    assert assignPoints([
        {'position': 1, 'incomplete': False},
        {'position': 2, 'incomplete': False},
        {'position': 3, 'incomplete': False}
    ],'position') == positionBasedPoints([
        {'position': 1, 'incomplete': False},
        {'position': 2, 'incomplete': False},
        {'position': 3, 'incomplete': False}
    ])
    assert assignPoints('', 'data') == False
    assert assignPoints('pos', 'data') == False


def test_positionBasedPoints():
    assert positionBasedPoints([]) == []
    assert positionBasedPoints([
        {'position': 1, 'incomplete': True}
    ]) == [
        {'position': 1, 'incomplete': True, 'points': 0}
    ]
    assert positionBasedPoints([
        {'position': 1, 'incomplete': True},
        {'position': 2, 'incomplete': True},
        {'position': 'n/c', 'incomplete': False}
    ]) == [
        {'position': 1, 'incomplete': True, 'points': 0},
        {'position': 2, 'incomplete': True, 'points': 0},
        {'position': 'n/c', 'incomplete': False, 'points': 0}
    ]
    assert positionBasedPoints([
        {'position': 'n/c', 'incomplete': False},
        {'position': -1, 'incomplete': False},
    ]) == [
        {'position': 'n/c', 'incomplete': False, 'points': 0},
        {'position': -1, 'incomplete': False, 'points': 0},
    ]
    assert positionBasedPoints([
        {'position': 1, 'incomplete': False},
        {'position': 2, 'incomplete': False},
        {'position': 3, 'incomplete': False}
    ]) == [
        {'position': 1, 'incomplete': False, 'points': 100},
        {'position': 2, 'incomplete': False, 'points': 99},
        {'position': 3, 'incomplete': False, 'points': 98}
    ]
    assert positionBasedPoints([
        {'position': 10, 'incomplete': False},
        {'position': 11, 'incomplete': False},
        {'position': 100, 'incomplete': False},
        {'position': 101, 'incomplete': False}
    ]) == [
        {'position': 10, 'incomplete': False, 'points': 91},
        {'position': 11, 'incomplete': False, 'points': 90},
        {'position': 100, 'incomplete': False, 'points': 1},
        {'position': 101, 'incomplete': False, 'points': 0}
    ]

def test_biggestPoints():
    assert biggestPoints([1,2,3],1) == [2]
    assert biggestPoints([1,2,3],2) == [2,1]
    assert biggestPoints([5,3,2,4,1],1) == [0]
    assert biggestPoints([5,3,2,4,1],2) == [0,3]
    assert biggestPoints([5,3,2,4,1],3) == [0,3,1]
    assert biggestPoints([],3) == []
    assert biggestPoints([1],3) == [0]
    assert biggestPoints([1,2],3) == [0,1]
    assert biggestPoints([1,2,3],3) == [0,1,2]
    assert biggestPoints([3,3,3],3) == [0,1,2]
    assert biggestPoints([3,2,3],2) == [0,2]
    assert biggestPoints([5,3,2,5,1],3) == [0,3,1]
    assert biggestPoints([5,5,2,5,1],3) == [0,1,3]
    assert biggestPoints([5,5,'',5,1],3) == [0,1,3]
    assert biggestPoints(['','',1,''],3) == [2,0,1]
    assert biggestPoints([44, 48, 50, 47, 48, 50, 49, 44],7) == [2, 5, 6, 1, 4, 3, 0]
    assert biggestPoints([42,46,48,"",46,"",46,38],7) ==[2,1,4,6,0,7,3]

def test_countOccurancesFromArrayOfIndexes():
    assert countOccurancesFromArrayOfIndexes(0, [],[]) == 0
    assert countOccurancesFromArrayOfIndexes('a', [],[]) == 0
    assert countOccurancesFromArrayOfIndexes(0, [0,1,2,3],[]) == 0
    assert countOccurancesFromArrayOfIndexes(0, [0,1,0,3],[]) == 0
    assert countOccurancesFromArrayOfIndexes(0, [0,1,2,3],[0,1,1,2,3,2,3]) == 1
    assert countOccurancesFromArrayOfIndexes(0, [0,1,2,3],[0,1,2,3]) == 1
    assert countOccurancesFromArrayOfIndexes(0, [0,1,0,3],[0,2]) == 2
    assert countOccurancesFromArrayOfIndexes(0, [0,1,0,3],[0,2,0,2]) == 4
    assert countOccurancesFromArrayOfIndexes(0, [0,1,0,3],[1,0,1,3,2,1,3,1]) == 2
    assert countOccurancesFromArrayOfIndexes(0, [0,1,0,3],[1,0,3,1,2,1,0,2]) == 4
    assert countOccurancesFromArrayOfIndexes(0, [0,0,0,1,2,0,0],[0,1,2,3,4,5,6]) == 5
    assert countOccurancesFromArrayOfIndexes(0, [0,1,2,3,0,0,1,2,0,0],[0,1,2,3,4,5,6]) == 3

def test_calculateTotal():
    assert calculateTotal([],[]) == 0
    assert calculateTotal([],[1,2,3]) == 0
    assert calculateTotal([0],[1,2,3]) == 1
    assert calculateTotal([1],[1,2,3]) == 2
    assert calculateTotal([2],[1,2,3]) == 3
    assert calculateTotal([0,1],[1,2,3]) == 3
    assert calculateTotal([0,2],[1,2,3]) == 4
    assert calculateTotal([1,2],[1,2,3]) == 5
    assert calculateTotal([1,0],[1,2,3]) == 3
    assert calculateTotal([0,1,2],[1,2,3]) == 6
    assert calculateTotal([1,1,1],[1,2,3]) == 6
    assert calculateTotal([0,1,2,1,0],[1,2,3]) == 9
    assert calculateTotal([0,3,4],[1,2,3,4,5]) == 10
    assert calculateTotal([0,0,0,0],[1,2,3]) == 4
    assert calculateTotal([1,3,2],[1,2,3,4,5,6,7]) == 9

def test_assignPosition():
    assert assignPosition([]) == []
    assert assignPosition([{ 'totalPoints': 100 }]) == [{ 'totalPoints': 100, 'position':1 }]
    assert assignPosition([{ 'totalPoints': 87 }]) == [{ 'totalPoints': 87, 'position':1 }]
    assert assignPosition([{ 'totalPoints': 0 }]) == [{ 'totalPoints': 0, 'position':1 }]
    assert assignPosition([
        { 'totalPoints': 100 },
        { 'totalPoints': 87 },
        { 'totalPoints': 31 },
        { 'totalPoints': 7 }
        ]) == [
            { 'totalPoints': 100, 'position':1  },
            { 'totalPoints': 87, 'position':2 },
            { 'totalPoints': 31, 'position':3 },
            { 'totalPoints': 7, 'position':4 }
        ]
    assert assignPosition([
        { 'totalPoints': 100 },
        { 'totalPoints': 100 },
        { 'totalPoints': 100 },
        { 'totalPoints': 87 },
        { 'totalPoints': 31 },
        { 'totalPoints': 31 },
        { 'totalPoints': 7 }
        ]) == [
        { 'totalPoints': 100, 'position':1 },
        { 'totalPoints': 100, 'position':1 },
        { 'totalPoints': 100, 'position':1 },
        { 'totalPoints': 87, 'position':2 },
        { 'totalPoints': 31, 'position':3 },
        { 'totalPoints': 31, 'position':3 },
        { 'totalPoints': 7, 'position':4 }
        ]