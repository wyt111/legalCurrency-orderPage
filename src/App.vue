<template>
  <div id="App" v-title data-title="Alchemy Pay" style=" background: url('@/assets/background.png') no-repeat;background-size: 100% 700px;">
    <Header class="none" ref="headerRef" v-if="navigationBarState"/>
    <div class="title1" v-if="this.$route.meta.isTitle">
        <div v-show="logoDta.logo">
          <img :src="logoDta.logo" alt=""/>
          <p>{{ logoDta.merchantName }}</p>
        </div>
        <div style="display:flex;">
          <h2>{{ this.$route.meta.title }}<span style="margin-left:6px" v-if="this.$route.path==='/paymentDetails'">{{ this.$store.state.payentAmite }}</span></h2><img v-show="this.$route.path==='/binancePayment'" src="./assets/Binance.svg" alt="" style="width:130px;height:25px;margin:0 10px 0 10px"/><h2 v-show="this.$route.path==='/binancePayment'">PAY</h2>
        </div>
        <img src="./assets/goBack.png" alt="" class="goBack" @click="goBack" v-show="['binancePayment','paymentDetails','paymentEmail','paymentPrompt'].includes(this.$route.name)">
    </div>
    <div class="title2" v-else >
      <img src="./assets/logoEmail.png"  alt="" v-show="this.$route.path==='/loadingStatus'?false:true">
    </div>
    
    <language v-show="languageView"/>
    <router-view class="content"  ref="routerRef" v-show="isShow2"/>
   
    
    <div class="comeFrom" v-if="this.$route.meta.isShow">
      <div class="comeFrom_text">Powered by</div>
      <div class="comeFrom_logo"><img src="@/assets/achLogo.png" /></div>
      <div class="searchLanguage1" @click="languageView=!languageView" v-show="this.$route.meta.isShow">
        <p :class="languageView?'text active1':'text'">{{ this.$store.state.languageName.toUpperCase() }}</p>
        <p class="icon"><img :src="languageView?ImgSrc1:ImgSrc2"></p>
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
      ImgSrc1:require('@/assets/rightJ.png'),
      ImgSrc2:require('@/assets/downIcon.png'),
      isShow2:true,
      logoDta:''
    }
  },
  methods:{
    goBack(){
      if(this.languageView === false && (this.$route.path === '/paymentDetails' && this.$store.state.binancePayment === 'payList')||
          (this.$route.path === '/binancePayment' && this.$store.state.binancePayment === 'payList')){
            if(this.$route.path === '/paymentDetails'&&this.$store.state.paymentEmail!=='' && this.$store.state.isTips.isEmail!==1){
              
              this.$router.replace('/paymentSelect')
              return
            }
            this.$router.go(-1)
          return;
      }
      if((this.$route.path==='/paymentEmail'&&this.$store.state.paymentEmail==='')){
           this.$router.replace('/paymentSelect')
            return
          }
    // if((this.$route.path==='/paymentDetails'&&this.$store.state.paymentEmail==='')){
    //   console.log(this.$store.state.isTips.isEmail);
    //   this.$router.replace('/paymentSelect')
    //   return
    // }
      
      if(this.languageView === true){
        this.languageView = false;
        return;
      }
      window.location.href = `${this.$store.state.cancelTo}`
    }
  },
  computed:{
    //resize
    hideSchange(){
      let obj =  {languageView:this.languageView,isShow1: document.body.clientWidth || document.documentElement.clientWidth,}
      return obj
      
    }
  },
  watch:{
    //resize
    hideSchange:{
      immediate:true,
      deep:true,
      handler(newVal){
        if(newVal.isShow1<769 && newVal.languageView){
          this.isShow2 = false
        }else if(newVal.isShow1<769 && newVal.languageView===false){
            this.isShow2 = true
        }else if(newVal.isShow1>769 && newVal.languageView){
          this.isShow2 = true
        }else if(newVal.isShow1>769 && newVal.languageView === false){
          this.isShow2 = true
        }
      }
    },
    //Listen for route changes plus ID and push Locale
    '$route':{
      // immediate:true,
      deep:true,
      handler(to,from){
        from
        let result = this.$store.state.binancePayment_locale
        this.$router.push({
          path:to.path,
          query:{
            id:(to.path==='/loadingStatus'||to.path==='/overPaymentEmail'||to.path==='/refundLoading')&&to.query.id?to.query.id:localStorage.getItem('sysOrderNum'),
            locale:to.query.locale?to.query.locale:result
          }
        })
      }
    },
    // Address bar parameters
    '$store.state.languageValue':{
      // immediate:true,
      handler(newVal,oldVal){
        let query = this.$router.history.current.query
          let path = this.$router.history.current.path
          let newQuery = JSON.parse(JSON.stringify(query));
        if((newVal !== oldVal) && (path!=='/overPaymentEmail' || path!== '/refundLoading')){
           newQuery.locale = newVal
          this.$router.push({ path, query: newQuery });
        }else{
          newQuery.locale = ''
          this.$router.push({ path, query: newQuery });
        }
      }
    }

  },
  mounted(){
    // console.log(this.$store.state.);
    //Vuex store data
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
    //language
    i18n.locale = this.$store.state.languageValue
    //reSize
    window.addEventListener('resize',()=>{
      let width1 = document.body.clientWidth || document.documentElement.clientWidth
      if(width1>769){
        this.languageView = false
      }else if(width1<769 && this.languageView){
        this.languageView = false
      }
    })
   //Merchants logo

       if((this.$route.path!=='/loadingStatus'|| this.$route.path!=='/overPaymentEmail'|| this.$route.path!=='/refundLoading' )&& !this.logoDta ){
            let id  = setInterval(()=>{
              let _width1 = document.body.clientWidth || document.documentElement.clientWidth
              if(_width1 > 769){
                 let params = {
                "merchantCode":this.$store.state.merchantCode
              }
              this.$axios.post(this.$api.post_payList,params).then(res=>{
                if(res && res.data){
                  this.logoDta = res.data
                  if(this.logoDta || this.$store.state.merchantCode){
                    clearInterval(id)
                  }
                }else if(this.$route.path==='/overPaymentEmail'|| this.$route.path==='/refundLoading'){
                  clearInterval(id)
                }
              })
              }else{
                clearInterval(id)
              }
            
           },1000)
        
       }
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
  padding-top: 10px;
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
    margin: 20px auto 0;
    position: relative;
    font-family: Jost-Regular, Jost;
    div{
      display: flex;
     align-items: center;
     justify-content: center;
     
      img{
      width: 40px;
      height: 40px;
      margin-right: 40px;
      
    }
    p{
      font-size: 20px;
      margin-left: -20px;
    }
    }
    >img:nth-of-type(1){
      width: 80px;
      height: 30px;
      position: absolute;
      left: -150px;
      top: 40px;
      cursor: pointer;
    }
    h2{
      font-size: 18px;
      font-family: Jost-Regular, Jost;
      font-weight: 600;
      color: #0c0707;
      line-height: 35px;
      margin:10px 0 10px 0;
    }
  }
  .content{
    background: #fff;
    flex: 1;
    overflow: auto;
  }
  .content::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    overflow-y: scroll;
}
.content::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius:0 15px 15px 0;
}
.content::-webkit-scrollbar-track {
    background: #F3F4F5FF ;
}
  .comeFrom {
    width: 400px;
    // margin:30px auto 0;
    padding: 0 30px 0 40px;
    margin: 10px auto;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .comeFrom_text {
      line-height: 40px;
      font-size: 20px;
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
      padding-top: 2px;
      img{
        width: 14px;
      }
    }
  }
  .searchLanguage1 .active1{
    color: #4479D9FF !important;
  }
}
@media screen and (max-width:1280px) {
  #App{
    // background: url('https://b.zol-img.com.cn/desk/bizhi/image/10/960x600/1598319721647.jpg') no-repeat;
    // background-size: 100%;
  // padding-top: 100px;
  padding-bottom: 10px;
  font-size: 16px;
  position: relative;
  .content::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    overflow-y: scroll;
}
.content::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius:0 15px 15px 0;
}
.content::-webkit-scrollbar-track {
    background: #F3F4F5FF ;
}
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
    // width: 400px;
    text-align: center;
    margin: 0 auto;

    div{
      display: flex;
     align-items: center;
     justify-content: center;
      img{
      width: 40px;
      height: 40px;
      margin-right: 40px;
    }
    p{
      font-size: 20px;
      margin-left: -20px;
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
      font-size: 18px;
      font-family: Jost-SemiBold, Jost;
      font-weight: 400;
      color: #000000;
      line-height: 35px;
      margin:10px 0 10px 0;
    }
  }
  .content{
    flex: 1;
    overflow: auto;
  }
  .comeFrom {
    width: 400px;
    margin:10px auto 0;
    padding: 0 30px 0 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .comeFrom_text {
      line-height: 40px;
      font-size: 20px;
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
      padding-top: 2px;
      img{
        width: 14px;
      }
    }
  }
  .searchLanguage1 .active1{
    color: #4479D9FF !important;
  }
}
}

@media screen and (max-width:768px){
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
  padding: 0 0 .1rem 0;
  // background: url('https://b.zol-img.com.cn/desk/bizhi/image/10/960x600/1598319721647.jpg') no-repeat;
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
    background: #fff;
    flex: 1;
    overflow-y: none;

  }
  .content::-webkit-scrollbar {
    width: 0px;
    height: 0px;
    overflow-y: scroll;
}
.content::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius:0 15px 15px 0;
}
.content::-webkit-scrollbar-track {
    background: #F3F4F5FF ;
}
  .comeFrom {
    width: 100%;
    height: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff ;
    margin: 0 auto;
    .none2{
      width: 0;
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
        height: 0.17rem;
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
