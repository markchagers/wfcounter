<script setup lang="ts">
    const emit = defineEmits<{
    (e: 'letterschanged', value: string): void
    }>()

    let inputLetters: string = ''
    let inputOwnLetters: string = ''

    const emitletters = (): void => {
        emit('letterschanged', `${inputOwnLetters}${inputLetters}`)
    }
</script>

<template>
    <div>
        <div>type hier de letters die nu in het spel zijn (punt = blanco):</div>
        <textarea
            v-model="inputLetters"
            class="block-counter__wf-input"
            @input="emitletters"
            rows="15"
            cols="24"
        ></textarea>
        <div>type hier de letters die je zelf hebt:</div>
        <textarea
            v-model="inputOwnLetters"
            class="block-counter__wf-input"
            @input="emitletters"
            rows="1"
            cols="10"
        ></textarea>
    </div>
</template>
