<script setup lang="ts">
    const emit = defineEmits<{
        (e: 'letterschanged', value: string): void
    }>()

    let inputOwnLetters: string = ''

    const emitletters = (): void => {
        emit('letterschanged', inputOwnLetters)
    }
</script>

<template>
    <div>
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
