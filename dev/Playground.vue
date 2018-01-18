<template>
  <div>
<<<<<<< HEAD
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
=======
>>>>>>> a3a9726bd2d387528be9bce35253c2febca81836
  </div>
</template>
        
<script>

  export default {
    components: {
    },
    data () {
      return {
<<<<<<< HEAD
        toggleValue: false,
        password: '',
        valid: false
=======
>>>>>>> a3a9726bd2d387528be9bce35253c2febca81836
      }
    }
  }
</script>
