<template>
  <div>
    <div>
      <label>{{ selectLabel }} <span v-if=isRequired aria-label='Required'>*</span></label>
    </div>
    <div 
      :aria-expanded="opened"
      :aria-owns="id"
      :aria-label="selectLabel"
      role="combobox"
      tabindex="0"
      v-model="selectLabel"
      :id="'dropdown' + id"
      @keyup.32="openList"
    >
      <ul
        :class="ulClass"
        role="listbox"
        :id="id"
      >
        <li 
          :class="dropdownClass" 
          @click="openList"
          role="option"
          >{{ selectedOption ? selectedOption.text : placeholder }}
          <span class="dropdown-arrow"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
        </li>
        <li
          v-if=opened
          v-for="option in options"
          :class="liClass"
          :key="'selectOption' + option.id"
          :id="'option' + option.id"
          :value=option.id
          @click="selectOption(option)"
          role="option"
          :ref="'option' + option.id"
          @keyup="keyPressHandler"
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
    openList () {
      this.opened = !this.opened
      if (this.opened) {
        this.$nextTick( function () {
          this.setFocus()
        })
      } else {
        document.querySelector(`#dropdown${this.id}`).focus()
      }
    },
    selectOption (option) {
      this.selectedOption = option
      this.opened = !this.opened
      console.log(this.selectLabel)
      document.querySelector(`#dropdown${this.id}`).focus()
    },
    setFocus () {
      if (this.selectedOption) {
        const line = document.querySelector(`#${this.id} #option${this.selectedOption.id}`)
        line.focus()
      } else {
        const line = document.querySelector(`#${this.id} #option${this.options[0].id}`)
        line.focus()  
      }
    },
    keyPressHandler () {
      const target = event.target;
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
    liClass: function () {
      return {
        'li-opened': this.opened,
        'options': true,
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

  .li-opened:hover:not(:first-child) {
    font-weight: 600;
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
