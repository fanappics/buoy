```js
<div>
  <b-button id="button-1" label="Primary" color="b-primary"/>
</div>
```

```js
<div>
  <b-button id="button-2" label="Secondary" color="b-secondary"/>
</div>
```

```js
<div>
  <b-button id="button-3" label="Disabled" disabled/>
</div>
```

```js
<div>
  <b-button id="button-4" label="Icon Tertiary" color="b-tertiary"><i class="ion-paper-airplane" slot="icon"></i></b-button>
</div>
```

```js
<div>
  <b-button id="button-5-1" label="Icon Only" color="b-tertiary" iconOnly><i class="ion-arrow-left-c" slot="icon"></i></b-button> <b-button id="button-5-2" label="Icon Only" color="b-tertiary" iconOnly><i class="ion-arrow-right-c" slot="icon"></i></b-button>
</div>
```

```js
let pressed = 0

<div>
  <b-button id="button-6" label="Click Events" @click="pressed++"/>
  Pressed: {{pressed}}
</div>
```
