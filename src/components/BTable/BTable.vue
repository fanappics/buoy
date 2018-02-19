<template>
  <table class="b-table">
    <tr class="b-table-row">
      <th 
        v-for="header in headers"
        class="b-table-header"
      >
        {{ header.name }}
      </th>
    </tr>
    <slot></slot>
  </table>
</template>

<script>
export default {

  name: 'b-table',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
    }
  },
}
</script>

<style scoped>

  .b-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  tr {
    height: 4.5rem;
  }
  
  tr:nth-child(even) {
    background-color: #f5f6f8;
  }

  th {
    border-bottom: solid;
    border-width: thin;
    border-color: #c4c3c4;
    text-align: left;
  }

</style>
