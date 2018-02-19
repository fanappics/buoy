```js

const headers = [
  {name: 'Header 1', key: 'header_one'}, 
  {name: 'Header 2', key: 'header_two'}, 
  {name: 'Header 3', key: 'header_three'},
  {name: 'Header 4', key: 'header_four'},
  {name: 'Header 5', key: 'header_five'},
  {name: 'Header 6', key: 'header_six'}
  ]

const tableData = [
  {header_one: 'column 1', header_two: 'column 2', header_three: 'column 3', header_four: 'column 4', header_five: 'column 5', header_six: 'column 6', name: 'example row 1'},
  {header_one: {type: 'url', path: 'https://github.com/fanappics/buoy', dispalyName: 'Buoy!'}, header_two: 'column 2', header_three: 'column 3', header_four: 'column 4', header_five: 'column 5', header_six: 'column 6', name: 'example row 1'},
  {header_one: 'column 1', header_two: 'column 2', header_three: 'column 3', header_four: 'column 4', header_five: 'column 5', header_six: 'column 6', name: 'example row 1'}
]

<div>
  <b-table 
    id="table1" 
    label="test label" 
    :headers=headers 
    :tableData=tableData
  />
</div>
```
