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
    <div class="remaining">
        <h5 class="header">
            Je tegenspeler:
            <input v-model="opponent" class="narrow" />
        </h5>
        <div>Hier zie je de letters die nog over zijn (aantal linksonder):</div>
        <div class="letters">
            <LetterBlock v-for="letter in store.remainingLetters" :key="letter.id" :letter="letter"></LetterBlock>
        </div>
        <TiledBoard></TiledBoard>
        <LetterInput></LetterInput>
    </div>
</template>

<style lang="css">
    .remaining {
        container-name: remaining;
        container-type: inline-size;

        margin: 0;
        padding: 0;
        width: 100vw;
        display: flex;
        flex-flow: column nowrap;
        align-items: stretch;
        row-gap: 10px;

        & .header {
            margin-bottom: 0;
            margin-top: .3rem;

            @container remaining (width > 40rem) {
                margin-top: 1rem;
                margin-bottom: .5rem;
            }
        }

        & .letters {
            display: flex;
            flex-flow: row wrap;
            justify-content: space-evenly;
            gap: .5rem;
            text-align: center;
            margin: 0 6% 1rem;

            @container remaining (width > 40rem) {
                gap: 1rem;
                margin: 0 15% 16px;
            }
        }

        font-size: 1rem;

        @container remaining (width > 40rem) {
            font-size: 1.5rem;
        }

        & .wf-input {
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

        .narrow {
            width: 8em;
        }
    }
</style>
