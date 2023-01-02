<template>
    <div class="flex flex-col w-fit px-6">
        <div class="py-4">
            <span class="tit-1">Historial de pagos</span>
        </div>
        <div>
            <div class="flex flex-col h-64 text-xs">
                <div class="th-mini">
                    <div class="td-mini w-24">Fecha</div>
                    <div class="td-mini w-28">Concepto</div>
                    <div class="td-mini w-24">Importe</div>
                    <div class="td-mini w-24">Método</div>
                    <div class="td-mini w-20">Recibido</div>
                </div>
                <div class="grow overflow-y-auto">
                    <div v-for="pay in paysPax" :key="pay._id" @click="select(pay)" :class="[ pay._id == pays.pay._id ? 'tr-sel-mini' : 'tr-mini' ]">
                        <div class="td-mini w-24">{{ date(pay.created) }}</div>
                        <div class="td-mini w-28">{{ service(pay) }}</div>
                        <div class="td-mini w-24">${{ pay.amount }}</div>
                        <div class="td-mini w-24">{{ method(pay) }}</div>
                        <div class="td-mini w-20">{{ pay.user.username }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { store as pays } from '@/store/pays'

import { paysPax } from '@/helper/store'
import { date, service, method } from '@/helper/func'

const select = (pay) => pays.select(pay)
</script>