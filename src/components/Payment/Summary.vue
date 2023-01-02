<template>
    <div class="flex flex-col w-72 px-6">
        <div class="flex items-center justify-between py-4">
            <span class="tit-1">Resumen</span>
            <span class="lab-s">#{{ paxs.pax._id ? paxs.pax.created : '' }}</span>
        </div>
        <div v-for="(cats, index) in summarize(paxs.pax).summary" :key="index">
            <div v-for="cat in cats" :key="cat.id">
                <div v-if="cat.qty">{{ cat.alias }}: {{ cat.qty }}</div>
            </div>
        </div>
        <div class="py-4">
            <div class="tit-1">Tarifa base</div>
        </div>
        <div>
            <div>${{ summarize(paxs.pax).rate }} por día</div>
        </div>
        <div class="py-4">
            <div class="tit-1">Estadía</div>
        </div>
        <div v-if="paxs.pax.status">
            <div>{{ days(paxs.pax.checkin) }} días</div>
        </div>
        <div v-else>
            <div>{{ days(paxs.pax.checkin, paxs.pax.checkout) }} días</div>
        </div>
        <div class="py-4">
            <div class="tit-1">Deuda</div>
        </div>
        <div>
            <div>${{ debt(paxs.pax).inAmount }}</div>
        </div>
    </div>
</template>

<script setup>
import { store as paxs } from '@/store/paxs'

import { days, summarize, debt } from '@/helper/func'
</script>