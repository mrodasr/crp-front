<template>
    <div class="flex items-center justify-between flex-row-reverse">
        <Menu class="relative" as="div">
            <MenuButton class="px-3 py-2 box-p">
                <div class="flex items-center">
                    <UserCircleIcon class="icon-54"/>
                    <span class="mx-2 select-none">{{ state.user.username }}</span>
                    <ChevronDownIcon class="icon-54"/>
                </div>
            </MenuButton>
            <Transition enter-from-class="tst-4" leave-to-class="tst-4" enter-active-class="duration-100" leave-active-class="duration-200">
                <MenuItems class="absolute top-full mt-1.5 box-p">
                    <MenuItem>
                        <button class="btn-p hover:c-sky-1" @click="logout">
                            <span>Salir</span>
                        </button>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
        <Menu class="relative" as="div">
            <MenuButton class="px-2 py-2 box-p">
                <div class="flex items-center">
                    <Bars3BottomLeftIcon class="icon-54"/>
                </div>
            </MenuButton>
            <Transition enter-from-class="tst-5" leave-to-class="tst-5" enter-active-class="duration-100" leave-active-class="duration-200">
                <MenuItems class="absolute top-0 left-full ml-1.5 box-p w-fit">
                    <div class="flex divide-x divide-slate-200">
                        <MenuItem v-for="(route, index) in routes" :key="index">
                            <RouterLink class="w-32 py-2 text-center" :to="{ path: route.path }">
                                <span>{{ route.alias }}</span>
                            </RouterLink>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { UserCircleIcon, Bars3BottomLeftIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

import state from '@/state'

const routes = [
    { path: '/', alias: 'Inicio' },
    { path: '/cash', alias: 'Caja' }
]

const logout = () => state.logout()
</script>