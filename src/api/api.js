import request from "@/api/request.js"

//登录
export const login = (data) => {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

//注册
export const register = (data) => {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}

//新增文章
export const addArticle = (data) => {
    return request({
        url: '/addArticle',
        method: 'post',
        data
    })
}

//编辑文章

export const searchArticle = (data) => {
    return request({
        url: '/searchArticle',
        method: 'post',
        data
    })
}

//获取文章
export const getArticleList = (data) => {
    return request({
        url: `/getArticleList`,
        method: 'post',
        data
    })
}

//获取文章详情
export const getArticleDetail = (id) => {
    return request({
        url: `/getArticleDetail?id=${id}`,
        method: 'get',
    })
}

//获取最近更新se
export const getArticleListSe = () => {
    return request({
        url: `/getArticleListSe`,
        method: 'get',
    })
}

//新增分类
export const addCategory = (data) => {
    return request({
        url: `/addCategory`,
        method: 'post',
        data
    })
}

//删除分类
export const delCategory = (data) => {
    return request({
        url: `/delCategory`,
        method: 'post',
        data
    })
}
//获取分类
export const getCategoryList = () => {
    return request({
        url: `/getCategoryList`,
        method: 'get',

    })
}
//根据id获取分类文章极其数量
export const getCategoryNum = () => {
    return request({
        url: `/getCategoryNum`,
        method: 'post',
    })
}

//获取全部标签
export const getTagsList = () => {
    return request({
        url: `/getTagsList`,
        method: 'get',
    })
}

//获取个人文章的时间轴
export const getArticleTimeLine = () => {
    return request({
        url: `/getArticleTimeLine`,
        method: 'get',
    })
}


