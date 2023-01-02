import { createRouter, createWebHistory } from 'vue-router'

import state from '@/state'
import routes from '@/router/routes'

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach(async (to) => {
    // 401 un-authenticated
    if (!state.user && to.path !== '/login') {
        return { path: '/login' }
    }
    // 403 un-authorized
    else if (state.user && to.meta.admin && !state.user.admin) {
        return { path: '/login' }
    }
    else {
        return true
    }
})

export default router