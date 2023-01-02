<template>
    <div class="flex flex-col w-96 px-6 box-p">
        <div class="flex items-center justify-between py-4">
            <span class="tit-1">Pasajero</span>
            <span class="lab-s">#{{ paxs.pax._id ? paxs.pax.created : 'nuevo' }}</span>
        </div>
        <div class="overflow-y-auto grow">
            <fieldset :disabled="paxs.pax._id">
                <div class="grid grid-cols-2 gap-x-2 gap-y-2">
                    <div>
                        <span class="lab-p">Nombre (*)</span>
                        <div class="box-s">
                            <input type="text" class="inp-p" v-model="paxs.pax.name" maxlength="16">
                        </div>
                    </div>
                    <div>
                        <span class="lab-p">No. documento</span>
                        <div class="box-s">
                            <input type="text" class="inp-p" v-model="paxs.pax.docn" maxlength="16">
                        </div>
                    </div>
                    <div>
                        <span class="lab-p">País / Provincia (*)</span>
                        <div class="box-s">
                            <input type="text" class="inp-p" v-model="paxs.pax.origin" maxlength="16">
                        </div>
                    </div>
                </div>
                <div class="py-4">
                    <span class="tit-1">Grupo</span>
                </div>
                <div class="space-y-2">
                    <div v-for="(pax, index) in paxs.pax.group" :key="index">
                        <div class="grid grid-cols-6 gap-x-2 items-end">
                            <div class="col-span-3">
                                <span class="lab-p" v-if="index == 0">Nombres</span>
                                <div class="flex items-center box-s">
                                    <input type="text" class="inp-p" v-model="pax.name" maxlength="16">
                                    <span class="lab-s">{{ index + 2 }}</span>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label class="block mb-0.5 py-1">
                                    <input type="checkbox" class="inp-cb text-sky-400" v-model="pax.id" :true-value="2" :false-value="1">
                                    <span class="lab-p inline">Niño (50%)</span>
                                </label>
                            </div>
                            <div class="col-span-1 justify-self-end" v-if="!paxs.pax._id">
                                <button class="btn-sq" @click="removePax(index)">
                                    <MinusIcon class="icon-54"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between" v-if="paxs.pax.group.length < 6 && !paxs.pax._id">
                        <div>
                            <span class="lab-s">Añadir pasajero...</span>
                        </div>
                        <div>
                            <button class="btn-sq group" @click="addPax">
                                <PlusIcon class="icon-54 group-hover:text-slate-500"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="py-4">
                    <span class="tit-1">Extras</span>
                </div>
                <div class="space-y-2">
                    <div v-for="(veh, index) in paxs.pax.extras" :key="index">
                        <div class="grid grid-cols-10 gap-x-2 items-end">
                            <div class="col-span-5">
                                <span class="lab-p" v-if="index == 0">Descripción</span>
                                <div class="flex items-center box-s">
                                    <input type="text" class="inp-p" v-model="veh.desc" maxlength="16">
                                    <span class="lab-s">{{ index + 1 }}</span>
                                </div>
                            </div>
                            <div class="col-span-4">
                                <span class="lab-p" v-if="index == 0">Categoría</span>
                                <div class="box-s">
                                    <select class="inp-p" v-model="veh.id">
                                        <option v-for="veh in config.extras" :key="veh.id" :value="veh.id">
                                            <span>{{ veh.alias }}</span>
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-span-1 justify-self-end" v-if="!paxs.pax._id">
                                <button class="btn-sq" @click="removeVeh(index)">
                                    <MinusIcon class="icon-54"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between" v-if="paxs.pax.extras.length < 2 && !paxs.pax._id">
                        <div>
                            <span class="lab-s">Añadir vehículo...</span>
                        </div>
                        <div>
                            <button class="btn-sq group" @click="addVeh">
                                <PlusIcon class="icon-54 group-hover:text-slate-500"/>
                            </button>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="py-4" v-if="paxs.pax.status">
            <button class="btn-p c-rose-1" @dblclick="checkDebt" v-if="paxs.pax._id">
                <span>Check Out</span>
            </button>
            <button class="btn-p c-sky-1" @click="next" v-else>
                <span>Check In</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'

import { store as paxs } from '@/store/paxs'
import { store as config } from '@/store/config'

import { debt } from '@/helper/func'
import app from '@/app'

const addPax = () => paxs.pax.group.length < 6 ? paxs.pax.group.push({ id: 1, name: '' }) : null
const removePax = (index) => paxs.pax.group.splice(index, 1)

const addVeh = () => paxs.pax.extras.length < 2 ? paxs.pax.extras.push({ id: 1, desc: '' }) : null
const removeVeh = (index) => paxs.pax.extras.splice(index, 1)

const emit = defineEmits(['next'])

const next = () => emit('next')

const checkDebt = () => debt(paxs.pax).inAmount > 0 ? app.flash(3) : checkOut()

const checkOut = async () => {
    const data = await paxs.update({ status: 0, checkout: Date.now() })
    if (data) {
        paxs.read()
        paxs.reset()
    }
}
</script>

<style scoped>
::-webkit-scrollbar {
    @apply hidden;
}
</style>