import httpx

from ..exceptions import HTTP_400, HTTP_404, HTTP_500


async def get_document_from_url(url: str) -> str:
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url)

            if response.status_code == 404:
                raise HTTP_404("Couldn't find results at URL")
            elif response.is_error:
                raise HTTP_500("Problem fetching results from URL")
    except httpx.HTTPError:
        raise HTTP_500("Problem fetching results from URL")
    except httpx.InvalidURL:
        raise HTTP_400("Invalid URL")

    return response.text
