<template>
  <div class="b-select">
    <label :id="`label-${id}`">{{ label }}<span v-if="required" class="b-required" aria-hidden="true">*</span></label>
    <button
      :class="selectClass"
      :aria-expanded="opened"
      :aria-owns="id"
      :aria-required="required"
      :aria-describedby="`error-${id}`"
      :aria-labelledby="`label-${id} select-${id}`"
      :id="`select-${id}`"
      :ref="`select-${id}`"
      :text="label"
      @keyup.space.prevent.stop="toggleList"
      @keyup.enter.prevent.stop="toggleList"
      @mousedown.prevent.stop="toggleList"
      aria-haspopup="listbox"
      type="button"
      >
      {{ selectedOption ? selectedOption.value : placeholder }}
      <span class="b-select-arrow"><i class='icon ion-arrow-down-b' aria-hidden='true'></i></span>
    </button>
    <ul
      v-show="opened"
      :class="optionsClass"
      :id="id"
      role="listbox"
    >
      <li
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
        class="b-option"
        role="option"
        tabindex="-1"
      > 
        {{ option.value }}
      </li>
    </ul>
    <span v-if="invalid" class="b-error-text" :id="`error-${id}`">{{ errors.first(validationId) }}</span>
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
    optionsClass: function () {
      return {
        'b-options-opened': this.opened // b-options-opened
      }
    },
    selectClass: function () {
      return {
        'b-select-opened': this.opened, // b-select-opened
        'b-placeholder': !this.selectedOption, // b-placeholder
        'b-error-border': this.invalid // b-error-border
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
        target.setAttribute("tabindex", "-1")
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
      this.validate()
      this.$emit("input", this.selectedOption.id)
      document.querySelector(`#select-${this.id}`).focus()
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
        this.validate()
        document.querySelector(`#select-${this.id}`).focus()
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
        target.setAttribute("tabindex", "-1")
        next.focus()
      }
    },
    /**
     * Handles validation if required.
     */
    validate () {
      if (this.required)
        this.$validator.validate(this.validationId, this.selectedOption)
    }
  }
}

</script>

<style lang="stylus" scoped>
  @import "../../styles/colors"

  .b-select
    position relative
    button
      background-color $input-background
      border 1px solid $select-border
      box-shadow inset 0 -2px 0 0 $input-shadow
      padding 0.75rem 0.9375rem
      text-align left
      width 100%
      &.b-select-opened
        border 1px solid $input-focus
        border-bottom 1px solid $select-border
        box-shadow none
      &.b-error-border
        border 1px solid $error
      &.b-error-border, &.b-error-border:focus, &.b-error-border:active
        box-shadow inset 0 -2px 0 0 $error
      &:active
        box-shadow inset 0 -2px 0 0 $select-shadow-active, inset 0 1px 5px 0 $select-shadow-active-2
      &:active, &:focus
        box-shadow inset 0 -2px 0 0 $input-focus
        border solid 1px $input-focus
        outline none
    ul
      list-style none
      margin 0
      padding 0
      position absolute
      width calc(100% - 2px)
      &.b-options-opened
        border 1px solid $input-focus
        border-bottom-width 2px
        border-top none
        z-index 10
      li.b-option
        background-color $select-option-background
        padding .5rem
        &[aria-selected]
          font-weight 600
        &:focus
          outline none
        &:focus, &:hover
          background-color $select-option-background-focus
          font-weight 600
        &:last-child
          border-style none

  .b-select-arrow
    color $select-arrow
    float right

</style>
