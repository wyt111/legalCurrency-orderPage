<template>
  <div class="navigation" v-if="this.$route.meta.isShow">
      <p class="navigation-icon" v-if="routerNameState"><img class="backF" src="@/assets/leftIcon.svg" @click="goBack"/></p>
    <p class="routerName" v-if="routerNameState">{{ routerName }}</p>
    <div class="searchLanguage" @click="openLanguage" v-if="languageState">
      <p class="text">{{ this.$store.state.languageName }}</p>
      <p class="icon"><img src="@/assets/downIcon.png"></p>
    </div>
  </div>
  <div class="logo" v-else>
        <img src="../assets/achLogo.png" alt="">
    </div>

</template>

<script>
export default {
  name: "navigationBar",
  data(){
    return{
      languageState: true,
      routerName: "",
      routerNameState: true,
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(to){
        //The result page does not display the title
        this.languageState = to.path === "/language" ? false : true;
        this.routerNameState = to.path === '/overpayment' ? false : true;
        this.languageState = to.path === '/binancePayment' ? false : true;
        //The payment currency is displayed in the payment header on the chain
        if(to.path === '/paymentDetails'){
          this.routerName = to.meta.title + ' ' + this.$store.state.paymentType.currencyCode;
          return;
        }
        this.routerName = to.meta.title;
      }
    },
  },
  methods: {
    openLanguage(){
      if(this.$parent.languageView === false){
        this.$parent.languageView = true;
        this.routerName = "Change Language";
        return;
      }
      this.$parent.languageView = false;
      if(this.$route.path === '/paymentDetails') {
        this.routerName = this.$route.meta.title + ' ' + this.$store.state.paymentType.currencyCode;
      }
    },
    goBack(){
      if(this.$parent.languageView === false && (this.$route.path === '/paymentDetails' && this.$store.state.binancePayment === 'payList')||
          (this.$route.path === '/binancePayment' && this.$store.state.binancePayment === 'payList')){
        this.$router.go(-1);
        return;
      }
      if(this.$parent.languageView === true){
        this.$parent.languageView = false;
        return;
      }
      window.location.href = `${this.$store.state.cancelTo}`
    },
  }
}
</script>

<style lang="scss" scoped>
.logo{
  width: 100%;
  height: 44px;
  background: #4479D9;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 110px;
    height: 23px;
  }
}
.navigation {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  display: none;
  .backF {
    width: 18px;
  }
  .navigation-icon{
    display: flex;
  }
  .routerName{
    font-size: 18px;
    font-family: Jost-SemiBold, Jost;
    font-weight: 600;
    color: #000000;
    line-height: 0.21rem;
    margin-left: 0.2rem;
    margin-top: -0.01rem;
    display: none;
  }
  .searc
