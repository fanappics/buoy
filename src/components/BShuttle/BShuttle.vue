<template>
  <div class='shuttle'>

    <div class='b-shuttle-available'>
      <label :id="`available-label-${id}`">{{ availableLabel }}</label>
      <ul
        :aria-labelledby="`available-label-${id}`"
        :aria-describedby="`placeholder-${id}`"
        :tabindex="(placeholder && (!options || options.length === 0)) ? 0 : null"
        role='listbox'
        class='input'
      >
        <li
          v-if="placeholder && (!options || options.length === 0)"
          :id="`placeholder-${id}`"
          :aria-label="placeholder"
          class='placeholder b-shuttle-options'
        >
          {{ placeholder }}
        </li>
        <li
          v-for="option in availableOptions"
          :key="`available-option-${id}-${option.id}`"
          :id="`available-option-${id}-${option.id}`"
          :class="optionsClass(option, 'available')"
          @click="onOptionClick(option, 'available', 'chosen', $event)"
          @keyup.space.prevent.stop="onOptionClick(option, 'available', 'chosen', $event)"
          @keyup.down.prevent.stop="onKeyupDown($event, option, 'available', 'chosen')"
          @keyup.up.prevent.stop="onKeyupUp($event, option, 'available', 'chosen')"
          @keyup.right.prevent.stop="onMoveSelectedClick(availableOptions,'available')"
          @keyup.enter.prevent.stop="onMoveSelectedClick(availableOptions,'available')"
          @keydown.up.prevent.stop
          @keydown.down.prevent.stop
          @keydown.space.prevent.stop
          role='option'
          tabindex='0'
        >
          {{ option.value }}
        </li>
      </ul>
    </div>

    <div class='b-shuttle-buttons'>
      <button 
        @click="onMoveAllOptions('available')"
        :id="`all-to-chosen-${id}`"
        :disabled="availableOptions.length == 0"
        title="Move All To Chosen"
        type='button'
      >
        <img class="icon" :src="allToChosen" />
      </button>
      <button 
        @click="onMoveSelectedClick(availableOptions, 'available')"
        :id="`selected-to-chosen-${id}`"
        :disabled="availableOptions.length == 0"
        title="Move Selected To Chosen"
        type='button'
      >
        <i class='icon ion-arrow-right-c' aria-hidden='true'></i>
      </button>
      <button
        @click="onMoveSelectedClick(chosenOptions, 'chosen')"
        :id="`selected-to-available-${id}`"
        :disabled="chosenOptions.length == 0"
        title="Move Selected To Available"
        type='button'
      >
        <i class='icon ion-arrow-left-c' aria-hidden='true'></i>
      </button>
      <button 
        @click="onMoveAllOptions('chosen')"
        :id="`all-to-available-${id}`"
        :disabled="chosenOptions.length == 0"
        title="Move All To Available"
        type='button'
      >
        <img class="icon" :src="allToAvailable" />
      </button>
    </div>

    <div class='b-shuttle-chosen'>
      <label :id="`chosen-label-${id}`">{{ chosenLabel }}</label>
      <ul
        :aria-labelledby="`chosen-label-${id}`"
        role='listbox'
        class='input'
      >
        <li
          v-for="option in chosenOptions"
          :key="`chosen-option-${id}-${option.id}`"
          :id="`chosen-option-${id}-${option.id}`"
          :class="optionsClass(option, 'chosen')"
          @click="onOptionClick(option, 'chosen', 'available', $event)"
          @keyup.space.stop.prevent.stop="onOptionClick(option, 'chosen', 'available', $event)"
          @keyup.down.prevent.stop="onKeyupDown($event, option, 'chosen', 'available')"
          @keyup.up.prevent.stop="onKeyupUp($event, option, 'chosen', 'available')"
          @keyup.left.prevent.stop="onMoveSelectedClick(chosenOptions, 'chosen')"
          @keyup.enter.prevent.stop="onMoveSelectedClick(chosenOptions, 'chosen')"
          @keydown.up.prevent.stop
          @keydown.down.prevent.stop
          @keydown.space.prevent.stop
          role='option'
          tabindex='0'
        >
          {{ option.value }} 

        </li>
      </ul>
      <span v-show="errors.has(validationId)" class="error-text" :id="'error-' + id">{{ errors.first(validationId) }}</span>

    </div>

  </div>
  
</template>

<script>

import validationMixIn from '../../mixins/validation'

export default {
  name: 'b-shuttle',
  mixins: [validationMixIn()],
  props: {
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
      availableOptions: (this.options && this.options.length > 0) ? this.setOptions(this.options, this.value, 'available') : [],
      selectedOptions: {'available': [], 'chosen': []},
      chosenOptions: (this.value && this.options) ? this.setOptions(this.options, this.value, 'chosen') : [],
      lastClick: 0,
      id: null,
      allToChosen: require('../../../static/doubleArrow.svg'),
      allToAvailable: require('../../../static/doubleArrow-left.svg')
    }
  },

  created() {
    this.$validator.extend('notEmpty', {
      getMessage: field => `The ${field} input is required.`,
      validate: value => value.length > 0
    });
    this.$validator.attach({
      name: this.validationId,
      rules: 'notEmpty',
      alias: this.chosenLabel
    });

  },

  mounted() {
    this.id = this._uid
  },

  methods: {

    /**
     * @param {Array<Object>} options
     * @param {Array<Number>} selected
     * @param {String} type
     * this method sets up the initial state of the options
     */
    setOptions: function (options, selected, type) {
      const availableOptions = []
      const chosenOptions = []
      options.forEach(function (option) {
        if ((selected === null) || (selected.indexOf(option.id) === -1)) {
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
        'b-shuttle-options': true,
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
      if (this.selectedOptions[otherOptionType].length > 0) { this.selectedOptions[otherOptionType] = [] }
      if (event.shiftKey && (this.lastClick > 0)) {
        this.multipleSelect(option, optionType)
      } else if (event.altKey) {
        if (optionType === 'available') {
          const index = this.availableOptions.findIndex(item => item.id === option.id)
          const optionToMove = this.availableOptions[index]
          this.availableOptions.splice(index, 1)
          this.moveItems(this.availableOptions, [optionToMove], optionType)
        } else {
          const index = this.chosenOptions.findIndex(item => item.id === option.id)
          const optionToMove = this.chosenOptions[index]
          this.chosenOptions.splice(index, 1)
          this.moveItems(this.chosenOptions, [optionToMove], optionType)
        }
      }
      this.selectOption(option.id, optionType)
    },

    /**
     * @param {Array<Object>} options
     * @param {String} type
     * this moves all selected options from available to 
     * chosen, or back depending on type.
     */
    onMoveSelectedClick (options, optionType) {
      const availableOptions = []
      const chosenOptions = []
      options.forEach((option) => {
        const index = this.selectedOptions[optionType].indexOf(option.id)
        if (index > -1) {
          (optionType === 'available') ? chosenOptions.push(option) : availableOptions.push(option)
        } else {
          (optionType === 'available') ? availableOptions.push(option) : chosenOptions.push(option)
        }
      })
      optionType === 'available' ? this.moveItems(availableOptions, chosenOptions, optionType) : this.moveItems(chosenOptions, availableOptions, optionType)

    },

    /**
     * @param {Array<Object>} moveFrom 
     * @param {Array<Object>} moveTo 
     * @param {String} optionType 
     * help frunction for moving items
     */

    moveItems (moveFrom, moveTo, optionType) {
      if (optionType === 'available') {
        this.availableOptions = this.sortById(moveFrom)
        this.chosenOptions.push.apply(this.chosenOptions, moveTo)
        this.sortById(this.chosenOptions)
      } else {
        this.availableOptions.push.apply(this.availableOptions, moveTo)
        this.sortById(this.availableOptions)
        this.chosenOptions = this.sortById(moveFrom)
      }
      this.selectedOptions = {'available': [], 'chosen': []}
      if (this.required) {
        this.validate()
      }
      this.$emit('input', Array.from(this.chosenOptions, option => option.id));
    },

    /**
     * @param {String} type
     * This will move all options to chosen or available
     * depending on type
     */
    onMoveAllOptions (optionType) {
      if (optionType === 'available')
        this.moveItems([], this.availableOptions.slice(0), optionType)
      else
        this.moveItems([], this.chosenOptions.slice(0), optionType)
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
          if (this.selectedOptions[otherOptionType].length > 0) { this.selectedOptions[otherOptionType] = [] }
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
          if (this.selectedOptions[otherOptionType].length > 0) { this.selectedOptions[otherOptionType] = [] }
          this.selectOption(option.id, optionType)
        } 
      }
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
      this.$validator.validate(this.validationId, this.chosenOptions)
    },
  }
}
</script>

<style scoped>

  ul {
    list-style: none;
    height: 12.5rem;
    padding: 0;
    margin: 0;
    overflow: scroll;
    overflow-x: hidden;
    border-radius: 2px;
  }

  div.b-shuttle-available {
    flex: 1;
    margin-right: 1rem;
  }

  div.b-shuttle-chosen {
    flex: 1;
    margin-left: 1rem;
  }

  div.b-shuttle-buttons {
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 3.25rem;
    height: 10rem;
  }

  button {
    display: flex;
    padding: .25rem .25rem;
    margin: .3rem 0 .3rem 0;
    background: none;
    border-radius: .25rem;
    width: 2rem;
    height: 2rem;
    justify-content: center;
    align-items: center
  }

  .shuttle {
    display: flex;
  }

  i {
    color: #00aaed;
    margin-top: -.075rem;
  }

  li.b-shuttle-options {
    padding: .4rem 0rem .4rem .75rem;
    font-size: 85.7%;
    font-weight: 200;
  }

  li.b-shuttle-options:hover {
    cursor: pointer;
  }

  li.selected {
    background-color: #00aaed;
    color: #ffffff;
  }

  .icon {
    width: 90%;
  }

  .ion-arrow-right-c {
    font-size: 1.25rem;
  }

  .ion-arrow-left-c {
    font-size: 1.25rem;
  }

</style>
