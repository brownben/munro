def quickSort(array):
    # Check if length 1, as at length 1 the array is sorted
    if len(array) > 1:
        # Set pivot value
        pivot = len(array) - 1
        smallArray = []
        bigArray = []
        # Compare to pivot then place in relevant array
        for item in range(len(array) - 1):
            if int(array[item]) <= int(array[pivot]):
                smallArray.append(array[item])
            else:
                bigArray.append(array[item])
        # Combine the two lists and quicksort each to ensure sort
        return quickSort(smallArray) + [array[pivot]] + quickSort(bigArray)
    else:
        return array


def quickSortObjectsByProperty(array, property):
    # Check if length 1, as at length 1 the array is sorted
    if len(array) > 1:
        # Set pivot value
        pivot = len(array) - 1
        smallArray = []
        bigArray = []
        # Compare to pivot then place in relevant array
        for item in range(len(array) - 1):
            if int(array[item][property]) <= int(array[pivot][property]):
                smallArray.append(array[item])
            else:
                bigArray.append(array[item])
        # Combine the two lists and quicksort each to ensure sort
        return quickSortObjectsByProperty(smallArray, property) + [array[pivot]] + quickSortObjectsByProperty(bigArray, property)
    else:
        return array
