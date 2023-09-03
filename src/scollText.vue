要实现 Vue 中的广告通知栏由下往上滚动的效果，您可以借助 CSS 动画和 Vue 的过渡效果来实现。以下是一个示例代码：

```html
<template>
  <div class="ad-container">
    <transition-group name="slide-up" tag="ul">
      <!-- 使用 v-for 遍历广告通知列表 -->
      <li v-for="(ad, index) in adList" :key="index" class="ad-item">
        {{ ad }}
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      adList: [
        '这是第一条广告通知',
        '这是第二条广告通知',
        '这是第三条广告通知',
        '这是第四条广告通知'
      ]
    };
  }
};
</script>

<style>
.ad-container {
  height: 200px; /* 设置容器高度 */
  overflow: hidden; /* 隐藏溢出内容 */
}

.ad-item {
  line-height: 30px; /* 设置每条通知的行高 */
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.5s;
}

.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(30px); /* 设置初始位置，向下偏移一个通知的高度 */
}
</style>