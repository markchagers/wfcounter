<script setup lang="ts">
    import { useBoardStore } from '@/stores/board'
    import { ref } from 'vue';
    import LetterTile from './LetterTile.vue'

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

    interface Row {
        id: string
        cells: Cell[]
    }
    const rows: Row[] = []

    const store = useBoardStore()
    const focusedCell = ref<Cell>({ col: 0, row: 0 })
    const focusDelta = ref<Cell>({ col: 0, row: 0 })

    for (let r = 0; r < 15; r++) {
        const row: Row = { id: `row_${r + 1}`, cells: [] }
        for (let c = 0; c < 15; c++) {
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
        const col = focusedCell.value.col + focusDelta.value.col
        const row = focusedCell.value.row + focusDelta.value.row  
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
        margin: 0 auto;
        width: 450px;
        background-color: #222;
        border: 4px solid black;
        display: flex;
        flex-flow: column nowrap;
    
        &__row {
            flex: 1 1 28px;
            width: fit-content;
            display: flex;
            flex-flow: row nowrap;
        }
    }
</style>
