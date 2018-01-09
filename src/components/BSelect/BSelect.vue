<template>
  <div>
    <div>
      <label>{{ selectLabel }} <span v-if=isRequired aria-label='Required'>*</span></label>
    </div>
    <div 
      :aria-expanded="opened"
      :aria-owns="id"
      :aria-label="selectLabel"
      :aria-required="isRequired"
      role="combobox"
      tabindex="0"
      v-model="selectLabel"
      :id="'dropdown' + id"
      @keyup="keyUpHandler(selectedOption)"
    >
      <ul
        :class="ulClass"
        role="listbox"
        :id="id"
      >
        <li 
          :class="dropdownClass" 
          @click="toggleList"
          >{{ selectedOption ? selectedOption.text : placeholder }}
          <span class="dropdown-arrow"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
        </li>
        <li
          v-if=opened
          v-for="option in options"
          class="li-opened options"
          :key="'selectOption' + option.id"
          :id="'option' + option.id"
          :value=option.id
          :aria-selected="selectedOption && selectedOption.id === option.id"
          @click="selectOption(option)"
          role="option"
          :ref="'option' + option.id"
          @keyup="keyUpHandler(option)"
          tabindex='-1'
        > {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

const options = []

export default {
  name: 'b-select',
  props: {

    id: {
      type: String,
      required: true
    },
    selectOptions: {
      type: Array
    },
    isRequired: {
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
      document.querySelector(`#dropdown${this.id}`).focus()
    },

    /**
     * Handles the focus setting for accessibility purposes
     */

    setFocus () {
      if (this.selectedOption) {
        const line = document.querySelector(`#${this.id} #option${this.selectedOption.id}`)
        line.focus()
      } else {
        const line = document.querySelector(`#${this.id} #option${this.options[0].id}`)
        line.focus()  
      }
    },

    /**
     * @param {object} option
     * Handles keypresses for keyboard navigation in the component.
     * Up arrow (38), down arrow (40), space bar (32), and return (13) are supported.
     */

    keyUpHandler (option) {
      const target = event.target;
      event.stopPropagation();
      if(event.keyCode === 40) {
        event.preventDefault();
        if(target.nextElementSibling) {
          const next = target.nextElementSibling;
          next.setAttribute("tabindex", "0");
          target.setAttribute("tabindex", "-1");
          next.focus();
        }
      } else if(event.keyCode === 38) {
        event.preventDefault();
        if(target.previousElementSibling) {
          const next = target.previousElementSibling;
          const first = next.previousElementSibling;
          if (first) {
            next.setAttribute("tabindex", "0");
            target.setAttribute("tabindex", "-1");
            next.focus();
          }
        }
      } else if ( event.keyCode === 32 && !this.opened) {
        event.preventDefault();
        this.toggleList()
      } else if (event.keyCode === 32 || event.keyCode === 13) {
        if (this.opened) {
          event.preventDefault();
          this.selectOption(option)
        }
      }
    }
  },

  data () {
    return {
      options: this.selectOptions,
      opened: false,
      selectedOption: this.initialValue
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
        'unselected': !this.selectedOption
      }
    }
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

</style>
