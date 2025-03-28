from collections.abc import Iterable, Iterator

from ..schemas import EventResult, Result, ResultBeforeDatabase, ResultWithEventName
from .tables import Result as ResultTable

results_fields = (
    ResultTable.id,
    ResultTable.visible,
    ResultTable.time,
    ResultTable.course,
    ResultTable.incomplete,
    ResultTable.type,
    ResultTable.file_points,
    ResultTable.event,
    ResultTable.competitor,
)


class Results:
    @staticmethod
    async def create(result: ResultBeforeDatabase) -> None:
        await ResultTable.insert(
            ResultTable(
                competitor=result.competitor,
                time=result.time,
                course=result.course,
                incomplete=result.incomplete,
                type=result.type,
                event=result.event,
                visible=result.visible,
                file_points=result.file_points,
            )
        ).run()

    @staticmethod
    async def create_multiple(results: Iterable[ResultBeforeDatabase]) -> None:
        await ResultTable.insert(
            *(
                ResultTable(
                    competitor=result.competitor,
                    time=result.time,
                    course=result.course,
                    incomplete=result.incomplete,
                    type=result.type,
                    event=result.event,
                    visible=result.visible,
                    file_points=result.file_points,
                )
                for result in results
            )
        ).run()

    @staticmethod
    async def get_by_id(id: int) -> Result | None:
        database_result = (
            await ResultTable.select(*results_fields)
            .where(ResultTable.id == id)
            .first()
            .run()
        )

        return Result.model_validate(database_result)

    @staticmethod
    async def get_by_competitor(competitor: int) -> Iterable[ResultWithEventName]:
        return (
            ResultWithEventName.model_validate(result)
            for result in await ResultTable.select(
                *results_fields, ResultTable.event.name.as_alias("event_name")
            )
            .where(ResultTable.competitor == competitor)
            .order_by(ResultTable.event.date, ResultTable.id)
            .run()
        )

    @staticmethod
    async def get_by_event_and_course(event: str, course: str) -> Iterable[Result]:
        return (
            Result.model_validate(result)
            for result in await ResultTable.select(*results_fields)
            .where(ResultTable.visible == True)
            .where(ResultTable.event == event)
            .where(ResultTable.course.ilike(course))
            .order_by(ResultTable.course, ascending=True)
            .order_by(ResultTable.time, ascending=True)
            .run()
        )

    @staticmethod
    async def get_by_event_and_courses(
        event: str, courses: Iterable[str]
    ) -> Iterable[Result]:
        return (
            Result.model_validate(result)
            for result in await ResultTable.select(*results_fields)
            .where(ResultTable.visible == True)
            .where(ResultTable.event == event)
            .where(ResultTable.course.is_in(list(courses)))
            .order_by(ResultTable.course, ascending=True)
            .order_by(ResultTable.time, ascending=True)
            .run()
        )

    @staticmethod
    async def get_by_event(event: str) -> Iterator[Result]:
        return (
            Result.model_validate(result)
            for result in await ResultTable.select(*results_fields)
            .where(ResultTable.visible == True)
            .where(ResultTable.event == event)
            .order_by(ResultTable.course, ascending=True)
            .order_by(ResultTable.time, ascending=True)
            .run()
        )

    @staticmethod
    async def get_event_results(event: str) -> Iterable[EventResult]:
        return (
            EventResult.model_validate(result)
            for result in await ResultTable.select(
                ResultTable.id,
                ResultTable.time,
                ResultTable.course,
                ResultTable.incomplete,
                ResultTable.type,
                ResultTable.competitor,
                ResultTable.competitor.name.as_alias("name"),
                ResultTable.competitor.club.as_alias("club"),
                ResultTable.competitor.age_class.as_alias("age_class"),
            )
            .where(ResultTable.visible == True)
            .where(ResultTable.event == event)
            .order_by(ResultTable.course, ascending=False)
            .order_by(ResultTable.time, ResultTable.competitor.name, ascending=True)
            .run()
        )

    @staticmethod
    async def transfer(result: int, competitor: int) -> None:
        await (
            ResultTable.update({ResultTable.competitor: competitor})
            .where(ResultTable.id == result)
            .run()
        )

    @staticmethod
    async def set_incomplete(result: int, incomplete: bool) -> None:
        await (
            ResultTable.update({ResultTable.incomplete: incomplete})
            .where(ResultTable.id == result)
            .run()
        )

    @staticmethod
    async def set_visible(result: int, visible: bool) -> None:
        await (
            ResultTable.update({ResultTable.visible: visible})
            .where(ResultTable.id == result)
            .run()
        )

    @staticmethod
    async def delete_by_event_no_type(event_id: str) -> None:
        await (
            ResultTable.delete()
            .where(ResultTable.event == event_id)
            .where(ResultTable.type == "")
            .run()
        )

    @staticmethod
    async def count() -> int:
        database_result = await ResultTable.count().run()
        return int(database_result)
