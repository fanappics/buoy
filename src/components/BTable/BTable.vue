<template>
  <table class="b-table">
    <tr class="b-table-row">
      <th 
        v-for="header in headers"
        class="b-table-header"
      >
        <button
        type="button"
        >
        {{ header.name }}<img v-if="header.name" class="icon" :src="unsorted" />
      </button>
      </th>
    </tr>
    <tr
      v-for="row in rows"
      class="b-table-row"
    >
      <td
        v-for="cell in row"
        class="b-table-cell"
        v-html='cell'
      />
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
      rows: this.buildRows(this.tableData, this.headers),
      unsorted: require('../../../static/unSortedArrows.svg')
    }
  },
  methods: {
    buildRows: function(rowData, headers) {
      let rows = []
      rowData.forEach( function(data) {
        let row = []
        headers.forEach( function(header) {
          if (header.render) {
            row.push(header.render(data[header.key]))
          } else {
            row.push(data[header.key])
          }
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

  td {
    padding-left: .825rem
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

  button {
    border: none;
    font-weight: 600;
  }

  img.icon {
    position: absolute;
    margin-left: .725rem;
  }

</style>
