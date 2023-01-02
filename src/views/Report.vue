<template>
    <div class="fixed inset-0 bg-white p-6">
        <div class="flex flex-items justify-between py-5">
            <div>
                <div class="text-xl font-semibold">Reporte Deudores {{ date(Date.now()) }}</div>
            </div>
            <button type="button" class="btn-p c-sky-1 w-36" @click="print">
                <span>Imprimir</span>
            </button>
        </div>
        <div class="flex flex-col">
            <div class="th border-b border-slate-500">
                <div class="td w-9">#</div>
                <div class="td w-32">Entrada</div>
                <div class="td w-48">Nombres</div>
                <div class="td w-32">País / Provincia</div>
                <div class="td w-16">Pax</div>
                <div class="td w-32">Deuda (días)</div>
                <div class="td w-32">Deuda (monto)</div>
                <div class="td w-fit">Ubicación</div>
            </div>
            <div class="grow overflow-y-auto">
                <div v-for="(pax, index) in debtors" :key="pax._id" class="tr border-b border-slate-500">
                    <div class="td w-9">{{ index + 1 }}</div>
                    <div class="td w-32">{{ date(pax.checkin) }}</div>
                    <div class="td w-48">{{ names(pax) }}</div>
                    <div class="td w-32">{{ pax.origin }}</div>
                    <div class="td w-16">{{ count(pax) }}</div>
                    <div class="td w-32">{{ debt(pax).inDays }}</div>
                    <div class="td w-32">${{ debt(pax).inAmount }}</div>
                    <div class="td w-fit">{{ locs(pax) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { names, count, locs, date, debt, report } from '@/helper/func'

const print = () => window.print()
const debtors = await report()
</script>