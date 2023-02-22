# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
##  node的版本号:16.11
##  sass的版本号:
             node-sass@6.0.1
             sass-loader@10.2.0
             
使用一个对象绑定多个 prop#
如果你想要将一个对象的所有属性都当作 props 传入，你可以使用没有参数的 v-bind，即只使用 v-bind 而非 :prop-name。例如，这里有一个 post 对象：

js
const post = {
  id: 1,
  title: 'My Journey with Vue'
}
以及下面的模板：

template
<BlogPost v-bind="post" />