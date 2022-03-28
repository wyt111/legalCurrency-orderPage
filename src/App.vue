<template>
  <div id="App">
    <Header ref="headerRef" v-if="navigationBarState"/>

    <language v-show="languageView"/>

    <router-view class="content" v-show="!languageView" ref="routerRef"/>

    <div class="comeFrom">
      <div class="comeFrom_text">Powered By</div>
      <div class="comeFrom_logo"><img src="@/assets/achLogo.png" /></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/navigationBar';
import language from '@/components/language';
import i18n from "@/utils/i18n";

export default {
  name: 'App',
  components: { Header, language },
  data(){
    return{
      languageView: false,
      navigationBarState: true,
    }
  },
  mounted(){
    //Vuex store data
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
    //language
    i18n.locale = this.$store.state.language
  },
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
  font-size: 0.14rem;
  .content{
    flex: 1;
    overflow: auto;
  }
  .comeFrom {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.21rem 0;
    .comeFrom_text {
      font-size: 0.12rem;
      font-family: Jost-Regular, Jost;
      font-weight: 400;
      color: #000000;
    }
    .comeFrom_logo {
      display: flex;
      margin-left: 0.1rem;
      img {
        height: 0.16rem;
      }
    }
  }
}
</style>
