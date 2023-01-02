import { reactive } from 'vue'

const app = reactive({
    message: {
        id: 1,
        show: false,
        showTime: 1500
    },
    flash(id) {
        this.message.id = id
        this.message.show = true
        this.message.showTime = id == (1 || 2) ? 1500 : 3000
    }
})

export default app