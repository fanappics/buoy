<template>
  <nav>
      <ul role="menu" aria-label="Page Navigation">
        <li v-for="(link, index) in links" role ="menuitem" :key="index">
          <a
            :href="`#${link.href}`"
            :aria-label="`${link.label} ${link.completed ? 'Completed' : 'Uncompleted'}`"
            @click.prevent.stop="jumpTo(link)"
            @keyup.enter="jumpTo(link)"
            @keyup.space="jumpTo(link)"
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
    }
  },
  data () {
    return {
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
  a {
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

  li {
    background-color: #F5F6F8;
  }

  nav {
    margin-right: 3rem;
  }

  ul {
    list-style: none;
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
</style>
