<template>
  <div class='shuttle'>

  	<div class='available'>
  		<ul>
  		</ul>
  	</div>

  	<div class='buttons'>
	  	<button type='button'></button>
	  	<button type='button'><i class='fa fa-arrow-right' aria-hidden='true'></i></button>
	  	<button type='button'><i class='fa fa-arrow-left' aria-hidden='true'></i></button>
	  	<button type='button'></button>
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
  props: [
    ''
  ],
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
		height: 5rem;
	}

	div.available {
		width: 40%;
		margin-right: 1rem;
	}

	div.chosen {
		width: 40%;
		margin-left: 1rem;
	}

	button {
		display: block;
		color: #dededf;
		padding: .25rem;
		background: none;
	}

	.shuttle {
		display: flex;
	}

	i {
		color: #00aaed;
	}

</style>
