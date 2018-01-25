<template>
  <div class='shuttle'>

    <div class='available'>
      <label id='available-label'>{{ availableLabel }}</label>
      <ul
        aria-labeledby='available-label'
        role='selectbox'
      >
        <li
          v-if="placeholder && (!options || options.length === 0)"
          :aria-label="placeholder"
          class='placeholder'
        >
        {{ placeholder }}
        </li>
        <li
          v-for="option in availableOptions"
          :key="'available-option-' + option.id"
          :id="'available-option-' + option.id"
          :class="optionsClass(option, 'available')"
          @click="onOptionClick(option, 'available', 'chosen', $event)"
          @keyup.space.prevent.stop="onOptionClick(option, 'available', 'chosen', $event)"
          @keyup.down.prevent.stop="onKeyupDown($event, option, 'available', 'chosen')"
          @keyup.up.prevent.stop="onKeyupUp($event, option, 'available', 'chosen')"
          @keyup.16.prevent.stop="onOptionClick(option, 'available', 'chosen', $event)"
          @keyup.right.prevent.stop="onMoveSelectedClick(selectedOptions, 'available')"
          @keyup.enter.prevent.stop="onMoveSelectedClick(selectedOptions, 'available')"
          @keydown.up.prevent.stop
          @keydown.down.prevent.stop
          @keydown.space.prevent.stop
          role='option'
          tabindex='0'
        >
        {{ option.displayText }}
        </li>
      </ul>
    </div>

    <div class='buttons'>
      <button 
        @click="onMoveAllOptions('available')"
        id='all-to-chosen'
        type='button'
        >
        All <i class='fa fa-arrow-right' aria-hidden='true'></i>
      </button>
      <button 
        @click="onMoveSelectedClick(selectedOptions, 'available')"
        id='selected-to-chosen'
        type='button'
        >
        <i class='fa fa-arrow-right' aria-hidden='true'></i>
      </button>
      <button
        @click="onMoveSelectedClick(selectedOptions, 'chosen')"
        id='selected-to-available'
        type='button'>
        <i class='fa fa-arrow-left' aria-hidden='true'></i>
      </button>
      <button 
        @click="onMoveAllOptions('chosen')"
        id='all-to-available'
        type='button'
        >
        All <i class='fa fa-arrow-left' aria-hidden='true'></i>
      </button>
    </div>

    <div class='chosen'>
      <label id='chosen-label'>{{ chosenLabel }}</label>
      <ul
        aria-labeledby='chosen-label'
        role='selectbox'
      >
        <li
          v-for="option in chosenOptions"
          :key="'chosen-option-' + option.id"
          :id="'chosen-option-' + option.id"
          :class="optionsClass(option, 'chosen')"
          @click="onOptionClick(option, 'chosen', 'available', $event)"
          @keyup.space.stop.prevent.stop="onOptionClick(option, 'chosen', 'available', $event)"
          @keyup.down.prevent.stop="onKeyupDown($event, option, 'chosen', 'available')"
          @keyup.up.prevent.stop="onKeyupUp($event, option, 'chosen', 'available')"
          @keyup.16.prevent.stop="onOptionClick(option, 'chosen', 'available', $event)"
          @keyup.left.prevent.stop="onMoveSelectedClick(selectedOptions, 'chosen')"
          @keyup.enter.prevent.stop="onMoveSelectedClick(selectedOptions, 'chosen')"
          @keydown.up.prevent.stop
          @keydown.down.prevent.stop
          @keydown.space.prevent.stop
          role='option'
          tabindex='0'
        >
          {{ option.displayText }}
        </li>
      </ul>
      <span v-show="shuttleErrors.has('chosenOptions')" class="error-text" :id="'error-' + id">{{ shuttleErrors.first('chosenOptions') }}</span>
    </div>

  </div>
  
</template>

<script>

import { Validator } from 'vee-validate'

export default {
  name: 'b-shuttle',
  props: {
    /**
    * Component Id
    */
    id: {
      type: String,
      required: true
    },
    /**
    * The available options for the shuttle.
    */
    options: {
      type: Array,
      required: false
    },
    /**
    * Placeholder to display if shuttle is dependent on other component.
    */
    placeholder: {
      type: String,
      required: false
    },
    /**
    * Label to display above available options.
    */
    availableLabel: {
      type: String,
      required: true
    },
    /**
    * Label to display above chosen options.
    */
    chosenLabel: {
      type: String,
      required: true
    },
    /**
    * Use to turn on validation
    */
    required: {
      type: Boolean,
    },
    /**
    * The id(s) of the selected option(s).
    */
    value: {
      type: Array,
      required: false,
      default: function () { return [] }
    }
  },

  data () {
    return {
      availableOptions: (this.options && this.options.length > 0) ? this.setOptions(this.options, this.value, 'available') : new Array,
      selectedOptions: {'available': new Array, 'chosen': new Array},
      chosenOptions: (this.value && this.options) ? this.setOptions(this.options, this.value, 'chosen') : new Array,
      lastClick: 0,
      shuttleErrors: null
    }
  },

  computed: {
  },

  created() {
    Validator.extend('notEmpty', {
      getMessage: field => 'The ' + field + ' input is required.',
      validate: value => value.length > 0
    });
    this.validator = new Validator()
    this.validator.attach({
      name: 'chosenOptions',
      rules: 'notEmpty',
      alias: this.chosenLabel
    });
    this.$set(this, 'shuttleErrors', this.validator.errors);
  },

  methods: {

    /**
     * @param {Array<Object>} options
     * @param {Array<Number>} selected
     * @param {String} type
     * this method sets up the initial state of the options
     */
    setOptions: function (options, selected, type) {
      const availableOptions = new Array
      const chosenOptions = new Array
      options.forEach(function (option) {
        if (selected === null) {
          availableOptions.push(option)
        } else if (selected.indexOf(option.id) === -1) {
          availableOptions.push(option)
        } else {
          chosenOptions.push(option)
        }
      })
      if (type === 'available') {
        return this.sortById(availableOptions)
      } else if (type === 'chosen') {
        return this.sortById(chosenOptions)   
      }
    },

    /**
     * @param {Object} option
     * @param {String} optionType
     * this determines if an option has been highlighted and
     * sets the correct class.
     */
    optionsClass: function (option, optionType) {
      return {
        'options': true,
        'selected': this.selectedOptions[optionType].indexOf(option.id) > -1
      }
    },

    /**
     * @param {Object} option
     * @param {String} optionType
     * @param {String} otherOptionType
     * @param {Object} event
     * this is fired when a line is clicked and updates
     * selectedOptions accordingly.
     */
    onOptionClick (option, optionType, otherOptionType, event) {
      if (this.selectedOptions[otherOptionType].length > 0) { this.selectedOptions[otherOptionType] = new Array }
      if (event.shiftKey && (this.lastClick > 0)) {
        this.multipleSelect(option, optionType)
      }
      this.selectOption(option.id, optionType)
    },

    /**
     * @param {Array<Object>} options
     * @param {String} type
     * this moves all selected options from available to 
     * chosen, or back depending on type.
     */
    onMoveSelectedClick (options, type) {
      const loopOptions = (type === 'available') ? this.availableOptions : this.chosenOptions
      const availableOptions = new Array
      const chosenOptions = new Array
      loopOptions.forEach((option) => {
        const index = this.selectedOptions[type].indexOf(option.id)
        if (index > -1) {
          (type === 'available') ? chosenOptions.push(option) : availableOptions.push(option)
        } else {
          (type === 'available') ? availableOptions.push(option) : chosenOptions.push(option)
        }
      })
      if (type === 'available') {
        this.availableOptions = this.sortById(availableOptions)
        this.chosenOptions.push.apply(this.chosenOptions, chosenOptions)
        this.sortById(this.chosenOptions)
      } else {
        this.availableOptions.push.apply(this.availableOptions, availableOptions)
        this.sortById(this.availableOptions)
        this.chosenOptions = this.sortById(chosenOptions)
      }
      this.selectedOptions = {'available': new Array, 'chosen': new Array}
      if (this.required) {
        this.validate()
      }
      this.$emit("input",Array.from(this.chosenOptions, option => option.id));
    },

    /**
     * @param {String} type
     * This will move all options to chosen or available
     * depending on tyep
     */
    onMoveAllOptions (type) {
      if (type === 'available') {
        this.chosenOptions = this.sortById(this.options)
        this.availableOptions = new Array
      } else if (type === 'chosen') {
        this.chosenOptions = new Array
        this.availableOptions = this.sortById(this.options)
      }
      this.selectedOptions = {'available': new Array, 'chosen': new Array}
      if (this.required) {
        this.validate()
      }
      this.$emit("input",Array.from(this.chosenOptions, option => option.id));
    },

    /**
     * Handles the down arrow (40) keyup event
     */
    onKeyupDown (event, option, optionType, otherOptionType) {
      const target = event.target;
      if(target.nextElementSibling) {
        const next = target.nextElementSibling;
        next.focus();
        if (event.shiftKey) {
          if (this.selectedOptions[otherOptionType].length > 0) { this.selectedOptions[otherOptionType] = new Array }
          this.selectOption(option.id, optionType)
        }
      }
    },

    /**
     * Handles the up arrow (38) keyup event
     */
    onKeyupUp (event, option, optionType, otherOptionType) {
      const target = event.target;
      if(target.previousElementSibling) {
        const next = target.previousElementSibling;
        next.focus();
        if (event.shiftKey) {
          if (this.selectedOptions[otherOptionType].length > 0) { this.selectedOptions[otherOptionType] = new Array }
          this.selectOption(option.id, optionType)
        }      }
    }, 

    /**
     * @param {Number} id
     * @param {String} optionType
     * This is a helper function that determins the state of
     * an option, and sets lastClick, which assists in multiselect.
     */
    selectOption (id, optionType) {
      const index = this.selectedOptions[optionType].indexOf(id)
      if (index > -1) {
        this.selectedOptions[optionType].splice(index, 1)
      } else {
        this.selectedOptions[optionType].push(id)
      }
      this.lastClick = id
      if (this.required) {
        this.validate()
      }
    },

    /**
     * @param {Object} option
     * @param {String} optionType
     * Expected behavior here is that a preselected item
     * that is hit with a multi-select will flip its state
     * accordingly.
     */
    multipleSelect (option, optionType) {
      const high = option.id > this.lastClick ? option.id : this.lastClick
      const low = option.id > this.lastClick ? this.lastClick : option.id
      const multipleOptions = this.options
        .filter(item => (item.id > low && item.id < high))
        .map(function(obj){return obj.id})
      
      multipleOptions.forEach( (optionId) => {
        const index = this.selectedOptions[optionType].indexOf(optionId)
        this.selectOption(optionId, optionType)
      })
    },

    /**
     * @param {Array<Object>} options
     * @returns {Array<Object>}
     * Sorts the options by id
     */
    sortById (options) {
      options.sort(function (itemOne, itemTwo) {
        return itemOne.id - itemTwo.id
      })
      return options 
    },

    /**
     * Handles validation if required.
     */
    validate () {
      this.validator.validate('chosenOptions', this.chosenOptions)
    }
  }
}
</script>

<style scoped>

  ul {
    list-style: none;
    border-style: solid;
    border-width: thin;
    border-color: #dededf;
    height: 10rem;
    padding: 0;
    margin: 0;
    overflow: scroll;
    overflow-x: hidden;
  }

  div.available {
    flex: 1;
    margin-right: 1rem;
  }

  div.chosen {
    flex: 1;
    margin-left: 1rem;
  }

  div.buttons {
    margin-top: 1.2rem
  }

  button {
    display: block;
    border-color: #dededf;
    padding: .25rem .50rem .25rem .50rem;
    margin: .3rem 0 .3rem 0;
    background: none;
    border-radius: .25rem;
    width: 3rem;
  }

  button:hover {
    cursor: pointer;
  }

  .shuttle {
    display: flex;
  }

  i {
    color: #00aaed;
  }

  li.placeholder {
    color: #dededf;
  }

  li.options:hover {
    cursor: pointer;
  }

  li.selected {
    background-color: #00aaed;
    color: #ffffff;
  }

</style>
