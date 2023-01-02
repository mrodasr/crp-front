<template>
    <div class="flex gap-x-6 h-full px-6 pb-6">
        <SummaryVue class="flex-none"></SummaryVue>
        <TableVue></TableVue>
    </div>
</template>

<script setup>
import SummaryVue from '@/components/Cash/Summary.vue'
import TableVue from '@/components/Cash/Table.vue'
</script>