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
	pathBase: function(pathBase) {
		path = pathBase + '/api';
	},
	get: function(url, hasAuth) {
		if (hasAuth) {
			return Axios.get(`${path}${url}`, getAuth());
		}
		return Axios.get(`${path}${url}`);
	},
	post: function(url, obj, hasAuth) {
		if (hasAuth) {
			return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)), getAuth());
		}
		return Axios.post(`${path}${url}`, JSON.parse(JSON.stringify(obj)));
	},
	postStr: function(url, str, hasAuth) {
		if (hasAuth) {
			return Axios.post(
				`${path}${url}`,
				str,
				{
					headers: {
						'Content-Type': 'text/plain'
					}
				},
				getAuth()
			);
		}
		return Axios.post(`${path}${url}`, str, {
			headers: {
				'Content-Type': 'text/plain'
			}
		});
	},
	delete: function(url, obj, hasAuth) {
		if (hasAuth) {
			return Axios.delete(`${path}${url}/${obj.id}`, getAuth());
		}
		return Axios.delete(`${path}${url}/${obj.id}`);
	},
	put: function(url, obj, hasAuth) {
		if (hasAuth) {
			return Axios.put(`${path}${url}/${obj.id}`, JSON.parse(JSON.stringify(obj)), auth);
		}
		return Axios.put(`${path}${url}/${obj.id}`, JSON.parse(JSON.stringify(obj)));
	},
	postFile: function(url, formData, hasAuth) {
		if (hasAuth) {
			return Axios.post(
				`${path}${url}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				},
				getAuth()
			);
		}
		return Axios.post(`${path}${url}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		});
	}
};
