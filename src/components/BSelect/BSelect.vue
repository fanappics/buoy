<template>
    <select>
    <BSelectOption
        v-for="option in options"
        :key="option.id"
        :option="option"
    />
    </select>
</template>

<script>

import BSelectOption from './BSelectOption.vue'

const options = []

export default {
    name: 'b-select',
    components: {
        BSelectOption
    },
    data () {
        return {
            options: options
        }
    },
}
</script>

<style scoped>
</style>
