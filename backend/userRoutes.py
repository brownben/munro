from flask import Flask, session
from flask_restful import Resource, reqparse

from database import sessionStore, users
from requireAuthentication import requireAuthentication

# Check POST request has all the relevent fields
userParser = reqparse.RequestParser()
userParser.add_argument(
    'username', help='This field cannot be blank', required=True)
userParser.add_argument(
    'password', help='This field cannot be blank', required=True)


class UserRegistration(Resource):
    def post(self):
        data = userParser.parse_args()
        username = data['username']
        if users.findUser(username):
            return {'message': 'User {} already exists'.format(username)}

        try:
            users.createUser(data['username'], data['password'])
            return {'message': 'User {} was created'.format(username)}
        except:
            return {'message': 'Something went Wrong'}, 500


class UserLogin(Resource):
    def post(self):
        data = userParser.parse_args()
        username = data['username']
        password = data['password']
        currentUser = users.findUser(username)

        if not currentUser:
            return {
                'message': 'Wrong Username or Password',
                'loggedIn': False
            }

        if users.verifyHash(password, currentUser['password']):
            session['username'] = username
            sessionStore.login(username)
            return {
                'message': 'Hello {}'.format(username),
                'loggedIn': True
            }
        else:
            return {
                'message': 'Wrong Username or Password',
                'loggedIn': False
            }, 500


class UserLogout(Resource):
    def post(self):
        try:
            sessionStore.logout(session['username'])
            session.pop('username', None)
            return {'message': 'Logged Out Successfully'}
        except:
            return {'message': 'Something went Wrong'}, 500


class LoginStatus(Resource):
    def get(self):
        if session.get('username') and session['username'] and sessionStore.checkLogin(session['username']):
            return {'logged_in': True}
        else:
            return {'logged_in': False}


class AllUsers(Resource):
    @requireAuthentication
    def get(self):
        try:
            return users.getAllUsers()
        except:
            return {'message': 'Something went Wrong'}, 500

    @requireAuthentication
    def delete(self):
        try:
            users.deleteAllUsers()
            return {'message': 'All Users Deleted'}
        except:
            return {'message': 'Something went Wrong'}, 500
