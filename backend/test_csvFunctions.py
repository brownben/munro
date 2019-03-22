import pytest
from csvFunctions import *


def test_splitData():
    assert splitData('') == [['']]
    assert splitData(';;') == [['', '', '']]
    assert splitData(';;\n;;\n;;') == [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    assert splitData('a;b;1;2\nq;r;5;9;44\n') == [
        ['a', 'b', '1', '2'],
        ['q', 'r', '5', '9', '44'],
        ['']
    ]


def test_timeToSeconds():
    assert timeToSeconds('') == 0
    assert timeToSeconds('0:10') == 10
    assert timeToSeconds('0:59') == 59
    assert timeToSeconds('0:0:10') == 10
    assert timeToSeconds('0:0:59') == 59
    assert timeToSeconds('1:00') == 60
    assert timeToSeconds('1:15') == 75
    assert timeToSeconds('1:23') == 83
    assert timeToSeconds('0:1:00') == 60
    assert timeToSeconds('0:1:15') == 75
    assert timeToSeconds('0:1:23') == 83
    assert timeToSeconds('1:1:00') == 3660
    assert timeToSeconds('61:00') == 3660
    assert timeToSeconds('60:00') == 3600
    assert timeToSeconds('2:5:00') == 7500
    assert timeToSeconds('125:00') == 7500
    assert timeToSeconds('2:6:5') == 7565

def test_findHeaders():
    assert findHeaders([[]]) == False
    assert findHeaders([['firstName','ageClass','club','course','time','position','nonCompetitive', 'status']]) == False
    assert findHeaders([['surname','ageClass','club','course','time','position','nonCompetitive', 'status']]) == False
    assert findHeaders([['name','ageClass','course','time','position','nonCompetitive', 'status']]) == False
    assert findHeaders([['name','ageClass','club','course','position','nonCompetitive', 'status']]) == False

    headerLocations = {
        'name':0,
        'ageClass':1,
        'club':2,
        'course':3,
        'time':4,
        'position':5,
        'nonCompetitive':6,
        'status':7
    }
    assert findHeaders([['name','ageClass','club','course','time','position','nonCompetitive', 'status']])== headerLocations

    headerLocations = {
        'name':6,
        'ageClass':5,
        'club':4,
        'course':3,
        'time':2,
        'position':1,
        'nonCompetitive':0,
        'status':7,
    }
    assert findHeaders([['nonCompetitive','position','time','course','club','ageClass','name','status']])== headerLocations

    headerLocations = {
        'firstName':0,
        'surname':1,
        'ageClass':2,
        'club':3,
        'course':4,
        'time':5,
        'position':6,
        'nonCompetitive':7,
        'status':8
    }
    assert findHeaders([['first Name','surname','ageClass','club','course','time','position','nonCompetitive', 'status']]) == headerLocations


def test_checkAllHeadersPresent():
    assert checkAllHeadersPresent([]) == False
    assert checkAllHeadersPresent(['name','ageClass', 'club', 'course',
                        'time', 'position', 'nonCompetitive', 'status']) == True
    assert checkAllHeadersPresent(['firstName','surname','ageClass', 'club', 'course',
                        'time', 'position', 'nonCompetitive', 'status']) == True
    assert checkAllHeadersPresent(['firstName','surname','ageClass', 'club', 'course',
                        'position', 'nonCompetitive', 'status']) == False
    assert checkAllHeadersPresent(['firstName','surname','ageClass', 'club', 'course',
                        'time', 'nonCompetitive', 'status']) == False
    assert checkAllHeadersPresent(['firstName','surname','ageClass', 'club', 'course',
                        'time', 'position',  'status']) == False
    assert checkAllHeadersPresent(['firstName','surname','ageClass', 'club', 'course',
                        'time', 'position', 'nonCompetitive']) == False
    assert checkAllHeadersPresent(['firstName','surname','ageClass', 'status']) == False

def test_parseToObjects():
    headerLocations = {
        'name':0,
        'ageClass':1,
        'club':2,
        'course':3,
        'time':4,
        'position':5,
        'nonCompetitive':6,
        'status':7
    }
    assert parseToObjects([], headerLocations) == []
    assert parseToObjects([
        ['name','ageClass','club','course','time','position','nonCompetitive', 'status'],
        ['Bob','M12','ESOC','Long', '11:11', 1,'Y',''],
        ['Suzie','W35','IND','Short','',2,'N',''],
        ['a','b','c','d','0:0:23','dgd','f','']
        ], headerLocations) == [
            {'name':'Bob', 'ageClass': 'M12', 'club':'ESOC', 'course':'Long','time':671, 'position':1,  'incomplete':True },
            {'name':'Suzie', 'ageClass': 'W35', 'club':'IND', 'course':'Short','time':0, 'position':2, 'incomplete':False},
            {'name':'a', 'ageClass': 'b', 'club':'c', 'course':'d','time':23, 'position':'', 'incomplete':False},
        ]

    headerLocations = {
        'name':6,
        'ageClass':5,
        'club':4,
        'course':3,
        'time':2,
        'position':1,
        'nonCompetitive':0,
        'status':7,
    }
    assert parseToObjects([], headerLocations) == []
    assert parseToObjects([
        ['nonCompetitive','position','time','course','club','ageClass','name'],
        ['Y',1,'11:11','Long','ESOC','M12','Bob',''],
        ['N',2,'','Short','IND','W35','Suzie',''],
        ['f','dgd','0:23','d','c','b','a',''],
        ], headerLocations) == [
            {'name':'Bob', 'ageClass': 'M12', 'club':'ESOC', 'course':'Long','time':671, 'position':1,  'incomplete':True },
            {'name':'Suzie', 'ageClass': 'W35', 'club':'IND', 'course':'Short','time':0, 'position':2, 'incomplete':False},
            {'name':'a', 'ageClass': 'b', 'club':'c', 'course':'d','time':23, 'position':'', 'incomplete':False},
        ]

    headerLocations = {
        'firstName':0,
        'surname':1,
        'ageClass':2,
        'club':3,
        'course':4,
        'time':5,
        'position':6,
        'nonCompetitive':7,
        'status':8
    }
    assert parseToObjects([], headerLocations) == []
    assert parseToObjects([
        ['firstName','surname','ageClass','club','course','time','position','nonCompetitive', 'status'],
        ['Bob','Jones','M12','ESOC','Long', '11:11', 1,'Y',''],
        ['Suzie','Smith','W35','IND','Short','',2,'N',''],
        ['a','b','c','d','e','0:0:23','','h','i']
        ], headerLocations) == [
            {'name':'Bob Jones', 'ageClass': 'M12', 'club':'ESOC', 'course':'Long','time':671, 'position':1, 'incomplete':True},
            {'name':'Suzie Smith', 'ageClass': 'W35', 'club':'IND', 'course':'Short','time':0, 'position':2, 'incomplete':False},
            {'name':'a b', 'ageClass': 'c', 'club':'d', 'course':'e','time':23, 'position':'', 'incomplete':True},
        ]

