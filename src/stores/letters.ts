import { defineStore } from 'pinia'

import type { ILetter } from '@/model/i-letter';

export const useLetterStore = defineStore('letters', { 
    
    state: () => ({
        letterString: _letterString,
        letterlist: [..._letterlist]
    }),

    getters: {
        letters(state) {
            return state.letterlist
        },
        remainingLetters(state) {
            return state.letterlist.filter(l => l.used !== l.aantal)
        },
        usedLetters(state) {
            return state.letterlist.filter(l => l.used > 0)
        },
        letterById(state) {
            return (id: string) => state.letterlist.find(l => l.id === id.toUpperCase())
        }
    },

    actions: {
        init(): void {
            this.letterlist = [..._letterlist]
        },
        updateLetter(payload: { letter?: string; oldletter?: string }): void {
            if (payload.letter) {
                const il = this.letterlist.find((l) => l.id === payload.letter?.toUpperCase())
                if (il) {
                    il.used += 1
                }
            }
            if (payload.oldletter) {
                const ol = this.letterlist.find((l) => l.id === payload.oldletter?.toUpperCase())
                if (ol) {
                    ol.used -= 1
                }
            }
        }
    }
})

const _letterString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ.'
const _letterlist: ILetter[] = [
    {
        id: "A",
        aantal: 7,
        score: 1,
        used: 0,
    },
    {
        id: "B",
        aantal: 2,
        score: 4,
        used: 0,
    },
    {
        id: "C",
        aantal: 2,
        score: 5,
        used: 0,
    },
    {
        id: "D",
        aantal: 5,
        score: 2,
        used: 0,
    },
    {
        id: "E",
        aantal: 18,
        score: 1,
        used: 0,
    },
    {
        id: "F",
        aantal: 2,
        score: 4,
        used: 0,
    },
    {
        id: "G",
        aantal: 3,
        score: 3,
        used: 0,
    },
    {
        id: "H",
        aantal: 2,
        score: 4,
        used: 0,
    },
    {
        id: "I",
        aantal: 4,
        score: 2,
        used: 0,
    },
    {
        id: "J",
        aantal: 2,
        score: 4,
        used: 0,
    },
    {
        id: "K",
        aantal: 3,
        score: 3,
        used: 0,
    },
    {
        id: "L",
        aantal: 3,
        score: 3,
        used: 0,
    },
    {
        id: "M",
        aantal: 3,
        score: 3,
        used: 0,
    },
    {
        id: "N",
        aantal: 11,
        score: 1,
        used: 0,
    },
    {
        id: "O",
        aantal: 6,
        score: 1,
        used: 0,
    },
    {
        id: "P",
        aantal: 2,
        score: 4,
        used: 0,
    },
    {
        id: "Q",
        aantal: 1,
        score: 10,
        used: 0,
    },
    {
        id: "R",
        aantal: 5,
        score: 2,
        used: 0,
    },
    {
        id: "S",
        aantal: 5,
        score: 2,
        used: 0,
    },
    {
        id: "T",
        aantal: 5,
        score: 2,
        used: 0,
    },
    {
        id: "U",
        aantal: 3,
        score: 2,
        used: 0,
    },
    {
        id: "V",
        aantal: 2,
        score: 4,
        used: 0,
    },
    {
        id: "W",
        aantal: 2,
        score: 5,
        used: 0,
    },
    {
        id: "X",
        aantal: 1,
        score: 8,
        used: 0,
    },
    {
        id: "Y",
        aantal: 1,
        score: 8,
        used: 0,
    },
    {
        id: "Z",
        aantal: 2,
        score: 5,
        used: 0,
    },
    {
        id: ".",
        aantal: 2,
        score: 0,
        used: 0,
    },
]
