<template>
    <div class="flex flex-col w-96 px-6 box-p">
        <div>
            <div class="flex items-center justify-between py-4">
                <span class="tit-1">Caja</span>
                <span class="lab-s">#{{ users.user.created }}</span>
            </div>
            <div>
                <Listbox class="relative" as="div" v-model="users.user">
                    <ListboxButton class="px-3 py-2 box-s">
                        <div class="flex items-center">
                            <UserCircleIcon class="icon-54"/>
                            <span class="grow mx-2 tit-1">{{ users.user.username }}</span>
                            <ChevronDownIcon class="icon-54"/>
                        </div>
                    </ListboxButton>
                    <Transition enter-from-class="tst-3" leave-to-class="tst-3" enter-active-class="duration-100" leave-active-class="duration-200">
                        <ListboxOptions class="overflow-y-auto absolute top-full h-40 mt-1.5 py-2 box-s bg-white cursor-pointer select-none">
                            <ListboxOption v-for="user in users.users" :key="user._id" :value="user" v-slot="{ active }">
                                <div class="px-3 py-2" :class="{ 'c-sky-2': active }">
                                    <div class="flex items-center">
                                        <UserCircleIcon class="icon-54" :class="{ 'c-sky-2': active }"/>
                                        <span class="grow mx-2">{{ user.username }}</span>
                                    </div>
                                </div>
                            </ListboxOption>
                        </ListboxOptions>
                    </Transition>
                </Listbox>
            </div>
        </div>
        <div class="grow">
            <div class="py-4">
                <div class="tit-1">Resumen</div>
            </div>
            <div class="space-y-3">
                <div>
                    <span>Método</span>
                </div>
                <div v-for="method in config.methods">
                    <div class="flex justify-between">
                        <span>{{ method.alias }}</span>
                        <span>${{ cash(users.user, method.id) }}</span>
                    </div>
                </div>
                <div class="flex justify-between py-2 border-t border-slate-200">
                    <span class="tit-1">Total</span>
                    <span class="tit-1">${{ cash(users.user) }}</span>
                </div>
                <div class="flex justify-between">
                    <span>Saldo</span>
                    <span>${{ residue(users.user) }}</span>
                </div>
                <div class="flex justify-between py-2 border-t border-slate-200">
                    <span class="tit-1">Disponible</span>
                    <span class="tit-1">${{ available(users.user) }}</span>
                </div>
            </div>
        </div>
        <div class="py-4">
            <div class="flex justify-between">
                <span>Retiro</span>
                <div>
                    <div class="flex items-center box-s w-36 tit-1">
                        <span>$</span>
                        <input type="number" class="ml-0 inp-p" v-model.number="withdrawal" :min="0" :max="100000" :step="100">
                    </div>
                </div>
            </div>
        </div>
        <div class="py-4">
            <button class="btn-p c-green-1" @click="validate">
                <span>Retirar</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

import { ref } from 'vue'
import { store as config } from '@/store/config'
import { store as users } from '@/store/users'
import { store as retires } from '@/store/retires'
import { cash, residue, available } from '@/helper/func'

import app from '@/app'

await users.read()
users.user = users.users[0]

const withdrawal = ref(0)

const valid = () => withdrawal.value > 0 && withdrawal.value <= available(users.user)
const validate = () => valid() ? retire() : app.flash(4)

const retire = async () => {
    retires.retire.amount = withdrawal.value
    retires.retire.residue = available(users.user) - withdrawal.value
    const data = await retires.create()
    if (data) {
        retires.read()
        retires.reset()
        withdrawal.value = 0
    }
}
</script>

<style scoped>
::-webkit-scrollbar {
    @apply hidden;
}
</style>