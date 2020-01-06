def calculateId(data)
    return (data["league"] + data["name"] + data["date"]).replace(" ", "")
