<template>
  <div class="over-container">
    <!-- succeed -->
    <div class="sessIcon1" v-if="overData.payStatus===1">
      <h2 class="sessTitle">{{ overData.coinCount }}&nbsp;{{ overData.coin }}</h2>
        <img src="../../assets/successIcon.png" alt="">
        <p>{{ $t('nav.overpayment_Stitle') }}</p>
      </div>
    <!--  overPayment <1u-->
      <div class="sessIcon1" v-if="overData.payStatus===2&&overData.morePayType===2">
        <img src="../../assets/successIcon.png" alt="">
        <p>{{ $t('nav.overpayment_over') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_part1') }}</p>
      </div>
      <!-- overPayment >1u-->
      <div class="sessIcon1" v-else-if="overData.payStatus===2&&overData.morePayType===1">
        <img src="../../assets/successIcon.png" alt="">
        <p>{{ $t('nav.overpayment_over') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_part') }}</p>
      </div>
      <!-- underPayment <1u -->
      <div class="sessIcon2" v-else-if="overData.payStatus===3&&overData.morePayType===2">
        <img src="../../assets/errorIcon1.png" alt="">
        <p>{{ $t('nav.overpayment_unpaid') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_succeed1') }}</p>
      </div>
      <!-- underPayment >1u -->
      <div class="sessIcon2" v-else-if="overData.payStatus===3&&overData.morePayType===1">
        <img src="../../assets/errorIcon1.png" alt="">
        <p>{{ $t('nav.overpayment_unpaid') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_succeed') }}</p>
      </div>
      <!-- overTime -->
      <div class="sessIcon2" v-else-if="overData.payStatus === 4">
        <img src="../../assets/errorIcon.png" alt="">
        <p>{{ $t('nav.overpayment_fapiao') }}</p>
        <p>{{ overData.coinCount}}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_chao') }}</p>
          <p>{{$t('nav.overpayment_chao1')}}</p>
      </div>
      <div class="content" v-show="[1,2,3].includes(overData.payStatus)">
          <div v-if="overData.payStatus!==1">
            <p>{{ $t('nav.overpayment_mount') }}</p>
            <p>{{ overData.orderAmount }}&nbsp;{{ overData.coin }}</p>
          </div>
          <div>
            <p>{{ $t('nav.overpayment_tran') }}</p>
            <p>{{ overData.fiatAmount }}&nbsp;{{ overData.fiat }}</p>
          </div>
          <div>
            <p>{{ $t('nav.overpayment_rate') }}</p>
            <p>{{ overData.payMent==='w1'?overData.fiatToUsdtRate:overData.fiatToCoinRate }}&nbsp;{{ overData.fiat }}/{{ overData.coin }}</p>
          </div>
      </div>
      <div class="sessButton"   @click="_returnCan">
        <p>{{ $t('nav.overpayment_return') }}</p>
        <img src="@/assets/rightIcon.png" alt="">
      </div>
  </div>
</template>
<script>
  export default{
    name:'overpayment',
    data(){
      return {
       overData:'',
       widthTop:''
      }
    },
    methods:{
      _returnCan(){
        window.open(this.$store.state.returnTo);
      },
     
    },
    mounted(){
      this.overData = this.$store.state.resultData
    }
  }
</script>
<style lang="scss" scoped>

.over-container{
  width: 400px;
  height: 650px;
  padding: 70px 20px 0 20px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin: 0 auto;
  .sessIcon1{
    width: 100%;
    text-align: center;
    .sessTitle{
      font-size: 30px;
      margin-bottom: 30px;
    }
    img{
      width: 60px;
      height: 60px;
    }
    p:nth-of-type(1){
      font-size: 18px;
      font-family: Jost-Regular, Jost;
      color: #02AF38;
      font-weight: 600;
      margin-top: 10px;
    }
     p:nth-of-type(2){
      font-size: 24px;
      font-family: Jost SemiBold,jost;
      color: #000;
      font-weight: 600;
      margin-top: 20px;
    }
     p:nth-of-type(3){
       font-size: 14px;
       font-family: Jost-Regular, Jost;
       color: #666666;
       line-height: 20px;
       text-align: justify;
       margin-top: 10px;
     }
  }
  .sessIcon2{
    width: 100%;
    text-align: center;
    img{
      width: 60px;
      height: 60px;
    }
    p:nth-of-type(1){
      font-size: 18px;
      font-family: Jost-Regular, Jost;
      color: #FF0000;
      font-weight: 600;
      margin-top: 10px;
    }
     p:nth-of-type(2){
      font-size: 24px;
      color: #000;
      font-weight: 600;
      margin-top: 20px;
    }
    .error1{
      font-size: 24px !important;
      color: #000 !important;
      font-weight: 600 !important;
      margin-bottom: 20px;
    }
    .error2{
      font-size: 18px !important;
      font-family: Jost-Regular, Jost !important;
      color: #FF0000 !important;
      font-weight: 600 !important;
    }
    .error3{
      margin-top: 20px;
    }
     p:nth-of-type(3){
       font-size: 14px;
       font-family: Jost-Regular, Jost;
       color: #666666;
       line-height: 20px;
       text-align: justify;
       margin-top: 10px;
     }
     p:nth-of-type(4){
       font-size: 14px;
       font-family: Jost-Regular, Jost;
       color: #666666;
       line-height: 20px;
       text-align: justify;
       margin-top: 10px;
     }
  }
  .content{
       width: 100%;
      //  height: 135px;
       padding: 20px 20px 0px 20px;

       background: #F3F4F5;
       border-radius: 4px;
       margin-top: 20px;
       p{
         font-size: 14px;
         font-family: Jost-Regular,Jost;
         font-weight: 600;
       }
       div{
         height: 33.3%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin-bottom: 20px;
       }
     }
     .sessButton{
       width: 90%;
       height: 44px;
       background: #4479D9FF;
       border-radius: 4px;
       cursor: pointer;
       position: absolute;
       bottom: 10%;
       p{
         width: 100%;
         height: 100%;
         text-align: center;
         line-height: 44px;
         font-family: Jost-Regular, Jost;
         font-weight: 600;
          color: #FFFFFF;
          font-weight: 600;
          font-size: 16px;
          position: absolute;
          left: 0;
          top: 0;
       }
       img{
         width: 26px;
         height: 16x;
         float: right;
         margin: 14px 20px 0 0;
       }
     }
}
@media screen and (max-width:768px) {
  .over-container{
  width: 100%;
  padding: .7rem .2rem 0 .2rem;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px #fff;
  position: relative;
  .sessIcon1{
    width: 100%;
    text-align: center;
    .sessTitle{
      font-size: .3rem;
      margin-bottom: .3rem;
    }
    img{
      width: .6rem;
      height: .6rem;
    }
    p:nth-of-type(1){
      font-size: .18rem;
      font-family: Jost-Regular, Jost;
      color: #02AF38;
      font-weight: 600;
    }
     p:nth-of-type(2){
      font-size: .24rem;
      font-family: Jost SemiBold,jost;
      color: #000;
      font-weight: 600;
      margin-top: .2rem;
    }
     p:nth-of-type(3){
       font-size: .14rem;
       font-family: Jost-Regular, Jost;
       color: #666666;
       line-height: .2rem;
       text-align: justify;
       margin-top: .1rem;
     }
  }
  .sessIcon2{
    width: 100%;
    text-align: center;
    img{
      width: .6rem;
      height: .6rem;
    }
    p:nth-of-type(1){
      font-size: .18rem;
      font-family: Jost-Regular, Jost;
      color: #FF0000;
      font-weight: 600;
    }
     p:nth-of-type(2){
      font-size: .24rem;
      color: #000;
      font-weight: 600;
      margin-top: .2rem;
    }
    .error1{
      font-size: .24rem !important;
      color: #000 !important;
      font-weight: 600 !important;
      margin-bottom: .2rem;
    }
    .error2{
      font-size: .18rem !important;
      font-family: Jost-Regular, Jost !important;
      color: #FF0000 !important;
      font-weight: 600 !important;
    }
    .error3{
      margin-top: .2rem;
    }
     p:nth-of-type(3){
       font-size: .14rem;
       font-family: Jost-Regular, Jost;
       color: #666666;
       line-height: .2rem;
       text-align: justify;
       margin-top: .1rem;
     }
     p:nth-of-type(4){
       font-size: .14rem;
       font-family: Jost-Regular, Jost;
       color: #666666;
       line-height: .2rem;
       text-align: justify;
       margin-top: .1rem;
     }
  }
  .content{
       width: 100%;
      //  height: 1.35rem;
       padding: .2rem .2rem 0 .2rem;

       background: #F3F4F5;
       border-radius: .04rem;
       margin-top: .2rem;
       p{
         font-size: .14rem;
         font-family: Jost-Regular,Jost;
         font-weight: 600;
       }
       div{
         height: 33.3%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin-bottom: .2rem;
       }
     }
     .sessButton{
       width: 90%;
       height: .44rem;
       background-size: 100% 100%;
        position: absolute;
        bottom: 10%;
        cursor: pointer;
        p{
          font-size: .16rem;
          line-height: .44rem;
        }
        img{
          width: .26rem;
          height: .16rem;
          margin: .14rem .2rem 0 0;
        }
     }
}
}
</style>>

