import Login from '@/views/Login.vue'
import Layout from '@/views/Layout.vue'
import Camping from '@/views/Camping.vue'
import Cash from '@/views/Cash.vue'
import Users from '@/views/Users.vue'
import Report from '@/views/Report.vue'

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '/',
                component: Camping
            },
            {
                path: '/cash',
                component: Cash,
                meta: { admin: true }
            },
            {
                path: '/users',
                component: Users,
                meta: { admin: true }
            }
        ]
    },
    {
        path: '/report',
        component: Report
    }
]

export default routes