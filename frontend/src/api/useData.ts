import { ref, unref, watch, Ref } from 'vue'

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
    const getData = () => {
      if ((argument.length > 0 && unref(argument[0])) || argument.length == 0) {
        const args = argument.map((argument) => unref(argument))
        return dataFetcher(...args)
      }
    }

    const data = ref(await getData()) as Ref<DataType | undefined>

    const refresh = async () => {
      const newValue = await getData()
      if (newValue) data.value = newValue
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
    const getData = () => {
      if ((argument.length > 0 && unref(argument[0])) || argument.length == 0) {
        const args = argument.map((argument) => unref(argument))
        return dataFetcher(...args)
      }
    }

    const data = ref((await getData()) ?? []) as Ref<DataType[]>

    const refresh = async () => {
      const newValue = await getData()
      if (newValue) data.value = newValue
    }

    watch(argument, refresh)
    return [data, refresh]
  }
}
