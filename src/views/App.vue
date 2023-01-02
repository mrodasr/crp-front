<template>
    <Suspense>
        <div class="fixed inset-0 base">
            <RouterView></RouterView>
        </div>
    </Suspense>
</template>

<script setup>
import state from '@/state'

state.initialize()
</script>