<template>
  <div class="b-table">
    <table class="b-table-el">
      <tr class="b-table-row">
        <th 
          v-for="header in headers"
          class="b-table-header"
        >
          <button
          type="button"
          class="header-button"
          @click="sortColumn(header.key)"
          :disabled="!header.filter"
          >
            {{ header.name }}<img v-if="header.name && header.filter" class="icon" :src="unsorted" />
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
    <div class="pagination">
      <div class="pagination-buttons">
        <button
          type="button" 
          class="pagination-button"
          @click="paginate(currentPage-1)"
          :disabled="currentPage <= 0"
        >
          <i class='pagination-icon ion-arrow-left-c' aria-hidden='true'></i>
        </button>
        <button
          type="button"
          class="pagination-button"
          @click="paginate(currentPage+1)"
        >
          <i class='pagination-icon ion-arrow-right-c' aria-hidden='true'></i>
        </button>
      </div>
    </div>
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
    },
    pageNumber: {
      type: Number,
      required: false
    },
    rowsPerPage: {
      type: Number,
      default: 10
    },
    totalResults: {
      type: Number,
    }
  },
  data () {
    return {
      rows: this.buildRows(this.tableData, this.headers),
      unsorted: require('../../../static/unSortedArrows.svg'),
      currentPage: this.pageNumber ? this.pageNumber : 0
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
    },
    sortColumn: function(sortBy) {
      this.$emit("sort", sortBy)
    },
    paginate: function(page) {
      this.$emit("paginate", page)
      this.currentPage = page
      console.log(this.currentPage)
    }
  }

}
</script>

<style scoped>

  .b-table-el {
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

  button:focus {
    outline: 0;
    border: none;
  }

  button.header-button:disabled {
    color: #000000;
    opacity: 100;
    cursor: default;
  }

  img.icon {
    position: absolute;
    margin-left: .725rem;
  }

  .pagination {
    border-style: solid none solid none;
    border-width: thin;
    width: 100%;
    text-align: right;
    height: 2.5rem;
    border-color: #c4c3c4;
  }

  .pagination-icon {
    color: #4D90FE;
    font-size: 22px;
  }

  .pagination-buttons{
    padding-right: .5rem;
  }
  .pagination-button{
    padding: 0 .5rem;
    margin-top: .5rem
  }

</style>
