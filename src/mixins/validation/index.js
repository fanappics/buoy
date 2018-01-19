import events from '../../event-bus'

export default function Validation (eventTypes = 'input|blur') {
  return {
    inject: {
      parentScope: {
        default: null
      }
    },
    props: {
      validationId: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        validationAttributes: {
          'data-vv-name': this.validationId, // Specifies a name for the field, used in components validation and as a fallback name for inputs.
          'data-vv-validate-on': eventTypes // Used to specify a list of event names separated by pipes, the default varies by the type of the input
        }
      }
    },
    computed: {
      invalid () {
        return (this.touched || typeof this.touched === 'undefined') && this.errors.any()
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
