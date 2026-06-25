# http AXIOS Tools

Utilizar peticiones con axios.

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

- helper http
- verify Token for guard vueJs

```js
import http from '@alanwalter45/tool/http';

http.setPathBase('http://localhost:3000');

http.get('/is-alive').then((value) => {
  console.log(value);
});
``