<template>
  <div class="b-table-container">
    <table>
      <tr>
        <th 
          v-for="header in headers"
        >
          {{ header.name }}
        </th>
      </tr>
      <tr
        v-for="row in rows"
      >
        <td
          v-for="cell in row"
        >
          {{ cell }}
        </td>
      </tr>
    </table>
    
  </div>
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

</style>
