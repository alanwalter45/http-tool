import Axios from 'axios';

let path = '';

export default {
	getAuth(nameLocalStorage) {
		return {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(nameLocalStorage) == null
					? ''
					: localStorage.getItem(nameLocalStorage).replace(/"/g, '')}`
			}
		};
	},
	pathBase: function (pathBase) {
		path = pathBase + '/api';
	},
	get: function (url, auth) {
		if (auth) {
			return Axios.get(`${path}${url}`, auth);
		}
		return Axios.get(`${path}${url}`);
	},
	getBlob: function (url, auth) {
		if (auth) {
			auth.responseType = 'blob';
			return Axios.get(`${path}${url}`, auth);
		}
		return Axios.get(`${path}${url}`, {
			responseType: 'blob'
		});
	},
	post: function (url, obj, auth) {
		if (auth) {
			return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)), auth);
		}
		return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)));
	},
	postBlob: function (url, obj, auth) {
		if (auth) {
			auth.responseType = 'blob';
			return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)), auth);
		}
		return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)), { responseType: 'blob' });
	},
	postStr: function (url, str, auth) {
		if (auth) {
			return Axios.post(
				`${path}${url}`,
				str,
				{
					headers: {
						'Content-Type': 'text/plain'
					}
				},
				auth
			);
		}
		return Axios.post(`${path}${url}`, str, {
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	},
	delete: function (url, obj, auth) {
		if (auth) {
			return Axios.delete(`${path}${url}/${obj.id}`, auth);
		}
		return Axios.delete(`${path}${url}/${obj.id}`);
	},
	put: function (url, obj, auth) {
		if (auth) {
			return Axios.put(`${path}${url}/${obj.id}`, JSON.parse(JSON.stringify(obj)), auth);
		}
		return Axios.put(`${path}${url}/${obj.id}`, JSON.parse(JSON.stringify(obj)));
	},
	postFile: function (url, formData, auth) {
		if (auth) {
			return Axios.post(
				`${path}${url}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				},
				auth
			);
		}
		return Axios.post(`${path}${url}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}
};
