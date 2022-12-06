<script setup lang="ts">
import { ref, watch } from 'vue';

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
        (e: 'movefocus', value: { col: number; row: number }): void,
        (e: 'setletter', value: { letter: string, col: number; row: number }): void
    }>()

    const props = defineProps<{
        cell: Cell,
        focusedcell: Cell
    }>()

    watch(() => props.focusedcell, (focusedCell) => {
        if (focusedCell.col === props.cell.col && focusedCell.row === props.cell.row) {
            setFocus()
        }
    })
    const tilediv = ref<HTMLDivElement>()
    let letter: ILetter;
    const setFocus = () => tilediv.value?.focus()
    const listen = (evt: KeyboardEvent) => {
        switch (evt.key) {
            case 'ArrowUp':
                moveFocus(props.cell.col, props.cell.row - 1)
                break
                
            case 'ArrowDown':
                moveFocus(props.cell.col, props.cell.row + 1)
                break
                
            case 'ArrowLeft':
                moveFocus(props.cell.col - 1, props.cell.row)
                break
                
            case 'ArrowRight':
                moveFocus(props.cell.col + 1, props.cell.row)
            break
                
            default:
                if (/[a-z]/i.test(evt.key)) {
                    const nwLetter: ILetter ={ 
                        id: evt.key,
                        aantal: 0,
                        score: 3,
                        used: 1
                    }
                    letter = nwLetter
                }
                emit('setletter', { letter: letter.id, col: props.cell.col, row: props.cell.row })
            break
        }
    }

    const moveFocus = (col: number, row: number): void => {
        col = Math.max(0, Math.min(14,  col))
        row = Math.max(0, Math.min(14,  row))
        emit('movefocus', { col, row })
    }
</script>

<template>

    <div class="tile" ref="tilediv" @click="setFocus" @keydown.stop="listen($event)" tabindex="-1">
        <div v-if="!letter" :class="cell.cellClass"></div>
        <div v-else class="white">{{ letter.id }}</div>
    </div>

</template>

<style lang="scss">
.tile {
    background: linear-gradient(#222, #303030);
    flex: 0 0 35px;
    color: white;
    margin: -1px;
    border: 2px solid black;
    border-radius: 4px;
    font-weight: 900;
    font-size: 14px;
    line-height: 33px;
    transition: .25s;

    &:focus {
        z-index: 1;
        outline: none;
        border-color: #55abfb;
    }

    .dw {
        border-radius: 3px;
        background: linear-gradient( #ad681c, #c37828);
        &::before {
            content: 'DW';
        }
    }
    
    .tw {
        border-radius: 3px;
        background: linear-gradient( #6e3131, #7e3b3b);
        &::before {
            content: 'TW';
        }
    }
    
    .dl {
        border-radius: 3px;
        background: linear-gradient( #66905c, #6b9661);
        &::before {
            content: 'DL';
        }
    }
    
    .tl {
        border-radius: 3px;
        background: linear-gradient( #405690,  #475d9c);
        &::before {
            content: 'TL';
        }
    }
    
    .white {
        font-size: 1.2em;
        border-radius: 3px;
        color: #222;
        background: linear-gradient( #e9eefa,  #d1dbf7);
    }
}
</style>
