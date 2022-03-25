<template>
  <div class="over-container">
    <!-- succeed -->
      <div class="sessIcon1" v-if="overData.payStatus===1">
        <img src="../../assets/successIcon.png" alt="">
        <p>{{ $t('nav.overpayment_Stitle') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <!-- <p>{{ $t('nav.overpayment_part') }}</p> -->
      </div>
      <!-- overPayment -->
      <div class="sessIcon1" v-else-if="overData.payStatus===2 ">
        <img src="../../assets/successIcon.png" alt="">
        <p>{{ $t('nav.overpayment_over') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_part') }}</p>
      </div>
      <!-- underPayment -->
      <div class="sessIcon2" v-else-if="overData.payStatus===3">
        <img src="../../assets/errorIcon1.png" alt="">
        <p>{{ $t('nav.overpayment_unpaid') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_succeed') }}</p>
      </div>
      <!-- overTime -->
      <div class="sessIcon2" v-else-if="overData.payStatus===4">
        <img src="../../assets/errorIcon.png" alt="">
        <p>{{ $t('nav.overpayment_fapiao') }}</p>
        <p>{{ overData.coinCount }}&nbsp;{{ overData.coin }}</p>
        <p>{{ $t('nav.overpayment_chao') }}</p>
          <p>{{$t('nav.overpayment_chao1')}}</p>
      </div>
      <div class="content" v-show="[1,2,3,].includes(overData.payStatus)">
                <div>
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
      <div class="sessButton" :style="{marginTop:overData.payStatus !== 4?.6 + 'rem':1.6 + 'rem'}" @click="_returnCan"></div>
  </div>
</template>
<script>
  export default{
    name:'overpayment',
    data(){
      return {
        statePay:1,
        overData:'',
      }
    },
    methods:{
      _overAxios(){
        let baseUrl = localStorage.getItem("baseUrl")
        let params = {
          "sysOrderNum": localStorage.getItem('sysOrderNum'),
          "payType":this.$store.state.paymentType.payType
        }
        this.$axios.post(baseUrl + this.$api.post_info, params).then(res=>{
          if(res && res.data){
            this.overData = res.data
          }
        })
      },
      _returnCan(){
        window.open(this.$store.state.returnTo);
      }
    },
    mounted(){
      this._overAxios()
    }
  }
</script>
<style lang="scss" scoped>

.over-container{
  width: 100%;
  padding: .7rem .2rem 0 .2rem;
  box-sizing: border-box;
  position: relative;
  .sessIcon1{
    width: 100%;
    text-align: center;
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
       height: 1.35rem;
       padding: 0 .2rem 0 .2rem;

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
       }
     }
     .sessButton{
       width: 100%;
       height: .44rem;
       background:url('../../assets/successButton.png') no-repeat;
       background-size: 100% 100%;
     }
}

</style>>

