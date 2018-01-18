import events from '../../event-bus'

export default function Validation (params) {
  return {
    props: {
      value: String,
      fieldName: String
    },
    created () {
      events.$on('validate', this.onValidate)
    },
    beforeDestroy () {
      events.$off('validate', this.onValidate)
    },
    data () {
      return {
        privateValue: this.value || '',
        touched: false,
        validationAttributes: {
          'data-vv-name': this.fieldName, // Specifies a name for the field, used in components validation and as a fallback name for inputs.
          'data-vv-validate-on': params.validateOn || 'input|blur' // Used to specify a list of event names separated by pipes, the default varies by the type of the input
        }
      }
    },
    computed: {
      invalid () {
        return this.touched && this.errors.any()
      },
      // Wrapper around privateValue so it is propegated through v-model, or 'public' as I've dubbed it
      publicValue: {
        get () {
          return this.privateValue
        },
        set (value) {
          this.privateValue = value
          this.$emit('input', this.privateValue)
        }
      }
    },
    methods: {
      onValidate (scope) {
        if (!this.parentScope || this.parentScope === scope) {
          this.$validator.validateAll(scope)
        }
      }
    },
    inject: {
      parentScope: {
        default: null
      }
    },
    // Emits errors that propagate to parent validation objects
    watch: {
      'errors.items': {
        handler: function (errors) {
          console.log(errors.length, this.fieldName, this.parentScope)
          // Change field name to a identifier for the component in invalid state.  Should be the same as data-vv-name
          events.$emit('errorsChanged', errors, this.fieldName, this.parentScope)
        }
      }
    }
  }
}
