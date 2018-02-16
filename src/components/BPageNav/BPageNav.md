### Example Usage

```js
let links = [
  { label: 'Lone Required Input', href: 'bpn-input-1', completed: false },
  { label: 'Email', href: 'bpn-input-2', completed: false }
]

<div style="display: flex">
  <div style="margin-right: 1rem;">
    <b-page-nav :links="links" column />
  </div>
  <div style="flex-grow: 1">
    <b-validator scope="bpn-scope-1" v-model="links[0].completed">
      <b-input id='bpn-input-1' label='Lone Required Input' required />
    </b-validator>
    <br>
    <b-container label="Header">
      <b-validator scope="bpn-scope-2" v-model="links[1].completed">
        <b-input id="bpn-input-2" type="email" label="Email" required />
      </b-validator>
    </b-container>
  </div>
</div>
```

### Column Example With Accordions

```js
let links = [
  { label: 'Lone Input', href: 'bpn-input-3', completed: true },
  { label: 'Header', href: 'bpn-header-1', completed: false, event: 'expand-bpn-header-1' },
  { label: 'Collapsed Header', href: 'bpn-header-2', completed: false, event: 'expand-bpn-header-2' }
]

<div style="display: flex">
  <div style="margin-right: 1rem;">
    <b-page-nav :links="links" column />
  </div>
  <div style="flex-grow: 1">
    <b-input id='bpn-input-3' label='Lone Input' />
    <br>
    <b-accordion id="bpn-header-1" label="Header">
      <b-validator scope="bpn-scope-3" v-model="links[1].completed">
        <b-input id="bpn-input-4" type="email" label="Email" required />
      </b-validator>
    </b-accordion>
    <b-accordion id="bpn-header-2" label="Collapsed Header" collapsed>
      <b-validator scope="bpn-scope-4" v-model="links[2].completed">
        <b-textarea id="bpn-textarea-1" label="Write me a novel" required />
      </b-validator>
    </b-accordion>
  </div>
</div>
```
