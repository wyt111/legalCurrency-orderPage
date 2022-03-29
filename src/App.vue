<template>
  <div id="App">
    <Header class="none" ref="headerRef" v-if="navigationBarState"/>
    <div class="title1">
        <img src="@/assets/achLogo.png" alt="">
        <h2>{{ this.$route.meta.title }}</h2>
    </div>

    <language v-show="languageView"/>

    <router-view class="content" v-show="!languageView" ref="routerRef"/>

    <div class="comeFrom" v-if="this.$route.meta.isShow">
      <div class="comeFrom_text">Powered By</div>
      <div class="comeFrom_logo"><img src="@/assets/achLogo.png" /></div>
      <div class="searchLanguage">
        <p class="text">{{ this.$store.state.language }}</p>
        <p class="icon"><img src="@/assets/downIcon.png"></p>
    </div>
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
#App{
  padding-bottom: 40px;
  font-size: 16px;
  .none{
    display: none;
  }
  .title1{
    text-align: center;
    img{
      width: 210px;
      height: 50px;
      margin-top: 50px;
    }
    h2{
      font-size: 24px;
      font-family: Jost-SemiBold, Jost;
      font-weight: 600;
      color: #000000;
      line-height: 35px;
      margin:20px 0 20px 0;
    }
  }
  .content{
    flex: 1;
    overflow: auto;
  }
  .comeFrom {
    width: 400px;
    margin:30px auto 0;
    display: flex;
    justify-content: space-between;
    .comeFrom_text {
      line-height: 40px;
      font-size: 24px;
      font-family: Jost-Regular, Jost;
      font-weight: 400;
      color: #000000;
    }
    .comeFrom_logo {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-left: 10px;
      img {
        width: 130px;
        height: 24px;
      }
    }
  }
  .searchLanguage{
    padding: 15px 0 0 0;
    opacity: 1;
    margin-left: auto;
    cursor: pointer;
    box-sizing: border-box;
    .text{
      text-align: center;
      color: #999999;
      font-size: 14px;
      font-weight: bold;
      margin-right: 10px;
      float: left;
    }
    .icon{
      float: left;
      display: flex;
      align-items: center;
      img{
        width: 14px;
      }
    }
  }
}
@media screen and (max-width:440px){
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
  padding: 0;
  .title1{
    display: none;
  }
  .none{
    display: flex;
  }
  .content{
    flex: 1;
    overflow-y: none;

  }
  .comeFrom {
    width: 100%;
    display: flex;
    justify-content: center;
    background: #fff;
    margin: 0;
    // padding: 0.21rem 0;
    .none2{
      display: none;
    }
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
        width: .8rem;
        height: 0.14rem;
      }
    }
  }
}
.searchLanguage{
    margin-left:auto;
    display: none;
    align-items: center;
    cursor: pointer;
    .text{
      text-align: center;
      color: #999999;
      font-size: 14px;
      font-weight: bold;
      margin-right: 10px;
    }
    .icon{
      display: flex;
      align-items: center;
      img{
        width: 14px;
      }
    }
  }
}

</style>
