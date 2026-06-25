import Axios from 'axios';

let auth = {};
let path = '';

function isEmpty(object) {
  return Object.keys(object).length == 0;
}

export default {
  setAuth(nameLocalStorage = '') {
    if (nameLocalStorage == '') {
      auth = {};
      return;
    }
    auth = {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem(nameLocalStorage) == null
            ? ''
            : localStorage.getItem(nameLocalStorage).replace(/"/g, '')
        }`,
      },
    };
  },
  setPathBase: function (pathBase, prefix = '') {
    path = `${pathBase}/${prefix ? prefix : ''}`;
  },
  get: function (url) {
    return Axios.get(`${path}${url}`, !isEmpty(auth) ? auth : undefined);
  },
  getBlob: function (url) {
    if (!isEmpty(auth)) {
      auth.responseType = 'blob';
      return Axios.get(`${path}${url}`, auth);
    }
    return Axios.get(`${path}${url}`, {
      responseType: 'blob',
    });
  },
  post: function (url, obj) {
    return Axios.post(
      `${path}${url}`,
      JSON.parse(JSON.stringify(obj)),
      !isEmpty(auth) ? auth : undefined,
    );
  },
  postBlob: function (url, obj) {
    if (!isEmpty(auth)) {
      auth.responseType = 'blob';
      return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)), auth);
    }
    return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)), {
      responseType: 'blob',
    });
  },
  postStr: function (url, str) {
    return Axios.post(
      `${path}${url}`,
      str,
      {
        headers: {
          'Content-Type': 'text/plain',
        },
      },
      !isEmpty(auth) ? auth : undefined,
    );
  },
  delete: function (url, obj) {
    return Axios.delete(
      `${path}${url}/${obj.id}`,
      !isEmpty(auth) ? auth : undefined,
    );
  },
  put: function (url, obj) {
    return Axios.put(
      `${path}${url}/${obj.id}`,
      JSON.parse(JSON.stringify(obj)),
      !isEmpty(auth) ? auth : undefined,
    );
  },
  postFile: function (url, formData) {
    return Axios.post(
      `${path}${url}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
      !isEmpty(auth) ? auth : undefined,
    );
  },
};
