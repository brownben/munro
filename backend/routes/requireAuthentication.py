from functools import wraps
from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

firebase_request_adapter = requests.Request()

from ..models.messages import createMessage


def requireAuthentication(func):
    # Check login before allowing user to access API
    @wraps(func)
    def decorator(*args, **kwargs):
        id_token = request.cookies.get("token")
        if id_token:
            try:
                google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter
                )
            except:
                return createMessage("Permission Denied - You are not Logged In", 401)
        else:
            return createMessage("Permission Denied - You are not Logged In", 401)
        return func(*args, **kwargs)

    return decorator
