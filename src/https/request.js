import axios from 'axios';
import store from '@/store';

const service = axios.create({ baseURL: '/api', timeout: 30000 });

// 请求前
service.interceptors.request.use(
  (config) => {
    // 设置token
    if (store.getters.studyId) {
      config.headers.token = store.getters.token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应
service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const { code } = response.data;
      if (code === '10000') {
        return Promise.resolve(response);
      }
      if (['20004', '10010'].includes(code)) {
        // 当一个页面调用多个接口的时候 这个地方就会出现多次messageBox
        console.log('20004', '10010');
      } else if (['10501'].includes(code)) {
        console.log(10501);
      } else if (['10500', '10002'].includes(code)) {
        console.log('10500', '10002');
      }
      return Promise.reject(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    // 在本地调试的时候新增判断只能本地使用
    if (error.response) {
      console.log('error', error.response);
    } else {
      console.log('其他异常', error);
      // const isTimeout = error.message.includes('timeout');
      // message.error(isTimeout ? '请求超时，请检查网络是否连接正常' : '请求失败');
    }
    return Promise.reject(error.response);
  },
);

export function get(url, params, musuiType = 'recruiting') {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params }, { musuiType })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function post(url, params, musuiType = 'recruiting', reset) {
  return new Promise((resolve, reject) => {
    if (reset) {
      url = `${url}?${new URLSearchParams(params).toString()}`;
      params = {};
    }
    service
      .post(url, params, { musuiType })
      .then((res) => {
        if (res.data.code === '10000') {
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      })
      .catch((err) => {
        if (err.data.code !== '20004') {
          reject(err.data);
        }
      });
  });
}
