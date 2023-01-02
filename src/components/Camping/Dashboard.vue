<template>
    <div class="flex justify-between mx-3 text-xs select-none">
        <div class="flex flex-wrap gap-x-6">
            <span class="tit-1">{{ accom.alias }}</span>
            <span class="tit-1">{{ status.alias }}</span>
            <span>Registros: {{ paxsFilter.length }}</span>
            <span>Pax: {{ pax(paxsFilter) }}</span>
            <span class="tit-1">Búsqueda</span>
            <span>Registros: {{ paxsSearch.length }}</span>
            <span>Pax: {{ pax(paxsSearch) }}</span>
            <span></span>
        </div>
        <RouterLink :to="{ path: '/report' }" target="_blank">
            <div class="flex items-center gap-x-1 hover:underline">
                <DocumentArrowDownIcon class="w-4 h-4"/>
                <span>Reporte</span>
            </div>
        </RouterLink>
    </div>
</template>

<script setup>
import { DocumentArrowDownIcon } from '@heroicons/vue/24/solid'
import { accom, status, paxsFilter, paxsSearch } from '@/helper/store'
import { pax } from '@/helper/func'
</script>