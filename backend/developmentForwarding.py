from flask import Response, request
import requests


def forwardToVite(path):
    """
    forward requests in development to the vite server
    fixes the mime type to ensure they match the file format
    """

    port = "8080"
    mimeType = "text/html"
    requestType = request.args.get("type")
    suffix = ""

    if requestType:
        suffix = f"?type={requestType}"

    if any([x in path for x in [".js", ".ts", ".vue", "vite/client"]]):
        mimeType = "application/javascript"
    elif ".css" in path:
        suffix = "?import"
        mimeType = "application/javascript"
    elif "svg" in path:
        mimeType = "image/svg+xml"
    elif "png" in path:
        mimeType = "image/png"

    if request.args.get("index"):
        suffix += "&index=0"

    standardRequest = requests.get(f"http://localhost:{port}/{path}{suffix}").text
    if standardRequest == "Not Found":
        return requests.get(f"http://localhost:{port}/").text
    else:
        return Response(standardRequest, mimetype=mimeType)
