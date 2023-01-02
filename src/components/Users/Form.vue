<template>
    <DialogVue :open="open" @close="close">
        <div class="flex flex-col w-72 h-96 px-6">
            <div class="flex items-center justify-between py-4">
                <span class="tit-1">Usuario</span>
                <span class="lab-s">#{{ users.user._id ? users.user.created : 'nuevo' }}</span>
            </div>
            <div class="grow">
                <fieldset class="space-y-2" :disabled="users.user._id">
                    <div>
                        <span class="lab-p">Nombre de usuario</span>
                        <div class="box-s">
                            <input type="text" class="inp-p" v-model.trim="users.user.username" minlength="4" maxlength="16">
                        </div>
                    </div>
                    <div>
                        <span class="lab-p">Contraseña</span>
                        <div class="box-s">
                            <input type="password" class="inp-p" v-model="users.user.password" minlength="8" maxlength="16">
                        </div>
                    </div>
                    <div>
                        <label class="block py-1">
                            <input type="checkbox" class="inp-cb text-sky-400" v-model="users.user.enabled">
                            <span class="lab-p inline">Habilitado</span>
                        </label>
                    </div>
                    <div>
                        <label class="block py-1">
                            <input type="checkbox" class="inp-cb text-amber-400" v-model="users.user.admin">
                            <span class="lab-p inline">Administrador</span>
                        </label>
                    </div>
                </fieldset>
            </div>
            <div class="py-4">
                <button class="btn-p c-sky-1" @click="submit" :disabled="users.user._id">
                    <span>Enviar</span>
                </button>
            </div>
        </div>
    </DialogVue>
</template>

<script setup>
import DialogVue from '@/components/Layout/Dialog.vue'

import { store as users } from '@/store/users'
import state from '@/state'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['close'])
const close = () => emit('close')

const submit = async () => {
    const data = await users.create()
    if (data) {
        close()
        state.logout()
    }
}
</script>