import axios from 'axios'
import { message } from 'antd'
import router from 'umi/router';

axios.defaults.withCredentials = true
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://jsv1.xiaosk.com:8888'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
}

// request拦截器
axios.interceptors.request.use(
    config => {
        const token = '16215f29a5f874e9cff4eb0e3cd1c790'
        if (config.url.indexOf('platform-xiaosk/captcha') > 0 || config.url.indexOf('platform-xiaosk/sys/login') > 0) {
            // 不需要加token，做些别的操作
            console.log(`%c\ud83d\uDE80 reuqest ${config.method} `, 'background:#000;color:#b1dcff', config.url)
        } else {
            console.log(`%c\ud83d\uDE80 reuqest ${config.method} `, 'background:#000;color:#b1dcff', config.url)
            config.headers.token = token
        }

        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)
// response拦截器
axios.interceptors.response.use(
    response => {
        console.log('%c\ud83d\uDC4C 请求成功 ', 'background:#000;color:#a9ef87', response)

        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        const { data } = response;
        const { code, msg = '服务器发生错误' } = data;
        const text = msg || codeMessage[parseInt(code)];

        if (data.code !== '0000') {
            console.log('%c\ud83d\uDCA1 返回错误 ', 'background:#000;color:#f0f360', response.config.url)
            response.status = data.code;
            if (data === undefined || data.code === 'ECONNABORTED') {
                message.warning('服务请求超时');
                return data;
            }
            if (code === '400') {
                message.warning(text)
                localStorage.clear();
                router.push('/login');
                return data;
            }
            if (code === '401' || code === '403') {
                localStorage.clear();
                router.push('/login');

                return data;
            }

            message.error(`${code}:${text}`);
            return data;
        } else {
            return response.data;
        }
    },
    error => {
        console.log('%c\ud83d\uDD25 请求失败 api ', 'background:#000;color:#f7630c', error)
        // const {data} = error
        // const {url} = error.config
        // console.log('%c\ud83d\uDE80 api: ', 'background:#000;color:#b1dcff', url)
        // const { code, msg = '服务器发生错误' } = data
        // const text = codeMessage[parseInt(code)] || msg
        // return Promise.reject(error)
    }
)
