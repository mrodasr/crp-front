<template>
    <div class="flex gap-x-6 h-full px-6 pb-6">
        <FormVue class="flex-none" @next="openForm2=true"></FormVue>
        <div class="grow overflow-x-auto flex flex-col gap-y-3">
            <ToolsVue @openForm2="openForm2=true" @openPayment="openPayment=true"></ToolsVue>
            <Tools2Vue></Tools2Vue>
            <TableVue></TableVue>
            <DashboardVue></DashboardVue>
        </div>
    </div>
    <Form2Vue :open="openForm2" @close="openForm2=false"></Form2Vue>
    <PaymentVue :open="openPayment" @close="openPayment=false"></PaymentVue>
</template>

<script setup>
import FormVue from '@/components/Camping/Form.vue'
import Form2Vue from '@/components/Camping/Form2.vue'
import TableVue from '@/components/Camping/Table.vue'
import ToolsVue from '@/components/Camping/Tools.vue'
import Tools2Vue from '@/components/Camping/Tools2.vue'
import DashboardVue from '@/components/Camping/Dashboard.vue'
import PaymentVue from '@/views/Payment.vue'

import { ref } from 'vue'

const openForm2 = ref(false)
const openPayment = ref(false)
</script>