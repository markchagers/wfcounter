<script setup lang="ts">
    import LetterBlock from './LetterBlock.vue'
    import LetterInput from './LetterInput.vue'
    import TiledBoard from './TiledBoard.vue'
    import { useLetterStore } from '../stores/letters'

    const store = useLetterStore()
    
    let opponent: string = ''

    const updateLetters = (letters: string): void => {
        const letterArray = letters.split(/\s*/)
        const letterMap = new Map<string, number>()
        letterArray.forEach((l: string) => {
            const prop = l.toUpperCase()
            letterMap.set(prop, (letterMap.get(prop) || 0) + 1)
        })
        store.letterlist.forEach(l=> {
            const prop = l.id.toUpperCase()
            store.updateLetter({ letter: prop, used: letterMap.get(prop) || 0 })
        })
    }
</script>

<template>
    <div class="block-counter">
        <h5 class="block-counter__header">
            Je tegenspeler:
            <input v-model="opponent" class="block-counter__narrow" />
        </h5>
        <div>Hier zie je de letters die nog over zijn (aantal linksonder):</div>
        <div class="block-counter__letters">
            <letter-block
                v-for="letter in store.remainingLetters"
                :key="letter.id"
                :letter="letter"
            ></letter-block>
        </div>
        <TiledBoard></TiledBoard>
        <LetterInput @letterschanged="updateLetters($event)"></LetterInput>
    </div>
</template>

<style lang="scss">
.block-counter {
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    &__header {
        margin-bottom: 6px;
    }
    &__letters {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        gap: 10px;
        margin: 0 6%;
        text-align: center;
        margin-bottom: 16px;
        & letter-block {
            width: 100%;
            flex-grow: none;
        }
    }
    &__narrow {
        width: 6em;
        font-size: inherit;
        font-weight: inherit;
        font-family: inherit;
    }

    &__wf-input {
        font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
        line-height: 1.6rem;
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 0.3em;
        padding-left: 0.4em;
        margin: 0 auto;
        @media (min-width: 480px) {
            font-size: 1.5em;
            letter-spacing: 0.34em;
        }
    }

    &__blokje {
        flex-basis: auto;
        position: relative;
        width: 35px;
        height: 34px;
        background-color: antiquewhite;
        margin: 4px;
        box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.5);
        border: solid 1px;
        border-color: beige #aa9226 #aa9226 beige;
        border-radius: 0.2em;
        @media (min-width: 480px) {
            width: 39px;
            height: 38px;
        }
        &.error {
            background-color: rgb(189, 3, 105);
            color: whitesmoke;
            border-color: #ffb1d1 #410126 #410126 #ffb1d1;
        }
    }
    &__letter {
        width: 100%;
        font-size: 1.2em;
        text-align: center;
        font-weight: 500;
        line-height: 1.8em;
        @media (min-width: 480px) {
            font-size: 1.5em;
            line-height: 1.75em;
        }
    }
    &__punten {
        position: absolute;
        top: -1px;
        right: 0.2em;
        font-size: 0.6em;
        font-weight: 600;
        @media (min-width: 480px) {
            font-size: 0.65em;
        }
    }
    &__count {
        height: 0.9rem;
        width: 0.95rem;
        line-height: 1rem;
        background-color: #c41414;
        border: 0.1rem solid;
        border-color: #f75d5d #a80c0c #8d0303 #e94545;
        border-radius: 50%;
        position: absolute;
        bottom: -5px;
        left: -5px;
        text-align: center;
        font-size: 0.8rem;
        font-weight: 700;
        color: #fafdd8;
        box-shadow: 1px 2px 4px #00000099;
        font-size: 0.6em;
        @media (min-width: 480px) {
            font-size: 0.65em;
        }
        &.error {
            color: #fffebf;
        }
        &--hide {
            display: none;
        }
    }
}
</style>
