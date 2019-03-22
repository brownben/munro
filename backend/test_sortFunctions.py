import pytest
from sortFunctions import *

sampleResults = [
  {
    'points': [100, 95, 10],
    'position': 1,
    'largestPoints': [0],
    'totalPoints': 100,
    'club': 'ESOC',
    'name': 'Linda Reid',
    'ageClass': 'W35',
  },
    {
    'points': [0, 100, 98],
    'position': 3,
    'largestPoints': [1],
    'totalPoints': 98,
    'club': 'ESOC',
    'name': 'Bob Blu Jones',
    'ageClass': 'M65',
  },
  {
    'points': ['', 100, 5],
    'position': 2,
    'largestPoints': [1],
    'totalPoints': 99,
    'club': 'INT',
    'name': 'Harvey Blue',
    'ageClass': 'M21',
  },
]

sampleResultsSortedByPosition = [
    {
    'points': [100, 95, 10],
    'position': 1,
    'largestPoints': [0],
    'totalPoints': 100,
    'club': 'ESOC',
    'name': 'Linda Reid',
    'ageClass': 'W35',
  },
  {
    'points': ['', 100, 5],
    'position': 2,
    'largestPoints': [1],
    'totalPoints': 99,
    'club': 'INT',
    'name': 'Harvey Blue',
    'ageClass': 'M21',
  },
  {
    'points': [0, 100, 98],
    'position': 3,
    'largestPoints': [1],
    'totalPoints': 98,
    'club': 'ESOC',
    'name': 'Bob Blu Jones',
    'ageClass': 'M65',
  },
]

def test_quickSort():
    assert quickSort([]) == []
    assert quickSort([1]) == [1]
    assert quickSort([8]) == [8]
    assert quickSort([1,2,3]) == [1,2,3]
    assert quickSort([3,2,1]) == [1,2,3]
    assert quickSort([2,3,1]) == [1,2,3]
    assert quickSort([1,2,3,4,5]) == [1,2,3,4,5]
    assert quickSort([2,3,4,1,5]) == [1,2,3,4,5]
    assert quickSort([5,1,3,2,4]) == [1,2,3,4,5]
    assert quickSort([4,3,5,1,2]) == [1,2,3,4,5]
    assert quickSort([1,1,1]) == [1,1,1]
    assert quickSort([1,3,1,2,1,5]) == [1,1,1,2,3,5]

def test_quickSortObjectsByProperty():
    assert quickSortObjectsByProperty([],'') == []
    assert quickSortObjectsByProperty([],'name') == []
    assert quickSortObjectsByProperty([],'position') == []
    assert quickSortObjectsByProperty([{'a':0}],'a') == [{'a':0}]
    assert quickSortObjectsByProperty([{'a':0},{'a':1},{'a':2}],'a') == [{'a':0},{'a':1},{'a':2}]
    assert quickSortObjectsByProperty([{'a':0, 'b':1},{'a':1, 'b':2},{'a':2, 'b':3}],'a') == [{'a':0, 'b':1},{'a':1, 'b':2},{'a':2, 'b':3}]
    assert quickSortObjectsByProperty([{'a':9, 'b':1},{'a':7, 'b':2},{'a':6, 'b':3}],'a') == [{'a':6, 'b':3},{'a':7, 'b':2},{'a':9, 'b':1}]
    assert quickSortObjectsByProperty([{'a':6, 'b':1},{'a':8, 'b':3},{'a':1, 'b':2},{'a':7, 'b':3}],'a') == [{'a':1, 'b':2},{'a':6, 'b':1},{'a':7, 'b':3},{'a':8, 'b':3}]
    assert quickSortObjectsByProperty(sampleResults, 'position') == sampleResultsSortedByPosition
