import { LeagueResult } from '~/api-types'

export const byProperty = <FullObject>(
  ascending: boolean,
  property: keyof FullObject,
) => {
  return (aFull: FullObject, bFull: FullObject) => {
    const a: any = aFull[property]
    const b: any = bFull[property]

    const aIsLess = ascending ? -1 : 1
    const bIsLess = ascending ? 1 : -1

    if (a === b) return 0
    else if (a === null || a === undefined || a === '') return aIsLess
    else if (b === null || b === undefined || b === '') return bIsLess
    else if (a < b) return bIsLess
    else return aIsLess
  }
}

export const byPoints = (ascending: boolean, event: number) => {
  return (aFull: LeagueResult, bFull: LeagueResult) => {
    const a = aFull.points[event]?.score ?? 0
    const b = bFull.points[event]?.score ?? 0

    const aIsLess = ascending ? -1 : 1
    const bIsLess = ascending ? 1 : -1

    if (a === b) return 0
    else if (a === null || a === undefined) return aIsLess
    else if (b === null || b === undefined) return bIsLess
    else if (a < b) return bIsLess
    else return aIsLess
  }
}
