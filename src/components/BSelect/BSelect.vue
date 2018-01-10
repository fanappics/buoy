<template>
  <div>
    <div>
      <label :id="'label-' + id">{{ selectLabel }} <span v-if=required aria-label='Required'>*</span></label>
    </div>
    <div 
      :aria-expanded="opened"
      :aria-label="selectLabel"
      :aria-owns="id"
      :aria-required="required"
      :aria-describedby="'error' + id"
      :aria-labelledby="'label-' + id"
      :id="'dropdown' + id"
      @keyup.space.prevent.stop="toggleList"
      tabindex="0"
      v-model="selectLabel"
      role="listbox"
    >
      <ul
        :class="ulClass"
        :id="id"
      >
        <li 
          :class="dropdownClass"
          @click="toggleList"
          aria-haspopup="listbox"
          >{{ selectedOption ? selectedOption.text : placeholder }}
          <span class="dropdown-arrow"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
        </li>
        <li
          v-if=opened
          v-for="option in selectOptions"
          :aria-selected="selectedOption && selectedOption.id === option.id"
          :id="'option' + option.id"
          :key="'selectOption' + option.id"
          :value=option.id
          @click="selectOption(option)"
          @keyup.up.prevent="upHandler($event)"
          @keyup.down.prevent="downHandler($event)"
          @keyup.enter.prevent="selectOption(option)"
          @keyup.space.prevent.stop="selectOption(option)"
          class="li-opened options"
          role="option"
          tabindex='-1'
        > {{ option.text }}
        </li>
      </ul>
      <span v-show="selectErrors.has('selectedOption')" class="error" :id="'error' + id">{{ selectErrors.first('selectedOption') }}</span>
    </div>
  </div>
</template>

<script>

import { Validator } from 'vee-validate'

const options = []

export default {
  name: 'b-select',
  validator: null,
  props: {
    id: {
      type: String,
      required: true
    },
    selectOptions: {
      type: Array
    },
    required: {
      type: Boolean,
      required: true
    },
    selectLabel: {
      type: String,
      required: true
    },
    initialValue: {
      type: Object,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Choose Option'
    }
  },

  methods: {

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
        document.querySelector(`#dropdown${this.id}`).focus()
      }
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
      document.querySelector(`#dropdown${this.id}`).focus()
    },

    /**
     * Handles validation if required.
     */

    validate () {
      this.validator.validate('selectedOption', this.selectedOption)
    },

    /**
     * Handles the focus setting for accessibility purposes
     */

    setFocus () {
      if (this.selectedOption) {
        const line = document.querySelector(`#${this.id} #option${this.selectedOption.id}`)
        line.focus()
      } else {
        const line = document.querySelector(`#${this.id} #option${this.selectOptions[0].id}`)
        line.focus()  
      }
    },

    /**
     * Handles the up arrow (38) key press event
     */

    upHandler (event) {
      const target = event.target;
      if(target.previousElementSibling) {
        const next = target.previousElementSibling;
        const first = next.previousElementSibling;
        if (first) {
          next.setAttribute("tabindex", "0");
          target.setAttribute("tabindex", "-1");
          next.focus();
        }
      }
    },

    /**
     * Handles the down arrow (40) key press event
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
  },

  data () {
    return {
      opened: false,
      selectedOption: this.initialValue, 
      selectErrors: null
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
        'li-opened': this.opened,
        'options': true,
        'selected': this.selectedOption,
        'unselected': !this.selectedOption,
        'invalid': this.selectErrors.items.length > 0
      }
    }
  },

  created() {
    this.validator = new Validator()
    this.validator.attach({
      name: 'selectedOption',
      rules: 'required',
      alias: this.selectLabel
    });
    this.$set(this, 'selectErrors', this.validator.errors);
  }
}

</script>

<style scoped>
  .options {
    width: 100%;
    padding: .5rem;
    border-style: solid;
    border-radius: .25rem;
    border-width: thin;
    border-color: #cccccc;
  }

  ul {
    padding: 0 1rem 0 0;
    width: 100%;
    list-style: none;
  }

  .ul-opened {
    border-style: solid;
    border-radius: .25rem;
    border-width: thin;
    box-shadow:  .125rem .25rem .3rem #cccccc;
    border-color: #cccccc;
  }

  .li-opened {
    border-radius: 0;
    border-style: none none solid none;
    border-width: thin;

  }  

  .li-opened[aria-selected] {
    font-weight: 600;
  }

  .li-opened:hover:not(:first-child) {
    background-color: #f2f2f2;
  }

  .li-opened:last-child {
    border-style: none;
  }

  .dropdown-arrow {
    float: right;
    color: #000000
  }

  .selected {
    color: #000000;
  }

  .unselected {
    color: #cccccc;
  }

  .error {
   font-family: SFUIDisplay;
   font-size: .9rem;
   color: #d0021b ;
 }
 .invalid {
   border: solid thin #d0021b ;
 }

</style>
