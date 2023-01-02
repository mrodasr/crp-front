<template>
    <div class="flex flex-col box-p w-fit h-full px-6">
        <div class="py-4">
            <span class="tit-1">Historial de pagos</span>
        </div>
        <div>
            <div class="flex flex-col w-fit text-xs">
                <div class="th-mini">
                    <div class="td-mini w-9">#</div>
                    <div class="td-mini w-24">Fecha</div>
                    <div class="td-mini w-28">Concepto</div>
                    <div class="td-mini w-24">Importe</div>
                    <div class="td-mini w-24">Método</div>
                    <div class="td-mini w-32">Notas</div>
                </div>
                <div class="grow overflow-y-auto h-96">
                    <div v-for="(pay, index) in paysUser" :key="pay._id" @click="select(pay)" :class="[ pay._id == pays.pay._id ? 'tr-sel-mini' : 'tr-mini' ]">
                        <div class="td-mini w-9">{{ index + 1 }}</div>
                        <div class="td-mini w-24">{{ date(pay.created) }}</div>
                        <div class="td-mini w-28">{{ service(pay) }}</div>
                        <div class="td-mini w-24">${{ pay.amount }}</div>
                        <div class="td-mini w-24">{{ method(pay) }}</div>
                        <div class="td-mini w-32">{{ pay.notes ? pay.notes : 's/n' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { store as pays } from '@/store/pays'
import { store as retires } from '@/store/retires'

import { paysUser } from '@/helper/store'
import { date, service, method } from '@/helper/func'

await pays.read()
await retires.read()
</script>