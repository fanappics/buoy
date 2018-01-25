<template>
  <div>
    <slot></slot>
    {{ errors }}
  </div>
</template>

<script>
import events from '../../event-bus'

export default {
  name: 'b-validator',
  props: {
    scope: {
      type: String,
      required: true
    }
  },
  inject: {
    parentScope: {
      default: null
    }
  },
  provide () {
    return {
      parentScope: this.scope
    }
  },
  created () {
    events.$on('validateAll', this.onValidateAll)
    events.$on('errorsChanged', this.onErrorsChanged)
  },
  beforeDestroy () {
    events.$off('validateAll', this.onValidateAll)
    events.$off('errorsChanged', this.onErrorsChanged)
  },
  data () {
    return {
      valid: false
    }
  },
  computed: {
    //Wrapper around valid so it is propegated through v-model, or 'public' as I've dubbed it
    publicValid: {
      get () {
        return this.valid
      },
      set (value) {
        if (this.valid !== value) {
          this.valid = value
          this.$emit('input', this.valid)
        }
      }
    }
  },
  methods: {
    onErrorsChanged (errors, field, scope) {
      if (this.scope === scope) {
        this.errors.remove(field, this.parentScope)
        errors.forEach(error => {
          if (error.field === field)
            this.errors.add({
              field: error.field,
              msg: error.msg,
              rule: error.rule,
              scope: this.parentScope
            })
        })
        this.publicValid = !this.errors.any()
        events.$emit('errorsChanged', this.errors.items, field, this.parentScope)
      }
    },
    onValidateAll (scope) {
      if (this.scope === scope || (this.parentScope && this.parentScope === scope)) {
        this.publicValid = !this.errors.any()
        events.$emit('validate', this.scope)
      }
    }
  }
}
</script>

<style scoped>
</style>
