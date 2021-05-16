import { computed, ref, unref, watch, Ref } from 'vue'

export const useData = <
  DataType,
  DataFetcher extends (...args: any[]) => Promise<DataType | undefined>
>(
  dataFetcher: DataFetcher
) => {
  type Parameter = Parameters<typeof dataFetcher>[number]
  type Arguments = (Ref<Parameter> | Parameter)[]
  type ReturnTuple = [Ref<DataType | undefined>, () => void]

  return async (...argument: Arguments): Promise<ReturnTuple> => {
    const originalArgs = argument.map((argument) => unref(argument))
    const data = ref(await dataFetcher(...originalArgs)) as Ref<
      DataType | undefined
    >

    const refresh = async () => {
      if ((argument.length > 0 && unref(argument[0])) || argument.length == 0) {
        const args = argument.map((argument) => unref(argument))
        data.value = await dataFetcher(...args)
      }
    }

    watch(argument, refresh)
    return [data, refresh]
  }
}

export const useDataList = <
  DataType,
  DataFetcher extends (...args: any[]) => Promise<DataType[] | undefined>
>(
  dataFetcher: DataFetcher
) => {
  type Parameter = Parameters<typeof dataFetcher>[number]
  type Arguments = (Ref<Parameter> | Parameter)[]
  type ReturnTuple = [Ref<DataType[]>, () => void]

  return async (...argument: Arguments): Promise<ReturnTuple> => {
    const originalArgs = argument.map((argument) => unref(argument))
    const data = ref((await dataFetcher(...originalArgs)) ?? []) as Ref<
      DataType[]
    >

    const refresh = async () => {
      if ((argument.length > 0 && unref(argument[0])) || argument.length == 0) {
        const args = argument.map((argument) => unref(argument))
        data.value = (await dataFetcher(...args)) ?? []
      }
    }

    watch(argument, refresh)
    return [data, refresh]
  }
}
