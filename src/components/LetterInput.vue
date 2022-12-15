<script setup lang="ts">
    import { useLetterStore } from '../stores/letters';

    const store = useLetterStore()
    let inputOwnLetters = ''
    let currentLetters = ''

    const diffString = (subject: string, compare: string) => {
        const result: string[] = subject.split('')
        compare.split('').forEach(l => {
            if (result.includes(l)) {
                result.splice(result.indexOf(l), 1)
            }
        })
        return result.join('')
    }

    const checkInput = (evt: KeyboardEvent) => {
        switch (evt.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'Delete':
            case 'Backspace':
                /** do nothing */
            break
            default:
                if (/^[a-z.]$/i.test(evt.key)) {
                    /** do nothing */
                } else {
                    evt.preventDefault()
                }
            break
        }
    }

    const updateletters = (): void => {
        const newLetter = diffString(inputOwnLetters, currentLetters)
        const oldLetter = diffString(currentLetters, inputOwnLetters)
        store.updateLetter({ letter: newLetter, oldletter: oldLetter })
        currentLetters = inputOwnLetters
    }
</script>

<template>
    <div>
        <div>type hier de letters die je zelf hebt:</div>
        <input type="text"
            v-model="inputOwnLetters"
            class="block-counter__wf-input"
            @keydown="checkInput"
            @input="updateletters"
            maxlength="7"
        >
    </div>
</template>
