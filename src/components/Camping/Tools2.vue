<template>
    <div class="flex justify-between flex-wrap gap-x-2 gap-y-2">
        <div class="flex flex-wrap gap-x-2">
            <Listbox class="relative w-32" as="div" v-model="accom">
                <ListboxButton class="px-3 py-2 box-p">
                    <div class="flex items-center">
                        <span class="grow mx-2 tit-1">{{ accom.alias }}</span>
                        <ChevronDownIcon class="icon-54"/>
                    </div>
                </ListboxButton>
                <Transition enter-from-class="tst-3" leave-to-class="tst-3" enter-active-class="duration-100" leave-active-class="duration-200">
                    <ListboxOptions class="absolute top-full mt-1.5 py-2 box-p cursor-pointer select-none">
                        <ListboxOption v-for="accom in config.accoms" :key="accom.id" :value="accom" v-slot="{ active }">
                            <div class="px-3 py-2" :class="{ 'c-sky-2': active }">
                                <div class="flex items-center">
                                    <span class="grow mx-2">{{ accom.alias }}</span>
                                </div>
                            </div>
                        </ListboxOption>
                    </ListboxOptions>
                </Transition>
            </Listbox>
            <Listbox class="relative w-32" as="div" v-model="status">
                <ListboxButton class="px-3 py-2 box-p">
                    <div class="flex items-center">
                        <span class="grow mx-2 tit-1">{{ status.alias }}</span>
                        <ChevronDownIcon class="icon-54"/>
                    </div>
                </ListboxButton>
                <Transition enter-from-class="tst-3" leave-to-class="tst-3" enter-active-class="duration-100" leave-active-class="duration-200">
                    <ListboxOptions class="absolute top-full mt-1.5 py-2 box-p cursor-pointer select-none">
                        <ListboxOption v-for="status in config.statuses" :key="status.id" :value="status" v-slot="{ active }">
                            <div class="px-3 py-2" :class="{ 'c-sky-2': active }">
                                <div class="flex items-center">
                                    <span class="grow mx-2">{{ status.alias }}</span>
                                </div>
                            </div>
                        </ListboxOption>
                    </ListboxOptions>
                </Transition>
            </Listbox>
        </div>
        <div class="flex flex-wrap gap-x-2">
            <div class="px-2 py-2 box-p w-64">
                <div class="flex items-center">
                    <MagnifyingGlassIcon class="icon-54"/>
                    <span class="grow mx-2">
                        <input type="text" class="inp-p" v-model="keyword">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'

import { store as config } from '@/store/config'
import { accom, status, keyword } from '@/helper/store'
</script>