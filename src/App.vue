<template>
  <div id="App">
    <Header/>
    <router-view class="content" ref="routerRef"/>
  </div>
</template>

<script>
import Header from '@/components/navigationBar';
export default {
  name: 'App',
  components: { Header }
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
#app,#App,html,body{
  width: 100%;
  height: 100%;
}
#App{
  display: flex;
  flex-direction: column;
  .content{
    flex: 1;
    overflow: auto;
  }
}
</style>
