from fastapi import status
from fastapi.exceptions import HTTPException


def HTTP_201(message: str) -> HTTPException:
    return HTTPException(status.HTTP_201_CREATED, message)


def HTTP_400(message: str) -> HTTPException:
    return HTTPException(status.HTTP_400_BAD_REQUEST, message)


def HTTP_401(message: str) -> HTTPException:
    return HTTPException(status.HTTP_401_UNAUTHORIZED, message)


def HTTP_403(message: str) -> HTTPException:
    return HTTPException(status.HTTP_403_FORBIDDEN, message)


def HTTP_404(message: str) -> HTTPException:
    return HTTPException(status.HTTP_404_NOT_FOUND, message)


def HTTP_409(message: str) -> HTTPException:
    return HTTPException(status.HTTP_409_CONFLICT, message)


def HTTP_500(message: str) -> HTTPException:
    return HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, message)
