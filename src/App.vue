<template>
  <div id="App">
    <Header class="none" ref="headerRef" v-if="navigationBarState"/>
    <div class="title1" v-if="this.$route.meta.isTitle">
        <div>
          <img :src="this.$store.state.resultData.qrIcon" alt="">
          <p>{{ this.$store.state.resultData.mchName }}</p>
        </div>
        <h2>{{ this.$route.meta.title }}</h2>
        <img src="./assets/goBack.png" alt="" class="goBack" @click="goBack" v-show="['binancePayment','paymentDetails','paymentEmail','paymentPrompt'].includes(this.$route.name)">
    </div>
    <div class="title2" v-else>
      <img src="./assets/logoEmail.png" alt="">
    </div>
    <language v-show="languageView"/>

    <router-view class="content"  ref="routerRef"/>
    
    <div class="comeFrom" v-if="this.$route.meta.isShow">
      <div class="comeFrom_text">Powered By</div>
      <div class="comeFrom_logo"><img src="@/assets/achLogo.png" /></div>
      <div class="searchLanguage1" @click="Language">
        <p class="text">{{ this.$store.state.languageName }}</p>
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
  methods:{
    Language(){
      this.languageView = !this.languageView
      let Button = document.querySelector('.text')
      if(this.languageView)
      Button.className = 'active text'
      else
      Button.style.className = 'text'
    },
    goBack(){
      if(this.languageView === false && (this.$route.path === '/paymentDetails' && this.$store.state.binancePayment === 'payList')||
          (this.$route.path === '/binancePayment' && this.$store.state.binancePayment === 'payList')){
        this.$router.go(-1);
        return;
      }
      if(this.languageView === true){
        this.languageView = false;
        return;
      }
      window.location.href = `${this.$store.state.cancelTo}`
    },
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
    i18n.locale = this.$store.state.languageValue
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
.active{
  color: #4479D9FF;
}
#App{
  padding-top: 90px;
  padding-bottom: 40px;
  font-size: 16px;
  position: relative;
  .none{
    display: none;
  }
  .title2{
    width: 100%;
    text-align: center;
    img{
      width: 250px;
      height: 50px;
    }
  }
  .title1{
    width: 400px;
    text-align: center;
    margin: 0 auto;
    position: relative;
    div{
      display: flex;
     align-items: center;
     justify-content: center;
      img{
      width: 60px;
      height: 50px;
      margin-right: 40px;
    }
    p{
      font-size: 36px;
    }
    }
    >img:nth-of-type(1){
      width: 80px;
      height: 30px;
      position: absolute;
      left: -150px;
      bottom: 0;
      cursor: pointer;
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
  .searchLanguage1{
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
  .title2{
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
    background: #fff ;
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
.searchLanguage1{
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
