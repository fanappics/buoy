```js
let links = [
  { label: 'Lone Input', href: 'input-1', completed: true },
  { label: 'Header', href: 'header-1', completed: false, event: 'expand-header-1' },
  { label: 'Collapsed Header', href: 'header-2', completed: false, event: 'expand-header-2' }
]

<div style="display: flex">
  <div>
    <b-page-nav :links="links" />
  </div>
  <div style="flex-grow: 1">
    <b-input id='input-1' label='Lone Input' />
    <b-accordion id="header-1" label="Header">
      <b-validator scope="header" v-model="links[1].completed">
        <b-input id="input-2" type="email" label="Email" required />
      </b-validator>
    </b-accordion>
    <b-accordion id="header-2" label="Collapsed Header" collapsed>
      <b-validator scope="other-header" v-model="links[2].completed">
        <b-textarea id="textarea-1" label="Write me a novel" required />
      </b-validator>
    </b-accordion>
  </div>
</div>
```
