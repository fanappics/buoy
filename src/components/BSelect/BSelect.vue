<template>
  <div>
    <div>
      <h3>{{ selectLabel }} <span v-if=isRequired>*</span></h3>
    </div>
    <div>
      <ul
        v-bind:aria-label="selectLabel"
        v-bind:class="getUlClass()"
      >
        <li 
          v-bind:class="getLiClass()" 
          style="color: #cccccc"
          v-if=!selectedOption
          v-on:click="openList"
          >{{ placeholder }}
          <span class="dropdownArrow"><i class="fa fa-caret-down" aria-hidden="true" style="color: #000000"></i></span>
        </li>
        <li 
          v-bind:class="getLiClass()"
          v-if=selectedOption
          v-on:click="openList"
          >{{ selectedOption.text }}
          <span class="dropdownArrow"><i class="fa fa-caret-down" aria-hidden="true" style="color: #000000"></i></span>
        </li>
        <li
          v-bind:class="getLiClass()"
          v-if=opened
          v-for="option in options"
          v-bind:key="option.id"
          v-bind:value=option.id
          v-on:click="selectOption(option)"
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
    padding: .5em;
    border-style: solid;
    border-radius: .25em;
    border-width: thin;
    border-color: #cccccc;
  }

  ul {
    padding: 0 1em 0 0;
    width: 100%;
    list-style: none;
  }

  .ulOpened {
    border-style: solid;
    border-radius: .25em;
    border-width: thin;
    border-color: #3399ff;
    box-shadow:  .125em .25em .3em #cccccc;
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
