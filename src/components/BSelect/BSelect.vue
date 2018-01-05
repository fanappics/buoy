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
    >
      <ul
        :class="ulClass"
        role="listbox"
        :id="id"
      >
        <li 
          :class="liClass" 
          @click="openList"
          role="option"
          :style="selectedOption ? {color: '#000000'} : {color: '#cccccc'}"
          >{{ selectedOption ? selectedOption.text : placeholder }}
          <span class="dropdown-arrow"><i class="fa fa-caret-down" aria-hidden="true" style="color: #000000"></i></span>
        </li>
        <li
          :class="liClass"
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
  },

  data () {
    return {
      options: this.selectOptions,
      opened: false,
      selectedOption: this.preSelectedOption
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
        'options': true
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
  }

</style>
