import request from "@/api/request.js"

//获取文章
export const getArticleList = (data) => {
    return request({
        url: `/api/getArticleList`,
        method: 'post',
        data
    })
}

//获取文章详情
export const getArticleDetail = (id) => {
    return request({
        url: `/api/getArticleDetail?id=${id}`,
        method: 'get',
    })
}

//时间轴
export const getArticleTimeLine = () => {
    return request({
        url: `/api/getArticleTimeLine`,
        method: 'get',
    })
}

//获取最近更新se
export const getArticleListSe = () => {
    return request({
        url: `/api/getArticleListSe`,
        method: 'get',
    })
}

//获取分类及数量
export const getCategoryNum = () => {
    return request({
        url: `/api/getCategoryNum`,
        method: 'post',
    })
}

//搜索文章
export const searchArticle = (data) => {
    return request({
        url: '/api/searchArticle',
        method: 'post',
        data
    })
}

//获取我的信息
export const getmyinfo = () => {
    return request({
        url: `/api/myinfo`,
        method: 'get',
    })
}

//根据分类id查询分类名称
export const getCategoryName = async (val) => {
    return request({
        url: `/api/getCategoryName?id=${val}`,
        method: 'get',
    })
}

//获取分类
export const getCategoryList = async (val) => {
    return request({
        url: `/api/getCategoryList`,
        method: 'get',
    })
}

//获取全部标签
export const getTagsList = () => {
    return request({
        url: `/api/getTagsList`,
        method: 'get',
    })
}

