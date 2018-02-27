<template>
  <div class="b-table" :id="id">
    <table class="b-table-el">
      <tr class="b-table-row">
        <th 
          v-for="(header, index) in headers"
          :key="`header-${id}-${index}`"
          class="b-table-header"
        >
          <button
          :disabled="!header.sort"
          aria-describedby="headerDescription"
          @click="onColumnHeaderClick(header.key)"
          type="button"
          class="header-button"
          >
            {{ header.name }}<img 
              v-if="header.name && header.sort && !sorted[header.key]" 
              :src="unsorted" 
              aria-label="unsorted, click to sort"
              class="icon" 
              id="headerDescription" />
            <i 
              v-else-if="sorted[header.key] === 'desc'" 
              class='arrow ion-android-arrow-dropdown' 
              aria-label="sorted descending, click to sort"
              id="headerDescription" />
            <i 
              v-else-if="sorted[header.key] === 'asc'" 
              aria-label="sorted ascending, click to sort"
              class='arrow ion-android-arrow-dropup' 
              id="headerDescription" />
          </button>
        </th>
        <th 
          class="b-table-header"
          v-if="deleteAction"
        >
        </th>
      </tr>
      <tr
        v-for="(row, index) in rows"
        :key="`row-${id}-${index}`"
        class="b-table-row"
      >
        <td
          v-for="(cell, index) in row.data"
          :key="`cell-${id}-${index}`"
          class="b-table-cell"
          v-html='cell'
        />
        </td>
        <td
          v-if="deleteAction"
          class='b-table-cell'
        >
          <span class="ion-ios-trash" style="color: #4d90fe; font-size: 18px"></span>
          <a
            @click.prevent="popupVisible[row.id] = true"
            href="" 
            class='link-group'
            > Delete</a>
          <div>
            <b-popup
              :visible="popupVisible[row.id]"
              message="Are you sure you want to Delete this row?"
              confirm
              @close="popupVisible[row.id] = false"
              @confirm="onDeleteClick(row.id)"
            />
          </div>
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
            @change="onRowAmountChange($event.target.value)"
            aria-label="rows per page"
            id='rowAmount'
          >
            <option
              v-for="(option, index) in options"
              :key="`option-${id}-${index}`"
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
          @click="onPaginateClick(currentPage-1)"
          :disabled="currentPage <= 0"
          aria-label='page back'
          id="paginate-back"
          type="button" 
          class="pagination-button"
        >
          <i class='pagination-icon ion-arrow-left-c' aria-hidden='true'></i>
        </button>
        <button
          @click="onPaginateClick(currentPage+1)"
          :disabled="((currentPage + 1) * currentRowsPerPage) >= totalResults"
          aria-label='page forward'
          id="paginate-forward"
          type="button"
          class="pagination-button"
        >
          <i class='pagination-icon ion-arrow-right-c' aria-hidden='true'></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import BPopup from '../BPopup'

export default {


  name: 'b-table',
  props: {
    /**
    * <pre style="font-family: monospace;">
    * Array of links to be rendered
    * Each link is an object containing:
    * |-------------|-----------|------------|----------------------------------------------------------|
    * |  Prop name  |   Type    |  Default   |                      Description                         |
    * |-------------|-----------|------------|----------------------------------------------------------|
    * |  name       |  string   |  required  |  This is what will be displayed as the column header.    |
    * |  key        |  string   |  required  |  This is the matching key for that column to access      |
    * |             |           |            |  the corresponding data in the rows.                     |
    * |  sort       |  boolean  |  optional  |  Enables sorting on that column.                         |
    * |  render     |  function |  optional  |  Holds the rendering function name if applicable.        |
    * |-------------|-----------|------------|----------------------------------------------------------|
    * </pre>
    */
    headers: {
      type: Array,
      required: true
    },
    /**
    * The table data that will be displayed, and array of strings and/or objects.
    */
    tableData: {
      type: Array,
      required: true
    },
    /**
    * Preload a page if provided.  Defualts to zero if not provided.
    */
    pageNumber: {
      type: Number,
      required: false
    },
    /**
    * The number of rows to be displayed in the table per page. Defualts to 10 if not provided.
    */
    rowsPerPage: {
      type: Number
    },
    /**
    * The total number of rows for the table.
    */
    totalResults: {
      type: Number,
      required: true
    },
    /**
    * The different row sizes available to the user, will default to [10, 20, 50] if not provided.
    */
    rowDisplayOptions: {
      type: Array,
    },
    /**
    * Toggles the delete action on/off
    */
    deleteAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rows: this.buildRows(this.tableData, this.headers),
      unsorted: require('../../../static/unSortedArrows.svg'),
      currentPage: this.pageNumber ? this.pageNumber : 0,
      options: this.rowDisplayOptions ? this.rowDisplayOptions : [10, 20, 50],
      currentRowsPerPage: this.rowsPerPage ? this.rowsPerPage : 10,
      sorted: {},
      popupVisible: this.buildPopupData(this.tableData),
      id: null
    }
  },
  mounted() {
    this.id = this._uid
  },
  computed: {
    /**
    * @returns{String}
    * This builds the string used in the table to show meta information on the table rows.
    */
    results: function () {
      const start = (this.currentPage * this.currentRowsPerPage) + 1
      let end = (start + parseInt(this.currentRowsPerPage)) - 1
      end = end > this.totalResults ? this.totalResults : end
      return `${start}-${end} of ${this.totalResults}`
    }
  },
  methods: {
    /**
    * @param {Array<Object|String>} rowData
    * @param {Array<String>} headers
    * @returns {Array<String>}
    * This maps the rowData with the applicable headers to form the rows.
    * If the render key is present, a supplied render funtion will be called
    * to populate that cell instead of a string.
    */
    buildRows: function(rowData, headers) {
      let rows = []
      rowData.forEach( function(data) {
        let row = {}
        let rowData =[]
        headers.forEach( function(header) {
          if (header.render) {
            rowData.push(header.render(data[header.key]))
          } else {
            rowData.push(data[header.key])
          }
        })
        row['id'] = data.id
        row['data'] = rowData
        rows.push(row)
      })
      return rows
    },
    /**
    * @param {Array<Object|String>} rowData
    * @returns {Object}
    * This creates an object to hold the state of popup confirmations by row.
    */
    buildPopupData: function(rowData) {
      let popUpData = {}
      rowData.forEach( function(data) {
        popUpData[data.id] = false
      })
      return popUpData
    },
    /**
    * @param {String} sortBy
    * @description Populates an object to track sort state and emits
    * that object to the 'sort' event.  ex: { name: "desc", age: "asc" }
    * @event sortBy
    * @type Object
    */
    onColumnHeaderClick: function(sortBy) {
      if (sortBy in this.sorted) {
        this.sorted[sortBy] === 'desc' ? this.sorted[sortBy] = 'asc' : delete this.sorted[sortBy]
      } else {
        this.sorted[sortBy] = 'desc'
      }
      this.$emit("sort", this.sorted)
      this.$forceUpdate()
    },
    /**
    * @param {String} page
    * @description Updates the current row the table is on, and emits
    * an object holding the new page and the rowzsize.  ex: { page: 5, rowSize: 20 }
    * @event paginate
    * @type Object
    */
    onPaginateClick: function(page) {
      this.$emit("paginate", {"page": parseInt(page), "rowsize": parseInt(this.currentRowsPerPage)})
      this.currentPage = page
    },
    /**
    * @param {String} rowSize
    * @description Updates the current rowSize and emits a string
    * to the 'rowsUpdate' event.
    * @event rowsUpdate
    * @type Integer
    */
    onRowAmountChange: function(rowSize) {
      this.$emit("rowsUpdate", rowSize)
      this.currentRowsPerPage = parseInt(rowSize)
    },
    /**
    * @param {String} row id
    * @description emits a delete event with the row id
    * to the parent component
    * @event delete
    * @type Integer
    */
    onDeleteClick: function(rowId) {
      this.$emit("delete", rowId)
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
    border: none;
    -moz-outline-style: none
  }

  button:active {
    -moz-outline-style: none;
    border-style: none;
    border: none;
  }

  button.header-button:disabled {
    color: #000000;
    opacity: 100;
    cursor: default;
  }

  button.header-button {
    position: relative;
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

  .arrow {
    position: absolute;
    margin-left: .75rem;
    bottom: .75rem;
    font-size: 20px;
    color: #737373;
  }

  .link-group {
    margin-right: .75rem;
  }

</style>
