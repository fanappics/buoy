<template>
  <div class='shuttle'>

  	<div class='available'>
  		<ul>
  			<li
  				v-if="placeholder && availableOptions.length === 0 && chosenOptions.length === 0"
  				class='placeholder'
  			>
  			{{ placeholder }}
  			</li>
  			<li
  				v-for="option in availableOptions"
  				:key="'available-option' + option.id"
  				:id="'available-option' + option.id"
  				class='options'
  				role='option'
  				tabindex='-1'
  			>
  			{{ option.displayText }}
  			</li>
  		</ul>
  	</div>

  	<div class='buttons'>
	  	<button type='button'>All <i class='fa fa-arrow-right' aria-hidden='true'></i></button>
	  	<button type='button'><i class='fa fa-arrow-right' aria-hidden='true'></i></button>
	  	<button type='button'><i class='fa fa-arrow-left' aria-hidden='true'></i></button>
	  	<button type='button'>All <i class='fa fa-arrow-left' aria-hidden='true'></i></button>
  	</div>

  	<div class='chosen'>
  		<ul>
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
  	availableOptions: {
  		type: Array,
  		default: []
  	},
  		/**
  		* The chosen options for the shuttle.
  		*/
  	chosenOptions: {
  		type: Array,
  		default: []
  	},
  		/**
  		* Placeholder to display if shuttle is dependent on other component.
  		*/
  	placeholder: {
  		type: String,
  		required: false
  	}
  },
  computed: {
  },
  data () {
    return {}
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

</style>
