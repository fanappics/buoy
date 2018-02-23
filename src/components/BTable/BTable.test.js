import { mount } from 'vue-test-utils'
import BTable from './BTable'

describe('BTable', () => {
  const label = 'test label'
  const testId = 'test id'
  const testHeaders = [
    { name: 'testColumn1', key: 'header_one', sort: true }, { name: 'testColumn2', key: 'header_two' }
  ]
  const tableData = [
    { header_one: 'column 1', header_two: 'column 2', header_three: 'column 3', header_four: 'column 4', header_five: 'column 5', header_six: 'column 6', name: 'example row 1' }
  ]
  const totalResults = 100

  it('BTable renders correctly', () => {
    const wrapper = mount(BTable, {
      propsData: {
        id: testId,
        label: label,
        headers: testHeaders,
        tableData: tableData,
        totalResults: totalResults
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('sorts when header is clicked', () => {
    const wrapper = mount(BTable, {
      propsData: {
        id: testId,
        label: label,
        headers: testHeaders,
        tableData: tableData,
        totalResults: totalResults
      }
    })
    const header = wrapper.find('.header-button')
    header.trigger('click')
    expect(wrapper.vm.sorted.header_one).toBe('desc')
    header.trigger('click')
    expect(wrapper.vm.sorted.header_one).toBe('asc')
  })

  it('emits paginate when clicked', () => {
    const wrapper = mount(BTable, {
      propsData: {
        id: testId,
        label: label,
        headers: testHeaders,
        tableData: tableData,
        totalResults: totalResults
      }
    })
    const forward = wrapper.find('#paginate-forward')
    forward.trigger('click')
    expect(wrapper.emitted().paginate[0]).toEqual([{ 'page': 1, 'rowsize': 10 }])
  })

  it('emits paginate when clicked', () => {
    const wrapper = mount(BTable, {
      propsData: {
        id: testId,
        label: label,
        headers: testHeaders,
        tableData: tableData,
        totalResults: totalResults
      }
    })
    const select = wrapper.find('#rowAmount')
    select.trigger('change')
    expect(wrapper.emitted().rowsUpdate[0]).toEqual(['10'])
  })
})
