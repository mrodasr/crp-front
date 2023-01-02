<template>
    <div class="max-w-xs mx-auto mt-40">
        <div v-if="state.user">
            <LogoutboxVue></LogoutboxVue>
        </div>
        <div v-else>
            <LoginboxVue></LoginboxVue>
        </div>
    </div>
</template>

<script setup>
import LoginboxVue from '@/components/Login/Loginbox.vue'
import LogoutboxVue from '@/components/Login/Logoutbox.vue'

import state from '@/state'
</script>