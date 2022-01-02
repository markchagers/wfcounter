<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
    name: 'LetterInput',
})
export default class LetterInput extends Vue {
    inputLetters = ''
    inputOwnLetters = ''

    letterschanged(payload: { letters: string }): boolean {
        // perform runtime validation
        return payload.letters.length > 0
    }

    emitletters(): void {
        this.$emit(
            'letterschanged',
            `${this.inputOwnLetters}${this.inputLetters}`
        )
    }
}
</script>

<template>
    <div>
        <div>type hier de letters die nu in het spel zijn (punt = blanco):</div>
        <textarea
            v-model="inputLetters"
            class="block-counter__wf-input"
            @input="emitletters()"
            rows="15"
            cols="24"
        ></textarea>
        <div>type hier de letters die je zelf hebt:</div>
        <textarea
            v-model="inputOwnLetters"
            class="block-counter__wf-input"
            @input="emitletters"
            rows="1"
            cols="10"
        ></textarea>
    </div>
</template>
