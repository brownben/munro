import { mount } from '@vue/test-utils'
import FileInput from '@/components/FileInput'

test('File Change - No Files', () => {
  const wrapper = mount(FileInput, {
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  expect(wrapper.vm.fileChange({ target: { files: [] } })).toBeFalsy()
  expect(wrapper.vm.fileChange({ dataTransfer: { files: [] } })).toBeFalsy()
})

test('File Change - Files', () => {
  const mockReadFile = jest.fn()
  const wrapper = mount(FileInput, {
    mocks: {
      $route: { params: { id: '' } },
    },
    methods: {
      readFile: mockReadFile,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.vm.fileChange({ target: { files: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] } })
  expect(wrapper.vm.fileName).toBe('a')
  expect(mockReadFile).toHaveBeenCalledTimes(1)
  expect(mockReadFile).toHaveBeenLastCalledWith({ name: 'a' })
  mockReadFile.mockClear()
  wrapper.vm.fileChange({ dataTransfer: { files: [{ name: 'a' }, { name: 'b' }, { name: 'c' }] } })
  expect(wrapper.vm.fileName).toBe('a')
  expect(mockReadFile).toHaveBeenCalledTimes(1)
  expect(mockReadFile).toHaveBeenLastCalledWith({ name: 'a' })
})

class mockFileReader {
  readAsText () { }
}

test('Read File', () => {
  const mockOnLoad = jest.fn()
  const wrapper = mount(FileInput, {
    mocks: {
      $route: { params: { id: '' } },
    },
    methods: {
      readFileResult: mockOnLoad,
    },
    stubs: ['router-link', 'vue-headful'],
  })
  const mockReadAsText = jest.fn(() => wrapper.vm.readFileResult())
  mockFileReader.prototype.readAsText = mockReadAsText
  global.FileReader = mockFileReader
  global.FileReader.readAsText = mockReadAsText
  wrapper.vm.readFile(new Blob())
  expect(mockReadAsText).toHaveBeenCalledTimes(1)
  expect(mockReadAsText).toHaveBeenLastCalledWith(expect.any(Blob))
  expect(mockOnLoad).toHaveBeenCalledTimes(1)
})

test('Read File Result', () => {
  const wrapper = mount(FileInput, {
    attachToDocument: true,
    mocks: {
      $route: { params: { id: '' } },
    },
    stubs: ['router-link', 'vue-headful'],
  })
  wrapper.vm.readFileResult({ target: { result: 'Some Text' } })
  expect(wrapper.emitted().file).toEqual([['Some Text']])
})
