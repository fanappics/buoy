import { mount } from 'vue-test-utils'
import BTable from './BTable'

describe('BTable', () => {
  const label = 'test label'
  const testId = 'test id'
  const testHeaders = [
    { name: 'testColumn1', key: 'testkey1' }, { name: 'testColumn2', key: 'testkey2' }
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
})
