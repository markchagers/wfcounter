import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board', { 
    
    state: () => ({
        tileList: _tileList
    }),

    getters: {
        getTile: (state) => {
            return (col: number, row: number) => state.tileList[row][col]
        }
    },
})

const _tileList = [
    ['tl', '', '', '', 'tw', '', '', 'dl', '', '', 'tw', '', '', '', 'tl'],
    ['', 'dl', '', '', '', 'tl', '', '', '', 'tl', '', '', '', 'dl', ''],
    ['', '', 'dw', '', '', '', 'dl', '', 'dl', '', '', '', 'dw', '', ''],
    ['', '', '', 'tl', '', '', '', 'dw', '', '', '', 'tl', '', '', ''],
    ['tw', '', '', '', 'dw', '', 'dl', '', 'dl', '', 'dw', '', '', '', 'tw'],
    ['', 'tl', '', '', '', 'tl', '', '', '', 'tl', '', '', '', 'tl', ''],
    ['', '', 'dl', '', 'dl', '', '', '', '', '', 'dl', '', 'dl', '', ''],
    ['dl', '', '', 'dw', '', '', '', '', '', '', '', 'dw', '', '', 'dl'],
    ['', '', 'dl', '', 'dl', '', '', '', '', '', 'dl', '', 'dl', '', ''],
    ['', 'tl', '', '', '', 'tl', '', '', '', 'tl', '', '', '', 'tl', ''],
    ['tw', '', '', '', 'dw', '', 'dl', '', 'dl', '', 'dw', '', '', '', 'tw'],
    ['', '', '', 'tl', '', '', '', 'dw', '', '', '', 'tl', '', '', ''],
    ['', '', 'dw', '', '', '', 'dl', '', 'dl', '', '', '', 'dw', '', ''],
    ['', 'dl', '', '', '', 'tl', '', '', '', 'tl', '', '', '', 'dl', ''],
    ['tl', '', '', '', 'tw', '', '', 'dl', '', '', 'tw', '', '', '', 'tl']
]
