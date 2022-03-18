<template>
  <router-view ref="routerRef"/>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
@font-face {
  font-family: Jost-Regular;
  src: url('./assets/Jost-Regular.ttf');
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app,html,body{
  width: 100%;
  height: 100%;
}
#app{
  display: flex;
  flex-direction: column;
  .content{
    flex: 1;
    overflow: auto;
  }
}
</style>
