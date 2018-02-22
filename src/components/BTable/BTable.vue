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
        <div class="results">
          <p>Results per page: </p>
        </div>
        <div class="results">
          <select 
            @change="updateRows($event.target.value)"
          >
            <option
              v-for="option in options"
              :value="option"
              :selected="option === currentRowsPerPage"
            >
              {{ option }}
            </option>
          </select>
        </div>
        <p class="results">
          {{ results }}
        </p>
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
          :disabled="((currentPage + 1) * currentRowsPerPage) >= totalResults"
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
      type: Number
    },
    totalResults: {
      type: Number,
      required: true
    },
    rowDisplayOptions: {
      type: Array,
    }
  },
  data () {
    return {
      rows: this.buildRows(this.tableData, this.headers),
      unsorted: require('../../../static/unSortedArrows.svg'),
      currentPage: this.pageNumber ? this.pageNumber : 0,
      options: this.rowDisplayOptions ? this.rowDisplayOptions : [10, 20, 50],
      currentRowsPerPage: this.rowsPerPage ? this.rowsPerPage : 10
    }
  },
  computed: {
    results: function () {
      const start = (this.currentPage * this.currentRowsPerPage) + 1
      let end = (start + parseInt(this.currentRowsPerPage)) - 1
      end = end > this.totalResults ? this.totalResults : end
      return `${start}-${end} of ${this.totalResults}`
    },
    displayOptions: function () {
      return [10, 20, 50]
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
    },
    updateRows: function(rowSize) {
      this.$emit("rowsUpdate", rowSize)
      this.currentRowsPerPage = parseInt(rowSize)
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

  .pagination-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: .5rem;
    height: 2.5rem
  }

  .pagination-button {
    padding: 0 .5rem;
  }

  .results {
    display: inline;
    padding-right: 3rem;
  }

  select {
    border:none;
    background-color:transparent;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml;utf8,<svg fill='#6b686b' height='18' viewBox='0 0 18 18' width='18' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: .6rem;
    background-position-y: -5px;
    width: 2rem;
  }

</style>
