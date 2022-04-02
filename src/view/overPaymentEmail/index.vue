<template>
  <div class="overPaymentEmail-container">
    <div class="title">On-chain transfers will be charged a handling fee of 1USDT, and the estimated amount you will receive is 1USDT.</div>
      <div class="email-centent">
          <div class="email">{{ overPaymentData.email }}</div>
          <!-- overPayment -->
          <p v-if="overPaymentData.status===2">You paid with cryptocurrency at <span>( {{ overPaymentData.merchantCode }} ) </span>
          at {{ overPaymentData.payCompleteTime }}. Since your payment amount is greater than the amount due,
          you need to refund the overpayment please fill in your on-chain <span>USDT- TRC20</span>
          address completes the refund.</p>
          <!-- underPayment -->
          <p v-else>You paid with cryptocurrency at <span>( {{ overPaymentData.merchantCode }} ) </span>
          at {{ overPaymentData.payCompleteTime }}. Since your payment amount is less than the payable amount, the order has not been 
          completed please fill in your on-chain <span>USDT- TRC20</span>
          address completes the refund.</p>
          <p>Network : <span>{{ overPaymentData.network }}</span></p>
          <p>Address : </p>
          <input type="text" placeholder="Enter Address..." v-model="Input" @blur="AddrssIs">
          <span class="isAddr">{{ isAddrss }}</span>
          <ul class="payment">
            <li>
              <p>Amount received:</p>
              <p>{{ overPaymentData.currencyAmount }} {{ overPaymentData.currencyCode }}</p>
            </li>
            <li>
              <p>Amounts payable:</p>
              <p>{{ overPaymentData.realCount }} {{ overPaymentData.digitalCurrencyCode }}</p>
            </li>
            <li>
              <p>The amount actually paid:</p>
              <p>{{overPaymentData.coboRealCount}} {{ overPaymentData.digitalCurrencyCode }}</p>
            </li>
            <li>
              <p>Refund amount:</p>
              <p>{{ overPaymentData.refundCount }} {{ overPaymentData.refundUnit }}</p>
            </li>
          </ul>
          <p>Remarks: On-chain transfers will be charged a handling fee of 
            1USDT, and the estimated amount you will receive is 1USDT.</p>
            <div class="confirm" :style="{opacity: AddrssIs()?'1':'.5'}" @click="refundFn">Confirm</div>
      </div>
  </div>
</template>
<script>
export default{
  data(){
    return {
      isAddrss:'',
      Input:'',
      isOver:2,
      overPaymentData:''
    }
  },
  methods:{
    //验证地址
    AddrssIs(){
      if(this.Input!==''){
        this.isAddrss = ''
        return true  
      }else{
        this.isAddrss = 'Address is ont corre'
        return false
      }
    },
    //确定下一步
    refundFn(){
      this.AddrssIs()
      if(this.AddrssIs()){
        let Id = this.$route.query.id
        let params = {
          "sysOrderNum":Id,
          "refundAddress":this.Input
        }
        this.$axios.post(this.$api.post_AddrssSuccs,params).then(res=>{
          if(res && res.data){
            if(res.msg === '成功'){
            this.$toast('succss')
            this.$router.push({
              path:'/refundLoading',
              query:{
                id:Id
              }
            })
          }else{
             this.$toast('Address is ont corre')
          }
          }else{
            this.$toast('Network error')
          }
        })
      }else{
        this.$toast('Address is ont corre')
      }
    }
  },
  mounted(){
    let params = {
        "sysOrderNum":this.$route.query.id
      }
      this.$axios.post(this.$api.post_Addrss,params).then(res=>{
        if(res && res.data){
          this.overPaymentData = res.data
        }
      })
  }
}
</script>
<style lang="scss" scoped>
.overPaymentEmail-container{
  width: 55%;
  height: 100%;
  padding: 100px 0 0 0;
  margin: 0 auto;
  font-family: Jost-Regular, Jost;
  // position: relative;
    .title{
      width: 100%;
      height: 60px;
      text-align: center;
      background: #EEF4FFFF;
      font-size: 14px;
      line-height: 60px;
      color: #566E9AFF;
      position: absolute;
      left: 0;
      top: 180px;
      overflow: hidden;
    }
  .email-centent{
    width: 100%;
    padding: 10px 20px 8px 20px;
    box-sizing: border-box;
    .email{
      font-size: 16px;
      color: #4479D9;
      margin: 10px 0 10px 0;
    }
    >p:nth-of-type(1){
      font-size: 16px;
      line-height: 23px;
      text-align: justify;
      margin-bottom: 20px;
      span{
        color: #4479D9;
      }
    }
    >p:nth-of-type(2){
      font-size: 16px;
      font-weight: 600;
      span{
        font-weight: 200;
      }
    }
    >p:nth-of-type(3){
      font-size: 16px;
      font-weight: 600;
      margin-top: 10px;
    }
    input{
      width: 400px;
      height: 44px;
      border: none;
      background: #F3F4F5;
      border-radius: 4px;
      margin-top: 10px;
      font-size: 16px;
      text-indent: 20px;
    }
    .isAddr{
      display: block;
      color: #FF0000FF;
      font-size: 14px;
      margin: 10px 0 0 20px;
    }
    .payment{
      width: 400px;
      height: 180px;
      background: #F3F4F5;
      border-radius: 4px;
      margin-top: 20px;
      padding: 20px 20px 0 20px;
      box-sizing: border-box;
      li{
        width: 100%;
        height: 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        font-size: 16px;
      }
    }
    >p:nth-of-type(4){
      color: #4479D9;
      font-size: 12px;
      line-height: 18px;
      text-align: justify;
      margin-top: 10px;
      display: none;
    }
    .confirm{
      width: 160px;
      height: 44px;
      background: #4479D9;
      font-size: 16px;
      border-radius: 4px;
      text-align: center;
      color: #ffffff;
      line-height: 44px;
      margin-top: 50px;
      cursor: pointer;
    }
  }
}
@media screen and(max-width:768px) {
  .overPaymentEmail-container{
  width: 100%;
  font-family: Jost-Regular, Jost;
  border-radius: 0;
  box-shadow: 0 0 0 0 #ffffff;
  padding: 0;
  .title{
    display: none;
  }
  .email-centent{
    width: 100%;
    padding: .1rem .2rem .8rem .2rem;
    box-sizing: border-box;
    .email{
      font-size: .14rem;
      color: #4479D9;
      margin: .1rem 0 .1rem 0;
    }
    >p:nth-of-type(1){
      font-size: .14rem;
      line-height: .2rem;
      text-align: justify;
      margin-bottom: .2rem;
      span{
        color: #4479D9;
      }
    }
    >p:nth-of-type(2){
      font-size: .14rem;
      font-weight: 600;
      span{
        font-weight: 200;
      }
    }
    >p:nth-of-type(3){
      font-size: .14rem;
      font-weight: 600;
      margin-top: .1rem;
    }
    input{
      width: 100%;
      height: .44rem;
      border: none;
      background: #F3F4F5;
      border-radius: .04rem;
      margin-top: .1rem;
      font-size: .14rem;
      text-indent: .2rem;
    }
    .payment{
      width: 100%;
      height: 1.8rem;
      background: #F3F4F5;
      border-radius: .04rem;
      margin-top: .2rem;
      padding: .2rem .2rem 0 .2rem;
      box-sizing: border-box;
      li{
        width: 100%;
        height: .2rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .2rem;
        font-size: .14rem;
      }
    }
    >p:nth-of-type(4){
      color: #4479D9;
      font-size: .12rem;
      line-height: 18px;
      text-align: justify;
      margin-top: .1rem;
      display: block;
    }
    .confirm{
      width: 100%;
      height: .44rem;
      background: #4479D9;
      font-size: .16rem;
      border-radius: .04rem;
      text-align: center;
      color: #ffffff;
      line-height: .44rem;
      margin-top: .5rem;
      cursor: pointer;
    }
  }
}
}
</style>