<template>
  <div>
    <div>
      <h4>{{ selectLabel }} <span v-if=isRequired aria-label='Required'>*</span></h4>
    </div>
    <div 
      :aria-expanded="opened"
      :aria-owns="id"
      role="combobox"
      tabindex="0"
    >
      <ul
        :aria-label="selectLabel"
        :class="getUlClass()"
        role="listbox"
        :id="id"
      >
        <li 
          :class="getLiClass()" 
          v-if=!selectedOption
          @click="openList"
          role="option"
          style="color: #cccccc"
          >{{ placeholder }}
          <span class="dropdownArrow"><i class="fa fa-caret-down" aria-hidden="true" style="color: #000000"></i></span>
        </li>
        <li 
          :class="getLiClass()"
          v-if=selectedOption
          @click="openList"
          role="option"
          >{{ selectedOption.text }}
          <span class="dropdownArrow"><i class="fa fa-caret-down" aria-hidden="true" style="color: #000000"></i></span>
        </li>
        <li
          :class="getLiClass()"
          v-if=opened
          v-for="option in options"
          :key="option.id"
          :value=option.id
          @click="selectOption(option)"
          role="option"
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
    preSelectedOption: {
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
    },
    selectOption (option) {
      this.selectedOption = option
      this.opened = !this.opened
    },
    getUlClass () {
      return {'ulOpened': this.opened}
    },
    getLiClass () {
      return {'liOpened': this.opened, 'options': true}
    },
  },

  data () {
    return {
      options: this.selectOptions,
      opened: false,
      selectedOption: this.preSelectedOption
    }
  },
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

  .ulOpened {
    border-style: solid;
    border-radius: .25rem;
    border-width: thin;
    box-shadow:  .125rem .25rem .3rem #cccccc;
  }

  .liOpened {
    border-radius: 0;
    border-style: none none solid none;
    border-width: thin;
    border-color: #f2f2f2;
  }

  .liOpened:hover:not(:first-child) {
    font-weight: 600;
    background-color: #f2f2f2;
  }

  .liOpened:last-child {
    border-style: none;
  }

  .dropdownArrow {
    float: right;
  }

</style>
