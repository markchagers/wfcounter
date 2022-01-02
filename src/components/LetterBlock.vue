<script lang="ts">
import { PropType } from 'vue'
import { Options, Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { ILetter } from '../typings/i-letter'

@Options({
    name: 'LetterBlock',
})
export default class LetterBlock extends Vue {
    @Prop({
        type: Object as PropType<ILetter>,
        required: true,
        default: () => ({
            id: '.',
            name: 'blanco',
            aantal: 2,
            score: 0,
            used: 0,
        }),
        validator: (letter: ILetter) => !!letter.id,
    })
    letter!: ILetter

    remaining(): number {
        return Math.abs(this.letter.aantal - this.letter.used)
    }

    blockClass(): string {
        return this.letter.aantal < this.letter.used
            ? 'block-counter__blokje error'
            : 'block-counter__blokje'
    }

    countClass(): string {
        const remain = this.letter.aantal - this.letter.used
        if (remain < 0) {
            return remain < -1
                ? 'block-counter__count error'
                : 'block-counter__count--hide'
        } else {
            return remain > 1
                ? 'block-counter__count'
                : 'block-counter__count--hide'
        }
    }
}
</script>

<template>
    <div :class="blockClass()" @click="$emit('addLetter', letter.id)">
        <span class="block-counter__letter">{{ letter.id }}</span>
        <span class="block-counter__punten">{{ letter.score }}</span>
        <span :class="countClass()">{{
            remaining() > 1 ? remaining() : ''
        }}</span>
    </div>
</template>
