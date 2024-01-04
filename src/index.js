// import { join } from 'lodash'
import { a } from './home.js';
import img1Src from './assets/images/1.jpg';

console.log(a);
console.log(a);
console.log('改动1');

const aaa = [1, 2, 3, 4];
aaa.mvp((v) => {
  console.log(v);
});

export function sayHello(name) {
  console.log(name);
}
export function component() {
  // lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的

  return import('lodash')
    .then(({ default: _ }) => {
      const element = document.createElement('div');
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    })
    .catch((error) => 'An error occured while loading the component');
}

var appDom = document.getElementById('app');
const img = new Image();
img.src = img1Src;
appDom.appendChild(img);

// document.body.appendChild(component());
// https://webpack.docschina.org/configuration/output/#outputlibrarytarget

if (module.hot) {
  // 参数1： 开启HMR的模块路径
  // 参数2; 在更新完对应模块后，需要执行的回调函数
  module.hot.accept('./index.js', () => console.log('math 模块发送了更新'));
  module.hot.accept('./home.js', () => console.log('foo 模块发送了更新'));
}
