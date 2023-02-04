<script setup lang="ts">
    import LetterBlock from './LetterBlock.vue'
    import LetterInput from './LetterInput.vue'
    import TiledBoard from './TiledBoard.vue'
    import { useLetterStore } from '../stores/letters'
    import { onMounted } from 'vue';

    let opponent: string = ''
    const store = useLetterStore()
    
    onMounted(() => {
        store.init()
        opponent = ''
    })
</script>

<template>
    <div class="block-counter">
        <h5 class="block-counter__header">
            Je tegenspeler:
            <input v-model="opponent" class="block-counter__narrow" />
        </h5>
        <div>Hier zie je de letters die nog over zijn (aantal linksonder):</div>
        <div class="block-counter__letters">
            <LetterBlock
                v-for="letter in store.remainingLetters"
                :key="letter.id"
                :letter="letter"
            ></LetterBlock>
        </div>
        <TiledBoard></TiledBoard>
        <LetterInput></LetterInput>
    </div>
</template>

<style lang="scss">
.block-counter {
    margin: 0;
    padding: 0;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
    row-gap: 10px;

    &__header {
        margin-bottom: 6px;
    }
    &__letters {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        gap: 10px;
        margin: 0 6% 16px 6%;
        text-align: center;
    }
    &__narrow {
        width: 8em;
    }

    &__wf-input {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        width: 8rem;
        text-align: center;
        min-width: 160px;
        line-height: 1.2rem;
        font-size: 1.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5rem;
        margin: 0 auto;
        @media (min-width: 500px) {
            font-size: 2rem;
            letter-spacing: 0.7rem;
        }
    }
}
</style>
