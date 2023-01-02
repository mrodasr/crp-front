import { reactive } from 'vue'

import { store as token } from '@/store/token'
import router from '@/router'

const state = reactive({
    user: null,
    initialize() {
        this.update()
    },
    update() {
        this.user = token.decode()
    },
    async login(user) {
        const attempt = await token.create(user)
        if (attempt) {
            this.update()
            router.push({ path: '/' })
        }
        else {
            router.go(0)
        }
    },
    logout() {
        token.delete()
        router.go(0)
    }
})

export default state