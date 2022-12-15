<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { useLetterStore } from '@/stores/letters'

    interface ILetter {
        id: string
        aantal: number
        score: number
        used: number
    }

    interface Cell {
        col: number
        row: number
        cellClass?: string
        letter?: ILetter
    }

    const emit = defineEmits<{
        (e: 'setfocus', value: { col: number; row: number }): void
        (e: 'movefocus', value: { col: number; row: number }): void
        (e: 'setletter'): void
    }>()

    const props = defineProps<{
        cell: Cell,
        focusedcell: Cell
    }>()

    watch(() => props.focusedcell, (focusedCell) => {
        if (focusedCell.col === props.cell.col && focusedCell.row === props.cell.row) {
            tilediv.value?.focus()
        }
    })
    const tilediv = ref<HTMLDivElement>()
    const letter = ref<ILetter>();

    const setFocus = () => {
        tilediv.value?.focus()
        emit('setfocus', { col: props.cell.col, row: props.cell.row })
    }

    const listen = (evt: KeyboardEvent) => {
        const store = useLetterStore()
        switch (evt.key) {
            case 'ArrowUp':
                emit('movefocus', { col: 0, row: -1 })
                break
                
            case 'ArrowDown':
                emit('movefocus', { col: 0, row: 1 })
                break
                
            case 'ArrowLeft':
                emit('movefocus', { col: -1, row: 0 })
                break
                
            case 'ArrowRight':
                emit('movefocus', { col: 1, row: 0 })
            break
                
            case 'Delete':
            case 'Backspace':
                if (letter.value) {
                    store.updateLetter({ oldletter: letter.value.id })
                    letter.value = undefined
                    emit('setletter')
                }
            break
            
            default:
                if (/^[a-z.]$/i.test(evt.key)) {
                    if (letter.value) {
                        store.updateLetter({ letter: evt.key, oldletter: letter.value.id })
                    } else {
                        store.updateLetter({ letter: evt.key })
                    }
                    const storeLetter = store.letterById(evt.key)
                    const nwLetter: ILetter = { 
                        id: evt.key,
                        aantal: storeLetter?.aantal ?? 0,
                        score: storeLetter?.score ?? 0,
                        used: storeLetter?.used ?? 0
                    }
                    letter.value = nwLetter
                    nextTick(() => emit('setletter'))
                }
            break
        }
    }
</script>

<template>
    <div class="tile" ref="tilediv" @click="setFocus" @keydown.prevent="listen($event)" tabindex="-1">
        <div v-if="!letter" :class="cell.cellClass"></div>
        <div v-else class="white">
            <span>{{ letter.id.toUpperCase() }}</span>
            <span class="score">{{ letter.score || '' }}</span>
        </div>
    </div>
</template>

<style lang="scss">
.tile {
    background: linear-gradient(#222, #282828);
    flex: 0 0 28px;
    max-height: 28px;
    color: white;
    margin: -1px;
    border: 2px solid black;
    border-radius: 4px;
    font-weight: 900;
    font-size: 12px;
    line-height: 28px;
    transition: .25s;
    position: relative;

    &:focus {
        z-index: 1;
        outline: none;
        border-color: #55abfb;
    }

    .dw {
        border-radius: 3px;
        background: linear-gradient(#ad681c, #c37828);

        &::before {
            content: 'DW';
        }
    }

    .tw {
        border-radius: 3px;
        background: linear-gradient(#6e3131, #7e3b3b);

        &::before {
            content: 'TW';
        }
    }

    .dl {
        border-radius: 3px;
        background: linear-gradient(#66905c, #6b9661);

        &::before {
            content: 'DL';
        }
    }

    .tl {
        border-radius: 3px;
        background: linear-gradient(#405690, #475d9c);

        &::before {
            content: 'TL';
        }
    }

    .cc {
        border-radius: 3px;
        background: linear-gradient(#233462, #2c3c69);
        color: #c47893;
        font-size: 1.5em;

        &::before {
            content: '❖';
        }
    }

    .white {
        height: 100%;
        line-height: 30px;
        font-size: 1.4em;
        font-weight: 600;
        border-radius: 3px;
        color: #222;
        background: linear-gradient(#fcffe6, #fefef4);

        .score {
            position: absolute;
            line-height: .7em;
            top: 2px;
            right: 1px;
            font-size: .6em;
        }
    }
}
</style>
