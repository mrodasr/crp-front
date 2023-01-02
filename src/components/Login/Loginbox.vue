<template>
    <div class="space-y-10">
        <div>
            <span class="text-xl font-light">Iniciar sesión</span>
        </div>
        <form class="space-y-5" @submit.prevent="login">
            <div>
                <Listbox class="relative" as="div" v-model="user">
                    <ListboxButton class="px-3 py-2 box-p cursor-default">
                        <div class="flex items-center">
                            <UserCircleIcon class="icon-65"/>
                            <span class="grow mx-2 text-left">{{ user.username }}</span>
                            <ChevronUpDownIcon class="icon-54"/>
                        </div>
                    </ListboxButton>
                    <Transition enter-from-class="tst-3" leave-to-class="tst-3" enter-active-class="duration-100" leave-active-class="duration-200">
                        <ListboxOptions class="overflow-y-auto absolute top-full h-44 mt-1.5 py-2 box-p select-none">
                            <ListboxOption v-for="user in users.users" :key="user._id" :value="user" v-slot="{ active, selected }">
                                <div class="px-3 py-2" :class="{ 'c-sky-2': active }">
                                    <div class="flex items-center">
                                        <UserCircleIcon class="icon-65" :class="{ 'c-sky-2': active }"/>
                                        <span class="grow mx-2 text-left">{{ user.username }}</span>
                                        <CheckIcon class="icon-54" v-if="selected"/>
                                    </div>
                                </div>
                            </ListboxOption>
                        </ListboxOptions>
                    </Transition>
                </Listbox>
            </div>
            <div>
                <div class="px-3 py-2 box-p">
                    <div class="flex items-center">
                        <KeyIcon class="icon-65"/>
                        <span class="grow mx-2">
                            <input type="password" class="inp-p" v-model="password">
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div class="box-p">
                    <button class="btn-p c-sky-1" type="submit" @click="login">
                        <span>Entrar</span>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { UserCircleIcon, ChevronUpDownIcon, CheckIcon, KeyIcon } from '@heroicons/vue/20/solid'

import { ref } from 'vue'
import { store as users } from '@/store/users'
import state from '@/state'

await users.read()

const user = ref(users.users[0])
const password = ref('')

const login = () => {
    const payload = { ...user.value, password: password.value }
    state.login(payload)
}
</script>

<style scoped>
::-webkit-scrollbar {
    @apply hidden;
}
</style>