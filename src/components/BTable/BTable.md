```js

const makeLink = function(data) {
  return `<a href=${ data.id }>${ data.name }</a>`
}

const makeLinkGroup = function(data) {
  console.log(data)
  let html = ''
  data.forEach(function(action) {
    switch(action) {
      case 'delete':
        html += `<span class="ion-ios-trash" style="color: #4d90fe; font-size: 18px"></span><a href=${ data.id } class='link-group'> Delete</a>`
        break;
    }
  })
  return html
}

const headers = [
  {name: 'Header 1', key: 'header_one'}, 
  {name: 'Header 2', key: 'header_two', render: makeLink},
  {name: 'Header 3', key: 'header_three'},
  {name: 'Header 4', key: 'header_four'},
  {name: 'Header 5', key: 'header_five'},
  {name: 'Header 6', key: 'header_six'},
  {name: '', key: 'actions', render: makeLinkGroup}
  ]


const tableData = [
  {header_one: 'column 1', header_two: {name:'column 2', id: 2}, header_three: 'column 3', header_four: 'column 4', header_five: 'column 5', header_six: 'column 6', name: 'example row 1', actions: ['delete']},
  {header_one: 'column 1', header_two: {name:'column 2', id: 2}, header_three: 'column 3', header_four: 'column 4', header_five: 'column 5', header_six: 'column 6', name: 'example row 2', actions: ['delete']},
  {header_one: 'column 1', header_two: {name:'column 2', id: 2}, header_three: 'column 3', header_four: 'column 4', header_five: 'column 5', header_six: 'column 6', name: 'example row 3', actions: []}
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
