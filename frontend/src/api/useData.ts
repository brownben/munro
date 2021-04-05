import { computed, ref, unref, watchEffect, Ref } from 'vue'

export const useData = <
  DataType,
  DataFetcher extends (...args: any[]) => Promise<DataType | undefined>
>(
  dataFetcher: DataFetcher
) => {
  type Parameter = Parameters<typeof dataFetcher>[number]
  type Arguments = (Ref<Parameter> | Parameter)[]
  type ReturnTuple = [Ref<DataType | undefined>, Ref<boolean>, () => void]

  return (...argument: Arguments): ReturnTuple => {
    const data = ref<DataType | undefined>()
    const loading = ref(true)

    const refresh = async () => {
      if ((argument.length > 0 && unref(argument[0])) || argument.length == 0) {
        loading.value = true
        const args = argument.map((argument) => unref(argument))
        data.value = await dataFetcher(...args)
        loading.value = false
      }
    }

    watchEffect(() => refresh())
    return [data, loading, refresh]
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
  type ReturnTuple = [Ref<DataType[]>, Ref<boolean>, () => void]

  return (...argument: Arguments): ReturnTuple => {
    const data = ref<DataType[] | undefined>()
    const value = computed(() => unref(data) ?? [])
    const loading = ref(true)

    const refresh = async () => {
      if ((argument.length > 0 && unref(argument[0])) || argument.length == 0) {
        loading.value = true
        const args = argument.map((argument) => unref(argument))
        data.value = await dataFetcher(...args)
        loading.value = false
      }
    }

    watchEffect(() => refresh())
    return [value, loading, refresh]
  }
}
