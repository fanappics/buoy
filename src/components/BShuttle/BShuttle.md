```js

const options = [{id: 1, displayText: 'This'}, {id: 2, displayText: 'Is'}, {id: 3, displayText: 'An Example'}]
const selected1 = []
const selected2 = [1]
const placeholder = 'You need to do something first'

<div>
  <div>
    <b-shuttle
      :placeholder="placeholder"
      chosenLabel='These have been chosen'
      availableLabel='These can be chosen'

    />
  </div>

  <div>
    <p>Selected:</p>
  </div>
  
  <div>
    <b-shuttle
      :options="options"
      chosenLabel='These have been chosen'
      availableLabel='These can be chosen'
      v-model="selected1"
    />
  </div>

  <div>
    <p>Selected: {{ selected1 }}</p>
  </div>
  
  <div>
    <b-shuttle
      :options="options"
      chosenLabel='These have been chosen'
      availableLabel='These can be chosen'
      v-model="selected2"
    />
  </div>

  <div>
    <p>Selected: {{ selected2 }}</p>
  </div>

</div>
```