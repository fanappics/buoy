<template>
  <div>
  <b-validator scope="parent" v-model="valid">
    <b-validator scope="child1">
      <b-input id="email" type="email" label="email" required/>
    </b-validator>
    <b-validator scope="child2">
      <b-input id="password" type="password" label="Password" v-model="password" required />
      <b-input id="password2" type="password" :pattern="`^${password}`" label="Retype password" required/>
    </b-validator>

    {{ valid }}

    <b-button :disabled="!valid">Log In</b-button>

  </b-validator>
  </div>
</template>

<script>
  export default {
    components: {
    },
    data () {
      return {
        toggleValue: false,
        password: '',
        valid: false
      }
    }
  }
</script>
