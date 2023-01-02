<template>
    <div class="flex flex-wrap gap-x-2 gap-y-2">
        <div class="w-32 box-p">
            <button class="btn-p c-sky-1" @click="reset">
                <span>Nuevo</span>
            </button>
        </div>
        <div class="w-32 box-p">
            <button class="btn-p c-sky-1" @click="openForm2" :disabled="!paxs.pax._id">
                <span>Ubicación</span>
            </button>
        </div>
        <div class="w-32 box-p">
            <button class="btn-p c-green-1" @click="openPayment" :disabled="!paxs.pax._id">
                <span>Pagos</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { store as paxs } from '@/store/paxs'

const reset = () => paxs.reset()

const emit = defineEmits(['openForm2', 'openPayment'])

const openForm2 = () => emit('openForm2')
const openPayment = () => emit('openPayment')
</script>