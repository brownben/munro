from typing import Any, Mapping, Optional, Union

from google.auth.transport.requests import Request

def verify_firebase_token(
    id_token: Union[str, bytes], request: Request, audience: Optional[str] = None
) -> Mapping[str, Any]:
    """Verifies an ID Token issued by Firebase Authentication.

    Args:
        id_token (Union[str, bytes]): The encoded token.
        request (google.auth.transport.Request): The object used to make
            HTTP requests.
        audience (str): The audience that this token is intended for. This is
            typically your Firebase application ID. If None then the audience
            is not verified.

    Returns:
        Mapping[str, Any]: The decoded token.
    """
    ...
