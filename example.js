import http from './http.js';

http.pathBase('http://localhost:3000');

http.get('/is-alive').then((value) => {
  console.log(value);
});