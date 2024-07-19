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