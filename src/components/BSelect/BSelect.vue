<template>
  <div>
    <div>
      <label :id="`label-${id}`">{{ label }}<span v-if="required" aria-label='Required'>*</span></label>
    </div>
    <button
      :class="dropdownClass"
      :aria-expanded="opened"
      :aria-owns="id"
      :aria-required="required"
      :aria-describedby="`error-${id}`"
      :aria-labelledby="`label-${id} dropdown-${id}`"
      :id="`dropdown-${id}`"
      :ref="`dropdown-${id}`"
      @keyup.space.prevent.stop="toggleList"
      @keyup.enter.prevent.stop="toggleList"
      @mousedown.prevent.stop="toggleList"
      :text="label"
      aria-haspopup="listbox"
      type="button"
      >
      {{ selectedOption ? selectedOption.value : placeholder }}

      <span class="dropdown-arrow"><i class='icon ion-arrow-down-b' aria-hidden='true'></i></span>
    </button>
    <ul
      :class="ulClass"
      :id="id"
      role="listbox"
    >
      <li
        v-if="opened"
        v-for="option in options"
        :aria-selected="selectedOption && selectedOption.id === option.id"
        :id="`option-${option.id}`"
        :key="`selectOption${option.id}`"
        :value="option.id"
        :ref="`option-${option.id}`"
        @blur.prevent.stop="handleBlur($event)"
        @mousedown.stop="selectOption(option)"
        @keyup.up.prevent="upHandler($event)"
        @keyup.down.prevent="downHandler($event)"
        @keydown.up.prevent
        @keydown.down.prevent
        @keyup.enter.prevent.stop="selectOption(option)"
        @keyup.space.prevent.stop="selectOption(option)"
        @keyup.esc.prevent.stop="toggleList"
        class="options"
        role="option"
        tabindex="-1"
      > 
        {{ option.value }}
      </li>
    </ul>
    <span v-if="invalid" class="error-text" :id="`error-${id}`">{{ errors.first(validationId) }}</span>
  </div>
</template>

<script>

import validationMixIn from '../../mixins/validation'

export default {
  name: 'b-select',
  mixins: [validationMixIn()],
  props: {
    /**
    * Component Id
    */
    id: {
      type: String,
      required: true
    },
    /**
    * Label of component.
    */
    label: {
      type: String,
      required: true
    },
    /**
    * Array of objects {id: number, value: string} to be displayed as options.
    */
    options: {
      type: Array
    },
    /**
    * The Placeholder text for the component.
    * If no preselection, this is the placeholder text for the component.
    */
    placeholder: {
      type: String,
      required: false,
      default: 'Choose Option'
    },
    /**
    * Use to turn on validation and to indicate field is required.
    */
    required: {
      type: Boolean,
    },
    /**
    * The id of the selected option.
    */
    value: {
      type: Number,
      required: false
    }
  },
  data () {
    return {
      opened: false,
      selectedOption: this.value ? this.options[this.options.map(function(option) { return option.id }).indexOf(this.value)] : null,
      touched: false
    }
  },
  computed: {
    ulClass: function () {
      return {
        'ul-opened': this.opened
      }
    },
    dropdownClass: function () {
      return {
        'dropdown-opened': this.opened,
        'dropdown': true,
        'placeholder': !this.selectedOption,
        'error-border': this.invalid
      }
    }
  },
  created() {
    this.$validator.attach({
      name: this.validationId,
      rules: 'required',
      alias: this.label
    });
    this.validate()
  },
  methods: {
    /**
     * Handles the down arrow (40) keyup event
     */
    downHandler (event) {
      const target = event.target;
      if(target.nextElementSibling) {
        const next = target.nextElementSibling;
        next.setAttribute("tabindex", "0");
        target.setAttribute("tabindex", "-1");
        next.focus();
      }
    }, 
    /**
     * Handles blur event.
     */
    handleBlur (event) {
      this.$nextTick(function () {
        if (document.activeElement.className !== event.target.className) {
          this.opened = false
          this.touched = true
          this.validate()
        }
      })
    },
    /**
     * @param {Object} option
     * Handles the selection of a line and closed the list.
     */
    selectOption (option) {
      this.selectedOption = option
      this.opened = !this.opened
      if (this.required) {
        this.validate()
      }
      this.$emit("input", this.selectedOption.id)
      document.querySelector(`#dropdown-${this.id}`).focus()
    },
    /**
     * Handles the focus setting for accessibility purposes
     */
    setFocus () {
      if (this.selectedOption) {
        const line = this.$refs[`option-${this.selectedOption.id}`][0]
        line.focus()
      } else {
        const line = this.$refs[`option-${this.options[0].id}`][0]
        line.focus()  
      }
    },
    /**
     * Shows and hides line options for the select list.
     */
    toggleList () {
      this.opened = !this.opened
      if (this.opened) {
        this.$nextTick( function () {
          this.setFocus()
        })
      } else {
        if (this.required) {
          this.validate()
        }
        document.querySelector(`#dropdown-${this.id}`).focus()
      }
    },
    /**
     * Handles the up arrow (38) keyup event
     */
    upHandler (event) {
      const target = event.target;
      if(target.previousElementSibling) {
        const next = target.previousElementSibling;
        const first = next.previousElementSibling;
        next.setAttribute("tabindex", "0");
        target.setAttribute("tabindex", "-1");
        next.focus();
      }
    },
    /**
     * Handles validation if required.
     */
    validate () {
      this.$validator.validate(this.validationId, this.selectedOption)
    }
  }
}

</script>

<style scoped>

  button.dropdown {
    width: 100%;
    text-align: left;
  }

  button.dropdown-opened {
    margin-bottom: 0;
    border-radius: .25rem .25rem 0 0;
  }

  ul {
    padding: 0 1rem 0 0;
    list-style: none;
    margin: 0;
  }

  .ul-opened {
    border-style: none solid solid solid;
    border-radius: 0 0 .25rem .25rem;
    border-width: thin;
    box-shadow:  .125rem .25rem .3rem #cccccc;
    border-color: #cccccc;
  }

  .options {
    border-radius: 0;
    border-style: none none solid none;
    border-width: thin;
    width: 100%;
    padding: .5rem;
    border-color: #cccccc;
  }  

  .options[aria-selected] {
    font-weight: 600;
  }

  .options:hover {
    background-color: #f2f2f2;
  }

  .options:last-child {
    border-style: none;
  }

  .dropdown-arrow {
    float: right;
    color: #000000
  }

</style>
