import { defineStore } from 'pinia'

export const userInfo = defineStore('user', {
    // 其他配置...
    state: () => ({
        name: '',
        avatar: '',
        saying: ['清风朗月', '辄思玄度']
    }),
    //类似state的计算属性
    getters: {

    },
    actions: {

    }
})


export default userInfo