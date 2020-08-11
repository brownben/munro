def returnMessage(message):
    return {"message": message}


def returnError(message):
    return {"message": message}, 500


def returnUnauthorised(message):
    return {"message": message}, 401

