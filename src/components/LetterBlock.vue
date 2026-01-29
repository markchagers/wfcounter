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
                ? 'count error'
                : 'count hide'
        } else {
            return remain > 1
                ? 'count'
                : 'count hide'
        }
    }
</script>

<template>
    <div class="block-counter__blokje" :class="blockClass()">
        <span class="letter">{{ letter.id }}</span>
        <span class="punten">{{ letter.score }}</span>
        <span :class="countClass()">{{
            remaining() > 1 ? remaining() : ''
            }}</span>
    </div>
</template>

<style lang="css">
    .block-counter__blokje {
        flex: 0 1 auto;
        position: relative;
        width: 1.8rem;
        aspect-ratio: 1 / 1;
        background-color: antiquewhite;
        box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.5);
        border: solid 1px;
        border-color: beige #aa9226 #aa9226 beige;
        border-radius: 0.2rem;

        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        @container remaining (width > 40rem) {
            border-radius: 0.3rem;
            width: 2.5rem;
        }

        &.error {
            background-color: rgb(189, 3, 105);
            color: whitesmoke;
            border-color: #ffb1d1 #410126 #410126 #ffb1d1;
        }

        & .letter {
            width: 100%;
            font-weight: 500;
            font-size: 1.25rem;
            overflow-y: hidden;

            @container remaining (width > 40rem) {
                font-size: 1.6rem;
            }
        }

        & .punten {
            position: absolute;
            top: -.1rem;
            right: 0.1rem;
            font-size: .7rem;
            font-weight: 600;

            @container remaining (width > 40rem) {
                right: 0.2rem;
                top: -.15rem;
                font-size: .9rem;
            }
        }

        & .count {
            height: 1rem;
            width: 1rem;
            line-height: 1.1rem;
            background-color: #c41414;
            border-radius: 50%;
            position: absolute;
            bottom: -.4rem;
            left: -.5rem;
            text-align: center;
            font-size: .7rem;
            font-weight: 700;
            color: #fafdd8;
            box-shadow: 1px 2px 4px #00000099;

            @container remaining (width > 40rem) {
                height: 1.35rem;
                width: 1.35rem;
                font-size: .9rem;
                line-height: 1.4rem;
                bottom: -.4rem;
                left: -.5rem;
            }

            &.error {
                color: #fffebf;
                background-color: #215bf8;
            }

            &.hide {
                display: none;
            }
        }
    }
</style>