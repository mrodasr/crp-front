<template>
    <DialogVue :open="app.message.show" @close="close" @open="open">
        <div class="w-96 px-6 py-4" tabindex="0">
            <div class="flex items-start gap-x-4" v-if="app.message.id == 1">
                <div>
                    <CheckIcon class="icon-7 text-green-400"/>
                </div>
                <div>
                    <div class="tit-1">Bien</div>
                    <div>Operación completada con éxito</div>
                </div>
            </div>
            <div class="flex items-start gap-x-4" v-else-if="app.message.id == 2">
                <div>
                    <ExclamationTriangleIcon class="icon-7 text-amber-400"/>
                </div>
                <div>
                    <div class="tit-1">Algo pasó</div>
                    <div>No se pudo completar la operación :(</div>
                </div>
            </div>
            <div class="flex items-start gap-x-4" v-else-if="app.message.id == 3">
                <div>
                    <CurrencyDollarIcon class="icon-7 text-red-400"/>
                </div>
                <div>
                    <div class="tit-1">Pasajero con deuda</div>
                    <div>Revise la caja antes de hacer checkout</div>
                </div>
            </div>
            <div class="flex items-start gap-x-4" v-else-if="app.message.id == 4">
                <div>
                    <ExclamationTriangleIcon class="icon-7 text-amber-400"/>
                </div>
                <div>
                    <div class="tit-1">Ups</div>
                    <div>Ingrese un monto válido</div>
                </div>
            </div>
        </div>
    </DialogVue>
</template>

<script setup>
import DialogVue from '@/components/Layout/Dialog.vue'

import { CheckIcon, ExclamationTriangleIcon, CurrencyDollarIcon } from '@heroicons/vue/20/solid'

import app from '@/app'

const close = () => app.message.show = false
const open = () => setTimeout(() => close(), app.message.showTime)
</script>