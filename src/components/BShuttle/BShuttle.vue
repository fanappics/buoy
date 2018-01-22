<template>
  <div class='shuttle'>

  	<div class='available'>
  		<ul>
  			<li
  				v-if="placeholder && options.length === 0"
  				class='placeholder'
  			>
  			{{ placeholder }}
  			</li>
  			<li
  				v-for="option in availableOptions"
  				:key="'available-option' + option.id"
  				:id="'available-option' + option.id"
  				:class="optionsClass(option, 'available')"
  				@click="onOptionClick(option, 'available', 'chosen')"
  				role='option'
  				tabindex='-1'
  			>
  			{{ option.displayText }}
  			</li>
  		</ul>
  	</div>

  	<div class='buttons'>
	  	<button 
	  		@click="onMoveAllOptions('chosen')"
	  		type='button'
	  		>
	  		All <i class='fa fa-arrow-right' aria-hidden='true'></i>
	  	</button>
	  	<button 
	  		@click="onMoveSelectedClick(selectedOptions, 'available')"
	  		type='button'
	  		>
	  		<i class='fa fa-arrow-right' aria-hidden='true'></i>
	  	</button>
	  	<button
	  		@click="onMoveSelectedClick(selectedOptions, 'chosen')"
	  		type='button'>
	  		<i class='fa fa-arrow-left' aria-hidden='true'></i>
	  	</button>
	  	<button 
	  		@click="onMoveAllOptions('available')"
	  		type='button'
	  		>
	  		All <i class='fa fa-arrow-left' aria-hidden='true'></i>
	  	</button>
  	</div>

  	<div class='chosen'>
  		<ul>
	  		<li
  				v-for="option in chosenOptions"
  				:key="'chosen-option' + option.id"
  				:id="'chosen-option' + option.id"
  				:class="optionsClass(option, 'chosen')"
  				@click="onOptionClick(option, 'chosen', 'available')"
  				role='option'
  				tabindex='-1'
  			>
  				{{ option.displayText }}
  			</li>
  		</ul>
  	</div>

  </div>
  
</template>

<script>
export default {
  name: 'b-shuttle',
  props: {
  		/**
  		* The available options for the shuttle.
  		*/
  	options: {
  		type: Array,
  		required: false
  	},
  		/**
  		* Placeholder to display if shuttle is dependent on other component.
  		*/
  	placeholder: {
  		type: String,
  		required: false
  	},
    /**
    * The id of the selected option.
    */
    value: {
      type: Array,
      required: false,
      default: function () { return [] }
    }
  },

  data () {
    return {
    	availableOptions: this.options ? this.setAvailableOptions(this.options, this.value) : new Array,
    	selectedOptions: {'available': new Array, 'chosen': new Array},
    	chosenOptions: this.value ? this.value : new Array
    }
  },

  computed: {
  },

  methods: {
  	setAvailableOptions: function (options, selected) {
  		const availableOptions = new Array
  		options.forEach(function (option) {
  			if (selected === null) {
  				availableOptions.push(option)
  			} else if (selected.indexOf(option.id) === -1) {
  				availableOptions.push(option)
  			}
  		})
      return availableOptions
    },
  	optionsClass: function (option, optionType) {
      return {
        'options': true,
        'selected': this.selectedOptions[optionType].indexOf(option.id) > -1
      }
    },
  	onOptionClick (option, optionType, otherOptionType) {
  		const index = this.selectedOptions[optionType].indexOf(option.id)
  		if (this.selectedOptions[otherOptionType].length > 0) { this.selectedOptions[otherOptionType] = new Array }
  		this.selectOption(index, option, optionType)
  	},
  	onMoveSelectedClick (options, type) {
  		const loopOptions = (type === 'available') ? this.availableOptions : this.chosenOptions
  		const availableOptions = new Array
  		const chosenOptions = new Array
  		loopOptions.forEach((option) => {
  			const index = this.selectedOptions[type].indexOf(option.id)
  			if (index > -1) {
  				(type === 'available') ? chosenOptions.push(option) : availableOptions.push(option)
  			} else {
  				(type === 'available') ? availableOptions.push(option) : chosenOptions.push(option)
  			}
  		})
  		if (type === 'available') {
  			this.availableOptions = availableOptions
  			this.chosenOptions.push.apply(this.chosenOptions, chosenOptions)
  		} else {
  			this.availableOptions.push.apply(this.availableOptions, availableOptions)
  			this.chosenOptions = chosenOptions
  		}
  		this.selectedOptions = {'available': new Array, 'chosen': new Array}
  	},
  	onMoveAllOptions (type) {
  		if (type === 'chosen') {
  			this.chosenOptions = this.options
  			this.availableOptions = new Array
  		} else if (type === 'available') {
  			this.chosenOptions = new Array
  			this.availableOptions = this.options
  		}
  		this.selectedOptions = {'available': new Array, 'chosen': new Array}

  	},
  	selectOption (index, option, optionType) {
  		if (index > -1) {
  			this.selectedOptions[optionType].splice(index, 1)
  		} else {
  			this.selectedOptions[optionType].push(option.id)
  		}
  	}
  }
}
</script>

<style scoped>

	ul {
		list-style: none;
		border-style: solid;
		border-width: thin;
		border-color: #dededf;
		height: 10rem;
		padding: 0;
		margin: 0;
	}

	div.available {
		width: 40%;
		margin-right: 1rem;
	}

	div.chosen {
		width: 40%;
		margin-left: 1rem;
	}

	div.buttons {
		margin-top: 1.2rem
	}

	button {
		display: block;
		border-color: #dededf;
		padding: .25rem .50rem .25rem .50rem;
		margin: .3rem 0 .3rem 0;
		background: none;
		border-radius: .25rem;
		width: 3rem;
	}

	button:hover {
		cursor: pointer;
	}

	.shuttle {
		display: flex;
	}

	i {
		color: #00aaed;
	}

	li.placeholder {
		color: #dededf;
	}

	li.options:hover {
		cursor: pointer;
	}

	li.selected {
		background-color: #00aaed;
		color: #ffffff;
	}

</style>
