<template>
    <TransitionRoot :show="open" as="template">
        <Dialog class="base" as="div" @close="close">
            <TransitionChild enter-from="tst-1" leave-to="tst-1" enter="duration-75" leave="duration-200" as="template">
                <div class="fixed inset-0 bg-slate-400/50"></div>
            </TransitionChild>
            <div class="fixed inset-0">
                <TransitionChild enter-from="tst-2" leave-to="tst-2" enter="duration-150" leave="duration-200" as="template">
                    <DialogPanel class="mx-auto mt-24 box-p w-fit shadow-slate-400/50">
                        <slot></slot>
                    </DialogPanel>
                </TransitionChild>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
import { watch } from 'vue'

const props = defineProps({
    open: {
        type: Boolean,
        required: true
    }
})

const emit = defineEmits(['close', 'open'])

const close = () => emit('close')

watch(props, () => props.open ? emit('open') : null)
</script>