```js
let text = 'My default text'
let date = '1776-07-04'
let password = ''

<div>
  <b-input id="input-1" label="Text Input" placeholder="Type something"/>
  <br>
  <b-input id="input-2" label="Disabled Input" disabled/>
  <br>
  <b-input id="input-3" label="Required Input" required/>
  <br>
  <b-input id="input-4" label="Currency Input" type="currency" validationName="currency"/>
  <br>
  <div>
    <b-input id="input-5" label="Data Binded Input" v-model="text"/>
    Current value: {{text}}
  </div>
  <br>
  <div>
    <b-input id="input-6" label="Date Input" type="date" v-model="date"/>
    Current value: {{date}}
  </div>
  <br>
  <b-input id="input-7" label="New Password" type="password" placeholder="Between 8 and 16 characters" required :minlength="8" :maxlength="16" v-model="password"/>
  <br>
  <b-input id="input-8" label="Confirm Password" type="password" required :pattern="password"/>
</div>
```