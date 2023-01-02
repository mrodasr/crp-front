<template>
    <div class="h-full pt-24">
        <RouterView></RouterView>
    </div>
    <div class="absolute top-6 inset-x-6">
        <MenuVue></MenuVue>
    </div>
    <Flash></Flash>
</template>

<script setup>
import Flash from '@/components/Layout/Flash.vue'
import MenuVue from '@/components/Layout/Menu.vue'
</script>