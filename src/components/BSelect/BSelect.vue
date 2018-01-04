<template>
  <div>
    <div>
      <h3>{{selectLabel}}<span v-if=isRequired>*</span></h3>
    </div>
    <div>
      <ul
        v-bind:aria-label="selectLabel"
        v-bind:class="getUlClass()"
      >
        <li class="options" 
          style="color: #cccccc"
          v-if=!selectedOption
          v-on:click="openList"
          >Choose Option
          <span class="dropdownArrow"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
        </li>
        <li class="options"
          v-if=selectedOption
          v-on:click="openList"
          >{{ selectedOption.text }}
          <span class="dropdownArrow"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
        </li>
        <li
          class="options"
          v-if=opened
          v-for="option in options"
          v-bind:key="option.id"
          v-bind:option="option"
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
    selectedOption: {
      type: Object,
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
      return {'opened': this.opened}
    }
  },

  data () {
    return {
      options: this.selectOptions,
      opened: false
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

  .opened {
    border-style: solid;
    border-radius: .25em;
    border-width: thin;
    border-color: #3399ff;
    box-shadow:  .125em .25em .3em #cccccc;
  }

  .dropdownArrow {
    float: right;
  }

</style>
