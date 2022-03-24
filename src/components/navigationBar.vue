<template>
  <div class="navigation">
    <p class="navigation-icon"><img src="@/assets/leftIcon.svg" @click="goBack"/></p>
    <p class="routerName">{{ routerName }}</p>
    <div class="searchLanguage" @click="openLanguage" v-if="languageState">
      <p class="text">{{ this.$store.state.language }}</p>
      <p class="icon"><img src="@/assets/downIcon.png"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
  data(){
    return{
      languageState: true,
      routerName: "",
    }
  },
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(to){
        this.languageState = to.path === "/language" ? false : true;
        //The payment currency is displayed in the payment header on the chain
        if(to.path === '/paymentDetails'){
          this.routerName = to.name + ' ' + this.$store.state.paymentType.currencyCode;
          return;
        }
        this.routerName = to.name;
      }
    }
  },
  methods: {
    openLanguage(){
      if(this.$parent.languageView === false){
        this.$parent.languageView = true;
        this.routerName = "Change Language";
        return
      }
      this.$parent.languageView = false;
      this.routerName = this.$route.name;
    },
    goBack(){
      if(this.$route.path === '/paymentDetails' || (this.$route.path === '/binancePayment' && this.$store.state.binancePayment === 'payList')){
        this.$router.go(-1);
        return;
      }
      window.location.href = `${this.$store.state.cancelTo}`
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  img {
    width: 0.18rem;
  }
  .navigation-icon{
    display: flex;
  }
  .routerName{
    font-size: 0.18rem;
    font-family: Jost-SemiBold, Jost;
    font-weight: 600;
    color: #000000;
    line-height: 0.21rem;
    margin-left: 0.2rem;
    margin-top: -0.01rem;
  }
  .searchLanguage{
    margin-left: auto;
    display: flex;
    align-items: center;
    .text{
      width: 0.24rem;
      height: 0.24rem;
      border: 1.9px solid #999999;
      line-height: 0.21rem;
      text-align: center;
      border-radius: 5px;
      color: #999999;
      font-size: 0.12rem;
      font-weight: bold;
      margin-right: 0.1rem;
    }
    .icon{
      display: flex;
      align-items: center;
      img{
        width: 0.14rem;
      }
    }
  }
}
</style>
