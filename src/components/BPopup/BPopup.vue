<template>
  <div v-if="visible" v-click-outside="close" class="b-popup">
    <div class="b-wrapper" :style="[size, offset]">
      <div :class="{ 'b-content': true }">
        <span>{{message}}</span>
      </div>
      <div v-if="confirm" class="b-footer">
        <button @click="cancelClickHandler">Cancel</button>
        <button @click="confirmClickHandler">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
import clickOutside from '../../directives/click-outside'

export default {
  name: 'b-popup',
  props: {
    //Required props
    /**
    * The written message in the popup
    */
    message: {
      type: String,
      required: true
    },
    /**
    * When true the popup will be visible, not visible otherwise
    */
    visible: {
      type: Boolean,
      required: true
    },
    //Optional props
    /**
    * Add buttons to popup for confirmation purposes
    */
    confirm: Boolean,
    /**
    * X axis offset of popup in pixels
    */
    offsetX: {
      type: [String, Number],
      default: 0
    },
    /**
    * Y axis offset of popup in pixels
    */
    offsetY: {
      type: [String, Number],
      default: 0
    },
    /**
    * Height of popup in pixels
    */
    height: {
      type: [String, Number],
      default: 100
    },
    /**
    * Width of popup in pixels
    */
    width: {
      type: [String, Number],
      default: 150
    }
  },
  data () {
    return {
      size: {
        width: this.width,
        height: this.height
      },
      offset: {
        left: this.offsetX,
        top: this.offsetY
      }
    }
  },
  methods: {
    cancelClickHandler () {
      /**
      * Event fires when cancel is clicked on confirmation
      *
      * @event cancel
      */
      this.$emit('cancel')
      this.$nextTick(function () {
        this.close()
      })
    },
    close () {
      /**
      * Event fires when the popup finishes its dialog and recommends being closed
      *
      * @event close
      */
      this.$emit('close')
    },
    confirmClickHandler () {
      /**
      * Event fires when confirm is clicked on confirmation
      *
      * @event confirm
      */
      this.$emit('confirm')
      this.$nextTick(function () {
        this.close()
      })
    }
  },
  directives: clickOutside
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/colors"

  .b-content
    padding .857rem

  .b-footer
    display flex
    justify-content center
    > button
      background-color transparent
      border none
      padding-top 0
    > button:focus
      color $cerulean
      outline none
    > button:hover
      color $cerulean
    > button:active
      border-style none

  .b-popup
    position relative
    z-index 50

  .b-wrapper
    background-color $white
    box-shadow 0 1px 2px 0
    cursor default
    display flex
    flex-direction column
    justify-content space-evenly
    position absolute

  div
    color $text
</style>
