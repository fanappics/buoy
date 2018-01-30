import events from '../../event-bus'

export default function Validation (eventTypes = 'input|blur') {
  return {
    inject: {
      parentScope: {
        default: null
      }
    },
    props: {
      validationName: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        validationId: null
      }
    },
    computed: {
      invalid () {
        return this.errors.any()
      },
      validationAttributes () {
        return {
          'data-vv-as': this.validationName,
          'data-vv-name': this.validationId, // Specifies a name for the field, used in components validation and as a fallback name for inputs.
          'data-vv-validate-on': eventTypes // Used to specify a list of event names separated by pipes, the default varies by the type of the input
        }
      }
    },
    // Emits errors that propagate to parent validation objects
    watch: {
      'errors.items': {
        handler: function (errors) {
          events.$emit('errorsChanged', errors, this.validationId, this.parentScope)
        }
      }
    },
    created () {
      this.validationId = this._uid.toString()
      events.$on('validate', this.onValidate)
    },
    beforeDestroy () {
      events.$off('validate', this.onValidate)
    },
    methods: {
      onValidate (scope) {
        if (!this.parentScope || this.parentScope === scope) {
          this.$validator.validateAll(scope)
        }
      }
    }
  }
}
