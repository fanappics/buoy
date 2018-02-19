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
    <tr
      v-for="row in rows"
      class="b-table-row"
    >
      <td
        v-for="cell in row"
        class="b-table-cell"
      >
        {{ cell }}
      </td>
    </tr>
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
      rows: this.buildRows(this.tableData, this.headers)
    }
  },
  methods: {
    buildRows: function(rowData, headers) {
      let rows = []
      rowData.forEach( function(data) {
        let row = []
        headers.forEach( function(header) {
          row.push(data[header.key])
        })
        rows.push(row)
      })
      return rows
    }
  }

}
</script>

<style scoped>

  .b-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .b-table-row {
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
