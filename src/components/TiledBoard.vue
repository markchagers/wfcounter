<script setup lang="ts">
    import { useBoardStore } from '@/stores/board'
    import { ref } from 'vue';
    import LetterTile from './LetterTile.vue'

    import type { ILetter } from '@/model/i-letter';

    interface Cell {
        col: number
        row: number
        cellClass?: string
        letter?: ILetter
    }

    interface Row {
        id: string
        cells: Cell[]
    }
    const rows: Row[] = []

    const rowColCount = 15
    const store = useBoardStore()
    const focusedCell = ref<Cell>({ col: 0, row: 0 })
    const focusDelta = ref<Cell>({ col: 0, row: 0 })

    for (let r = 0; r < rowColCount; r++) {
        const row: Row = { id: `row_${r + 1}`, cells: [] }
        for (let c = 0; c < rowColCount; c++) {
            const cell: Cell = { col: c, row: r, cellClass: store.getTile(r, c) }
            row.cells.push(cell)
        }
        rows.push(row)
    }

    const setCellFocus = (focus: { col: number, row: number }): void => {
        focusedCell.value = focus
        focusDelta.value = { col: 0, row: 0 }
    }

    const moveCellFocus = (focus: { col: number, row: number }): void => {
        focusDelta.value = focus
        setLetter()
    }

    const setLetter = () => {
        const col = Math.min(rowColCount - 1, Math.max(focusedCell.value.col + focusDelta.value.col, 0))
        const row = Math.min(rowColCount - 1, Math.max(focusedCell.value.row + focusDelta.value.row, 0))
        focusedCell.value = { col, row }
    }
</script>

<template>
    <div class="board">
        <div class="board__row" v-for="row in rows" :key="row.id">
            <LetterTile  v-for="cell in row.cells" 
            :key="`${cell.row}-${cell.col}`" 
            :cell="cell"
            :focusedcell="focusedCell"
            @movefocus="moveCellFocus($event)"
            @setfocus="setCellFocus($event)"
            @setletter="setLetter"
            ></LetterTile>
        </div>
    </div>
</template>

<style lang="scss">
    .board {
        width: fit-content;
        margin: 0 auto;
        background-color: #222;
        border: 4px solid black;
        display: flex;
        flex-flow: column nowrap;
    
        &__row {
            flex: 1 1 auto;
            width: fit-content;
            display: flex;
            flex-flow: row nowrap;
        }
    }
</style>
