import { defineStore } from 'pinia'


export const userInfo = defineStore('user', {
    // 其他配置...
    state: () => ({
        name: 'hello',
        avatar: ''
    }),
    //类似state的计算属性
    getters: {
        fullname: (state) => {
            state.name + "full"
        }
    },
    actions: {

    }
})


export default userInfo