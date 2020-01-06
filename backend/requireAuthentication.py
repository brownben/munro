from functools import wraps

from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from routeFunctions import returnUnauthorised

firebase_request_adapter = requests.Request()


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
                return returnUnauthorised(
                    "Permission Denied - You are not Logged In"
                )
        else:
            return returnUnauthorised(
                "Permission Denied - You are not Logged In"
            )
        return func(*args, **kwargs)

    return decorator
