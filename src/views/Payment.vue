<template>
    <DialogVue :open="open" @close="close" @open="reset">
        <div class="flex divide-x divide-slate-200 h-96">
            <SummaryVue></SummaryVue>
            <FormVue></FormVue>
            <TableVue></TableVue>
        </div>
    </DialogVue>
</template>

<script setup>
import DialogVue from '@/components/Layout/Dialog.vue'
import SummaryVue from '@/components/Payment/Summary.vue'
import FormVue from '@/components/Payment/Form.vue'
import TableVue from '@/components/Payment/Table.vue'

import { store as pays } from '@/store/pays'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['close'])
const close = () => emit('close')

const reset = () => pays.reset()
</script>