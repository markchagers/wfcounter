<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import LetterCounter from './components/LetterCounter.vue'

@Options({
    components: {
        LetterCounter,
    },
})
export default class App extends Vue {}
</script>

<template>
    <letter-counter></letter-counter>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
    background-color: rgb(180, 216, 192);
}
#app {
    margin: 0;
    padding: 0;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
