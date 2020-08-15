import { shallowMount } from '@vue/test-utils'
import FileInput from '@/components/inputs/FileInput'

test('Renders Correctly', () => {
  const wrapper = shallowMount(FileInput, {
    props: {
      label: 'Test Label',
    },
  })
  expect(wrapper.exists()).toBeTruthy()
  expect(wrapper.findAll('label')[0].text()).toBe('Test Label')
  expect(wrapper.findAll('label')[1].text()).toBe('Browse for File')
  expect(wrapper.html()).toContain('<input')
  expect(wrapper.html()).toContain('type="file"')
  expect(wrapper.html()).toContain('accept=".csv"')
  expect(wrapper.find('span').text()).toBe('Select a File')
})

test('File Change - No Files', () => {
  const wrapper = shallowMount(FileInput)
  expect(wrapper.vm.fileChange({ target: { files: [] } })).toBeFalsy()
  expect(wrapper.vm.fileChange({ dataTransfer: { files: [] } })).toBeFalsy()
})

test('File Change - Files', () => {
  const wrapper = shallowMount(FileInput)
  wrapper.vm.readFile = jest.fn()
  const readFile = wrapper.vm.readFile
  wrapper.vm.fileChange({
    target: { files: [{ name: 'c' }] },
  })
  expect(wrapper.vm.fileName).toBe('c')
  expect(readFile).toHaveBeenCalledTimes(1)
  expect(readFile).toHaveBeenLastCalledWith({ name: 'c' })
  readFile.mockClear()
  wrapper.vm.fileChange({
    dataTransfer: { files: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] },
  })
  expect(wrapper.vm.fileName).toBe('a')
  expect(readFile).toHaveBeenCalledTimes(1)
  expect(readFile).toHaveBeenLastCalledWith({ name: 'a' })
})

test('Read File', () => {
  class mockFileReader {
    readAsText() {}
  }

  const wrapper = shallowMount(FileInput)
  wrapper.vm.readFileResult = jest.fn()
  mockFileReader.prototype.readAsText = jest.fn(() =>
    wrapper.vm.readFileResult()
  )
  global.FileReader = mockFileReader
  global.FileReader.readAsText = mockFileReader.prototype.readAsText
  wrapper.vm.readFile(new Blob())
  expect(mockFileReader.prototype.readAsText).toHaveBeenCalledTimes(1)
  expect(mockFileReader.prototype.readAsText).toHaveBeenLastCalledWith(
    expect.any(Blob)
  )
  expect(wrapper.vm.readFileResult).toHaveBeenCalledTimes(1)
})

test('Read File Result', () => {
  const wrapper = shallowMount(FileInput)
  wrapper.vm.readFileResult({ target: { result: 'Some Text' } })
  expect(wrapper.emitted().file[0]).toEqual(['Some Text'])
})
