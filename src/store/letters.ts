import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'
import { ILetter } from '../typings/i-letter'

@Module({ generateMutationSetters: true })
export default class Letters extends VuexModule {
    private _letterlist: ILetter[] = [
        {
            id: 'A',
            aantal: 7,
            score: 1,
            used: 0,
        },
        {
            id: 'B',
            aantal: 2,
            score: 4,
            used: 0,
        },
        {
            id: 'C',
            aantal: 2,
            score: 5,
            used: 0,
        },
        {
            id: 'D',
            aantal: 5,
            score: 2,
            used: 0,
        },
        {
            id: 'E',
            aantal: 18,
            score: 1,
            used: 0,
        },
        {
            id: 'F',
            aantal: 2,
            score: 4,
            used: 0,
        },
        {
            id: 'G',
            aantal: 3,
            score: 3,
            used: 0,
        },
        {
            id: 'H',
            aantal: 2,
            score: 4,
            used: 0,
        },
        {
            id: 'I',
            aantal: 4,
            score: 2,
            used: 0,
        },
        {
            id: 'J',
            aantal: 2,
            score: 4,
            used: 0,
        },
        {
            id: 'K',
            aantal: 3,
            score: 3,
            used: 0,
        },
        {
            id: 'L',
            aantal: 3,
            score: 3,
            used: 0,
        },
        {
            id: 'M',
            aantal: 3,
            score: 3,
            used: 0,
        },
        {
            id: 'N',
            aantal: 11,
            score: 1,
            used: 0,
        },
        {
            id: 'O',
            aantal: 6,
            score: 1,
            used: 0,
        },
        {
            id: 'P',
            aantal: 2,
            score: 4,
            used: 0,
        },
        {
            id: 'Q',
            aantal: 1,
            score: 10,
            used: 0,
        },
        {
            id: 'R',
            aantal: 5,
            score: 2,
            used: 0,
        },
        {
            id: 'S',
            aantal: 5,
            score: 2,
            used: 0,
        },
        {
            id: 'T',
            aantal: 5,
            score: 2,
            used: 0,
        },
        {
            id: 'U',
            aantal: 3,
            score: 2,
            used: 0,
        },
        {
            id: 'V',
            aantal: 2,
            score: 4,
            used: 0,
        },
        {
            id: 'W',
            aantal: 2,
            score: 5,
            used: 0,
        },
        {
            id: 'X',
            aantal: 1,
            score: 8,
            used: 0,
        },
        {
            id: 'Y',
            aantal: 1,
            score: 8,
            used: 0,
        },
        {
            id: 'Z',
            aantal: 2,
            score: 5,
            used: 0,
        },
        {
            id: '.',
            aantal: 2,
            score: 0,
            used: 0,
        },
    ]

    // getters
    get letterlist(): ILetter[] {
        return this._letterlist
    }

    get remainingLetters(): ILetter[] {
        return this.letterlist.filter((l: ILetter) => l.used !== l.aantal)
    }

    // Actions
    @Action
    public async updateLetter(payload: {
        letter: string
        used: number
    }): Promise<void> {
        const il = this._letterlist.find((l) => l.id === payload.letter)
        const diff = payload.used - (il?.used || 0)
        for (let i = 0; i < Math.abs(diff); i++) {
            if (diff > 0) {
                this.upLetter(payload.letter)
            } else {
                this.downLetter(payload.letter)
            }
        }
    }

    // Mutations
    @Mutation
    private upLetter(letter: string): void {
        const il = this._letterlist.find((l) => l.id === letter)
        if (il) {
            il.used++
        }
    }

    @Mutation
    private downLetter(letter: string): void {
        const il = this._letterlist.find((l) => l.id === letter)
        if (il) {
            il.used--
        }
    }
}
