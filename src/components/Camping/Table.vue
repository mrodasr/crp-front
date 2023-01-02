<template>
    <div class="overflow-x-auto flex box-p h-full">
        <div class="grow flex flex-col">
            <div class="th">
                <div class="td w-9">#</div>
                <div class="td w-40">Nombres</div>
                <div class="td w-32">País / Provincia</div>
                <div class="td w-16">Pax</div>
                <div class="td w-32">Ubicación</div>
                <div class="td w-32">Entrada</div>
                <div class="td w-32" v-if="status.id">Deuda</div>
                <div class="td w-32" v-else>Salida</div>
                <div class="td w-20">Creado</div>
            </div>
            <div class="grow overflow-y-auto">
                <div v-for="(pax, index) in paxsSearch" :key="pax._id" @click="select(pax)" :class="[ pax._id == paxs.pax._id ? 'tr-sel' : 'tr' ]">
                    <div class="td w-9">{{ index + 1 }}</div>
                    <div class="td w-40">{{ names(pax) }}</div>
                    <div class="td w-32">{{ pax.origin }}</div>
                    <div class="td w-16">{{ count(pax) }}</div>
                    <div class="td w-32">{{ sites(pax) }}</div>
                    <div class="td w-32">{{ date(pax.checkin) }}</div>
                    <div class="td w-32" v-if="status.id">{{ debt(pax).inDays }}</div>
                    <div class="td w-32" v-else>{{ date(pax.checkout) }}</div>
                    <div class="td w-20">{{ pax.user.username }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { store as paxs } from '@/store/paxs'
import { store as pays } from '@/store/pays'

import { status, paxsSearch } from '@/helper/store'
import { names, count, sites, date, debt } from '@/helper/func'

const select = (pax) => paxs.select(pax)

await paxs.read()
await pays.read()
</script>