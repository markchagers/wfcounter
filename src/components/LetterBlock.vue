<script setup lang="ts">

    import type { ILetter } from '@/model/i-letter';

    const props = defineProps<{
        letter: ILetter
    }>()

    const remaining = (): number => Math.abs(props.letter.aantal - props.letter.used)

    const blockClass = (): string => props.letter.aantal < props.letter.used ? 'error' : ''

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
    <div class="block-counter__blokje" :class="blockClass()">
        <span class="block-counter__letter">{{ letter.id }}</span>
        <span class="block-counter__punten">{{ letter.score }}</span>
        <span :class="countClass()">{{
            remaining() > 1 ? remaining() : ''
        }}</span>
    </div>
</template>

<style lang="scss">
.block-counter {
    &__blokje {
        flex: 0 1 auto;
        position: relative;
        width: 3rem;
        aspect-ratio: 1 / 1;
        background-color: antiquewhite;
        box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.5);
        border: solid 1px;
        border-color: beige #aa9226 #aa9226 beige;
        border-radius: 0.3rem;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        @media (min-width: 500px) {
            width: 3.2rem;
        }
        &.error {
            background-color: rgb(189, 3, 105);
            color: whitesmoke;
            border-color: #ffb1d1 #410126 #410126 #ffb1d1;
        }
    }
    &__letter {
        width: 100%;
        font-weight: 500;
        font-size: 1.8rem;
        @media (min-width: 500px) {
            font-size: 2rem;
        }
    }
    &__punten {
        position: absolute;
        top: -.2rem;
        right: 0.2rem;
        font-size: 1rem;
        font-weight: 600;
    }
    &__count {
        height: 1.5rem;
        width: 1.5rem;
        line-height: 1.6rem;
        background-color: #c41414;
        border-radius: 50%;
        position: absolute;
        bottom: -.4rem;
        left: -.5rem;
        text-align: center;
        font-size: 1rem;
        font-weight: 700;
        color: #fafdd8;
        box-shadow: 1px 2px 4px #00000099;
        &.error {
            color: #fffebf;
        }
        &--hide {
            display: none;
        }
    }
}
</style>