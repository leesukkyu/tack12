import axios from 'axios'
import humps from 'humps'

const http = axios.create()

// 요청 인터셉터 추가
http.interceptors.request.use(
    function (config) {
        // 요청을 보내기 전에 수행할 일
        // ...
        return config
    },
    function (error) {
        // 오류 요청을 보내기전 수행할 일
        // ...
        return Promise.reject(error)
    },
)

// 응답 인터셉터 추가
http.interceptors.response.use(
    function (response) {
        response.data = humps.camelizeKeys(response.data)
        return response
    },
    function (error) {
        // 오류 응답을 처리
        // ...
        return Promise.reject(error)
    },
)

export default http
