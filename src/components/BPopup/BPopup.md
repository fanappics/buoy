<docs>
BPopup on a Button

```js
let popupVisible = false

<div>
  <b-button @click="popupVisible = true">
    Click me
  </b-button>
  <b-popup
    :visible="popupVisible"
    message="You clicked this button."
    @close="popupVisible = false"
  />
</div>
```

Play with size

```js
let popupVisible = false

<div>
  <b-button @click="popupVisible = true">
    Click me
  </b-button>
  <b-popup
    :visible="popupVisible"
    message="A slim popup."
    width="200"
    height="44"
    @close="popupVisible = false"
  />
</div>
```

Play with position

```js
let popupVisible = false

<div>
  <b-button @click="popupVisible = true">
    Click me
  </b-button>
  <b-popup
    :visible="popupVisible"
    message="Above the button."
    offset-x="-50"
    offset-y="-135"
    @close="popupVisible = false"
  />
</div>
```

BPopup Confirmation Example

```js
let popupVisible = false
let confirmed = false

<div>
  <b-button @click="popupVisible = true">
    Delete all files
  </b-button>
  <b-popup
    :visible="popupVisible"
    message="Are you sure this is what you want?"
    confirm
    @close="popupVisible = false"
    @confirm="confirmed = true"
  />
  Confirmed: {{confirmed}}
</div>
```
</docs>
