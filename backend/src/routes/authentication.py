import google.oauth2.id_token
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer
from google.auth.transport import requests

from ..exceptions import HTTP_401

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="")


async def require_authentication(
    token: str = Depends(oauth2_scheme),
) -> bool:  # coverage: ignore
    """Checks if token passed in the Authorization header is valid"""

    try:
        google.oauth2.id_token.verify_firebase_token(
            token, requests.Request(), "munro-leagues"
        )
    except ValueError:
        raise HTTP_401("Invalid Authentication Credentials")

    return True


async def mock_require_authentication(token: str = Depends(oauth2_scheme)) -> bool:
    '''Mocked check if token is valid, expects token to be "SuperSecretTest"'''
    expected_token = "SuperSecretTest"

    if token != expected_token:
        raise HTTP_401("Invalid Authentication Credentials")

    return True
