<template>
    <div class="flex flex-col w-72 px-6">
        <div class="flex items-center justify-between py-4">
            <span class="tit-1">Pago</span>
            <span class="lab-s">#{{ pays.pay._id ? pays.pay.created : 'nuevo' }}</span>
        </div>
        <div class="grow">
            <fieldset :disabled="!paxs.pax.status || pays.pay._id">
                <div class="space-y-2">
                    <div>
                        <span class="lab-p">Concepto</span>
                        <div class="box-s">
                            <select class="inp-p" v-model="pays.pay.service">
                                <option v-for="service in config.services" :key="service.id" :value="service.id">
                                    <span>{{ service.alias }}</span>
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <span class="lab-p">Método</span>
                        <div class="box-s">
                            <select class="inp-p" v-model="pays.pay.method">
                                <option v-for="method in config.methods" :key="method.id" :value="method.id">
                                    <span>{{ method.alias }}</span>
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <span class="lab-p">Importe</span>
                        <div class="flex items-center box-s">
                            <span class="lab-s">ARS$</span>
                            <input type="number" class="ml-2 inp-p" v-model.number="pays.pay.amount" :min="0" :max="100000" :step="100">
                        </div>
                    </div>
                    <div>
                        <span class="lab-p">Notas</span>
                        <div class="box-s">
                            <textarea class="inp-p resize-none" v-model="pays.pay.notes" :rows="2" :maxlength="80"></textarea>
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="py-4" v-if="paxs.pax.status">
            <button class="btn-p c-sky-1" @click="reset" v-if="pays.pay._id">
                <span>Nuevo</span>
            </button>
            <button class="btn-p c-green-1" @click="pay" v-else>
                <span>Pagar</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { store as pays } from '@/store/pays'
import { store as paxs } from '@/store/paxs'
import { store as config } from '@/store/config'

const reset = () => pays.reset()

const pay = async () => {
    const data = await pays.create()
    if (data) {
        pays.read()
        pays.reset()
    }
}
</script>