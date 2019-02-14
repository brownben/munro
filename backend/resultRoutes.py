from flask import Flask, session
from flask_restful import Resource, reqparse
from functools import wraps

from database import results, sessionStore


def requireAuthentication(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        if not session.get('username') or not session['username'] or not sessionStore.checkLogin(session['username']):
            return {'message': 'Permission Denied - You are not Logged In'}, 401
        return func(*args, **kwargs)
    return decorator


class Results(Resource):
    def get(self):
        return results.getAllResults()

    @requireAuthentication
    def delete(self):
        results.deleteAllResults()
        return {'message': 'All Results were Deleted'}


class ResultsForCourse(Resource):
    def get(self, name, course):
        return results.getResultsForCourse(name, course)
