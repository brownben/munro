import pytest
from uploadFunctions import *


def test_nameToInitial():
    assert nameToInitial('Bob Jones') == 'B Jones'
    assert nameToInitial('Barney Jones') == 'B Jones'
    assert nameToInitial('Jones') == 'Jones'
    assert nameToInitial('Bob') == 'Bob'
    assert nameToInitial('Alfie Jones') == 'A Jones'
    assert nameToInitial('Gina Walker') == 'G Walker'
    assert nameToInitial('Megan Fence') == 'M Fence'


def test_matchCompetitor():
    competitorList = [{'name':'Bob', 'course':'Long', 'ageClass':'M10'}]
    assert matchCompetitor(competitorList, {'name':'Bob', 'course':'Long'}) == {'name':'Bob', 'course':'Long', 'ageClass':'M10'}
    competitorList = [
        {'name':'Bob Bob', 'course':'Long', 'ageClass':'M10', 'club':'A'},
        {'name':'Anne Jones', 'course':'Long', 'ageClass':'W35', 'club':'B'},
        {'name':'Jill Jack', 'course':'Long', 'ageClass':'W16', 'club':'C'},
    ]
    assert matchCompetitor(competitorList, {'name':'Bob Bob', 'course':'Long'}) == {'name':'Bob Bob', 'course':'Long', 'ageClass':'M10', 'club':'A'}
    assert matchCompetitor(competitorList, {'name':'Anne Jones', 'course':'Long'}) ==  {'name':'Anne Jones', 'course':'Long', 'ageClass':'W35', 'club':'B'}
    assert matchCompetitor(competitorList, {'name':'Anne Jones', 'course':'Short', 'ageClass':'', 'club':''}) == False
    assert matchCompetitor(competitorList, {'name':'Steve', 'course':'Short', 'ageClass':'', 'club':''}) == False
    assert matchCompetitor(competitorList, {'name':'Ann Jones', 'course':'Long', 'ageClass':'', 'club':''}) == False
    assert matchCompetitor(competitorList, {'name':'Ann Jones', 'course':'Short', 'ageClass':'', 'club':''}) == False
    assert matchCompetitor(competitorList, {'name':'Ann Jones', 'course':'Long', 'ageClass':'W35','club':''}) ==  {'name':'Anne Jones', 'course':'Long', 'ageClass':'W35', 'club':'B'}
    assert matchCompetitor(competitorList, {'name':'B Bob', 'course':'Long', 'ageClass':'M10','club':''}) ==   {'name':'Bob Bob', 'course':'Long', 'ageClass':'M10', 'club':'A'}
    assert matchCompetitor(competitorList, {'name':'B Bob', 'course':'Long', 'club':'A', 'ageClass':''}) ==  {'name':'Bob Bob', 'course':'Long', 'ageClass':'M10', 'club':'A'}
    assert matchCompetitor(competitorList, {'name':'B Bob', 'course':'Long', 'club':'A', 'ageClass':''}) ==  {'name':'Bob Bob', 'course':'Long', 'ageClass':'M10', 'club':'A'}

def test_removeExtraCourses():
    assert removeExtraCourses([], []) == []
    assert removeExtraCourses([], ['Long', 'Short']) == []
    assert removeExtraCourses([
        {'name': 'Bob', 'course': 'Long'}
    ], []) == []
    assert removeExtraCourses([
        {'name': 'Bob', 'course': 'Long'}
    ], ['Long']) == [
        {'name': 'Bob', 'course': 'Long'}
    ]
    assert removeExtraCourses([
        {'name': 'Bob', 'course': 'Long'}
    ], ['Long', 'Short']) == [
        {'name': 'Bob', 'course': 'Long'}
    ]
    assert removeExtraCourses([
        {'name': 'Bob', 'course': 'Long'},
        {'name': 'Jim', 'course': 'Short'},
        {'name': 'Fred', 'course': 'Long'}
    ], ['Long', 'Short']) == [
        {'name': 'Bob', 'course': 'Long'},
        {'name': 'Jim', 'course': 'Short'},
        {'name': 'Fred', 'course': 'Long'}
    ]
    assert removeExtraCourses([
        {'name': 'Bob', 'course': 'Long'},
        {'name': 'Jim', 'course': 'A'},
        {'name': 'Fred', 'course': 'Long'}
    ], ['Long', 'Short']) == [
        {'name': 'Bob', 'course': 'Long'},
        {'name': 'Fred', 'course': 'Long'}
    ]