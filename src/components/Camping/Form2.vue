<template>
    <DialogVue :open="open" @close="close" @open="addSiteInit">
        <div class="flex flex-col w-96 px-6">
            <div class="py-4">
                <span class="tit-1">Alojamiento</span>
            </div>
            <div class="grow overflow-y-auto">
                <fieldset :disabled="paxs.pax._id">
                    <div class="grid grid-cols-10 gap-x-2">
                        <div class="col-span-4">
                            <span class="lab-p">Tipo</span>
                            <div class="box-s">
                                <select class="inp-p" v-model="paxs.pax.accom">
                                    <option v-for="accom in config.accoms" :key="accom.id" :value="accom.id">
                                        <span>{{ accom.alias }}</span>
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="col-start-6 col-span-4">
                            <span class="lab-p">Retrasar check-in (*)</span>
                            <div class="relative box-s">
                                <input type="number" class="inp-p" v-model.number="subdays" :min="0" :max="7">
                                <span class="absolute left-6">días atrás</span>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <fieldset :disabled="!paxs.pax.status">
                    <div class="py-4">
                        <span class="tit-1">Ubicación</span>
                    </div>
                    <div class="space-y-2">
                        <div v-for="(site, index) in paxs.pax.location" :key="index">
                            <div class="grid grid-cols-10 gap-x-2 items-end">
                                <div class="col-span-4">
                                    <span class="lab-p" v-if="index == 0">Identificación</span>
                                    <div class="flex items-center box-s">
                                        <input type="text" class="inp-p" v-model="site.id" maxlength="4">
                                        <span class="lab-s">{{ index + 1 }}</span>
                                    </div>
                                </div>
                                <div class="col-span-5">
                                    <span class="lab-p" v-if="index == 0">Referencia</span>
                                    <div class="box-s">
                                        <input type="text" class="inp-p" v-model="site.ref" maxlength="16">
                                    </div>
                                </div>
                                <div class="col-span-1 justify-self-end" v-if="paxs.pax.status">
                                    <button class="btn-sq" @click="removeSite(index)">
                                        <MinusIcon class="icon-54"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center justify-between" v-if="paxs.pax.location.length < 4 && paxs.pax.status">
                            <div>
                                <span class="lab-s">Añadir sitio...</span>
                            </div>
                            <div>
                                <button class="btn-sq group" @click="addSite">
                                    <PlusIcon class="icon-54 group-hover:text-slate-500"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="py-4" v-if="paxs.pax.status">
                <button class="btn-p c-sky-1" @click="submit" v-if="paxs.pax._id">
                    <span>Enviar</span>
                </button>
                <button class="btn-p c-sky-1" @click="checkIn" v-else>
                    <span>Enviar</span>
                </button>
            </div>
            <div class="py-4" v-else></div>
        </div>
    </DialogVue>
</template>

<script setup>
import DialogVue from '@/components/Layout/Dialog.vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'

import { ref } from 'vue'
import { store as paxs } from '@/store/paxs'
import { store as config } from '@/store/config'
import { accom, status } from '@/helper/store'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const subdays = ref(0)

const emit = defineEmits(['close'])
const close = () => emit('close')

const addSite = () => paxs.pax.location.length < 4 ? paxs.pax.location.push({ id: '', ref: '' }) : null
const removeSite = (index) => paxs.pax.location.splice(index, 1)

const addSiteInit = () => paxs.pax.location.length ? null : addSite()

const submit = async () => {
    close()
    const data = await paxs.update({ location: paxs.pax.location })
    if (data) {
        paxs.read()
    }
}

const checkIn = async () => {
    close()
    const data = await paxs.create(subdays.value)
    if (data) {
        paxs.read()
        accom.value = config.accoms.find((accom) => accom.id == paxs.pax.accom)
        status.value = config.statuses[0]
        paxs.reset()
    }
}
</script>