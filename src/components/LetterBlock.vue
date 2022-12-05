<script setup lang="ts">

    interface ILetter {
        id: string
        aantal: number
        score: number
        used: number
    }

    const props = defineProps<{
        letter: ILetter
    }>()

    const remaining = (): number => Math.abs(props.letter.aantal - props.letter.used)

    const blockClass = (): string => props.letter.aantal < props.letter.used
        ? 'block-counter__blokje error'
        : 'block-counter__blokje'

    const countClass = (): string => {
        const remain = props.letter.aantal - props.letter.used
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
