from functools import wraps

from flask import Flask, session
from database import sessionStore

def requireAuthentication(func):
    # Check login before allowing user to access API
    @wraps(func)
    def decorator(*args, **kwargs):
        if not session.get('username') or not session['username'] or not sessionStore.checkLogin(session['username']):
            return {'message': 'Permission Denied - You are not Logged In'}, 401
        return func(*args, **kwargs)
    return decorator
