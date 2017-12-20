<template>
    <option>
        {{ option.text }}
    </option>
</template>

<script>
export default {
    name: "b-select-option",
    props: {
        option: {
          type: Object,
          required: true
        }
    }
}
</script>

<style scoped>
</style>
