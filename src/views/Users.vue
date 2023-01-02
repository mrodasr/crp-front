<template>
    <div class="flex gap-x-6 px-6">
        <div class="flex-none box-p w-36">
            <button class="btn-p c-sky-1" @click="create">
                <span>Nuevo</span>
            </button>
        </div>
        <div></div>
    </div>
    <FormVue :open="open" @close="open=false"></FormVue>
</template>

<script setup>
import FormVue from '@/components/Users/Form.vue'

import { ref } from 'vue'
import { store as users } from '@/store/users'

const open = ref(false)

const create = () => {
    users.reset()
    open.value = true
}
</script>