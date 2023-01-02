<template>
    <div class="space-y-10">
        <div>
            <span class="text-xl font-light">Cerrar sesión</span>
        </div>
        <div>
            <div class="box-p">
                <button class="btn-p c-sky-1" @click="logout">
                    <span>Salir</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import state from '@/state'

const logout = () => state.logout()
</script>