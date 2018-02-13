<template>
  <nav :id="id">
      <ul role="menu" aria-label="Page Navigation">
        <li v-for="(link, index) in links" role ="menuitem" :key="index" :class="{ 'inline': !column }">
          <a
            :href="`#${link.href}`"
            :aria-label="`${link.label} ${link.completed ? 'Completed' : 'Uncompleted'}`"
            :class="{ 'inline': !column }"
            @click.prevent.stop="jumpTo(link)"
            @keyup.enter.prevent="jumpTo(link)"
            @keydown.enter.prevent
            @keyup.up="upHandler($event)"
            @keydown.up.prevent
            @keyup.left="upHandler($event)"
            @keydown.left.prevent
            @keyup.right="downHandler($event)"
            @keydown.right.prevent
            @keyup.down="downHandler($event)"
            @keydown.down.prevent
          >
            <i v-if="link.completed" class="icon-complete ion-ios-checkmark" aria-hidden="true" />
            <i v-else class="icon-incomplete ion-record" aria-hidden="true" />
            {{ link.label }}
          </a>
        </li>
      </ul>
    </nav>
</template>

<script>
import events from '../../event-bus'

export default {
  name: 'b-page-nav',
  props: {
    //Required props
    /** 
    * <pre style="font-family: monospace;">
    * Array of links to be rendered
    * Each link is an object containing:
    * |-------------|-----------|------------|----------------------------------------------------------|
    * |  Prop name  |   Type    |  Default   |                      Description                         |
    * |-------------|-----------|------------|----------------------------------------------------------|
    * |  label      |  string   |  required  |  Display string of the link                              |
    * |  href       |  string   |  required  |  Id of the element to navigate to                        |
    * |  completed  |  boolean  |  optional  |  Specifies related section as ready for form submission  |
    * |  event      |  string   |  optional  |  Name of an event to emit on the event-bus on click      |
    * |-------------|-----------|------------|----------------------------------------------------------|
    * </pre>
    */
    links: {
      type: Array,
      required: true,
      validator (value) {
        for (let link of value) {
          if (!link.label || !link.href)
            throw new TypeError('Each link must have a label and href defined')
        }
        return true
      }
    },
    //Optional props
    /** 
    * Layout links in a column
    */
    column: Boolean,
    /** 
    * Override id on nav element
    */
    id: {
      type: String,
      default () {
        return `page-nav-${this._uid}`
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    /**
    * @param {Object} link
    * Scrolls to and focuses the element pertaining to link.href
    * Also emits link.event if specified
    */
    jumpTo (link) {
      if (link.event) {
        events.$emit(link.event)
      }
      this.$nextTick(function () {
        const element = document.getElementById(link.href)
        if (element) {
          element.scrollIntoView()
          element.focus()
        }
      })
    },
    /**
     * Handles up and left arrow keyup events
     */
    upHandler (event) {
      const target = event.target.parentElement
      if(target.previousSibling)
        target.previousSibling.firstElementChild.focus()
    },
    /**
     * Handles right and down arrow keyup events
     */
    downHandler (event) {
      const target = event.target.parentElement
      if(target.nextSibling)
        target.nextSibling.firstElementChild.focus()
    }
  }
}
</script>

<style scoped>
  a {
    background-color: #F5F6F8;
    color: #333333;
    display: block;
    padding: .5rem .5rem .5rem 1rem;
    text-decoration: none;
  }

  a:focus, a:hover {
    color: #FFFFFF;
    background-color: #00AAED;
  }

  a:focus i, a:hover i {
    color: #FFFFFF;
  }

  hr {
    background-color: #DEDEDE;
    border: none;
    height: 10px;
    margin: 0;
    width: 1px;
  }

  i {
    font-size: 1rem;
    padding-right: .5rem;
  }

  ul {
    list-style: none;
    display: inline;
    margin: 0;
    padding: 0;
  }

  .flex {
    display: flex;
  }

  .icon-complete {
    color: #00AAED;
  }

  .icon-incomplete {
    color: #FFFFFF;
  }

  .inline {
    display: inline;
  }
</style>
