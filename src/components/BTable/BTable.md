The headers array holds objects that represent columns

| Key      | Required/Optional | Default | Description                              |
| -------- | ----------------- | ------- | ---------------------------------------- |
| name     | Required          |         | This is what will be displayed as the column header.  |
| key      | Required          |         | This is the matching key for that column to access the corresponding data in the rows. |
| sort     | Optional          |         | Enables sorting on that column.                   |
| render   | Optional          |         | Holds the rendering function name if applicable.                   |

```js

const makeLink = function(data) {
  return `<a href=${ data.id }>${ data.name }</a>`
}

const makeImage = function(data) {
  return `<img src="${ data.source }" alt="${ data.name }" width="30" height="30">`
}

const makeLinkGroup = function(data) {
  let html = ''
  data.forEach(function(action) {
    switch(action) {
      case 'delete':
        html += `<span class="ion-ios-trash" style="color: #4d90fe; font-size: 18px"></span><a href=${ data.id } class='link-group'> Delete</a>`
        break;
      case 'edit':
        html += `<span class="ion-edit" style="color: #4d90fe; font-size: 18px"></span><a href=${ data.id } class='link-group'> Edit</a>`
        break;
    }
  })
  return html
}

const headers = [
  {name: 'Header 1', key: 'headerOne', sort: true}, 
  {name: 'Header 2', key: 'headerTwo', render: makeLink, sort: true},
  {name: 'Header 3', key: 'headerThree', render: makeImage, sort: false},
  {name: 'Header 4', key: 'headerFour'},
  {name: 'Header 5', key: 'headerFive'},
  {name: 'Header 6', key: 'headerSix'},
  ]


const tableData = [
  {
    headerOne: 'column 1', 
    headerTwo: {name: 'column 2', id: 2}, 
    headerThree: {source:'https://raw.githubusercontent.com/fanappics/buoy/master/buoylogo.png', name: 'buoy logo'}, 
    headerFour: 'column 4', 
    headerFive: 'column 5', 
    headerSix: 'column 6', 
    name: 'example row 1', 
    id: 1
  },{headerOne: 'column 1', headerTwo: {name: 'column 2', id: 2}, headerThree: {source:'https://raw.githubusercontent.com/fanappics/buoy/master/buoylogo.png', name: 'buoy logo'}, headerFour: 'column 4', headerFive: 'column 5', headerSix: 'column 6', name: 'example row 2', id: 2},
  {headerOne: 'column 1', headerTwo: {name: 'column 2', id: 2}, headerThree: {source:'https://raw.githubusercontent.com/fanappics/buoy/master/buoylogo.png', name: 'buoy logo'}, headerFour: 'column 4', headerFive: 'column 5', headerSix: 'column 6', name: 'example row 3', id: 3}
]

<div>
  <b-table 
    :headers=headers 
    :tableData=tableData
    :totalResults=100
    :rowsPerPage=20
    :deleteAction=true
  />
</div>
```
