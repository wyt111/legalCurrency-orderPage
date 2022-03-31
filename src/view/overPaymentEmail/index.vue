<template>
  <div class="overPaymentEmail-container">
      <div class="email-centent">
          <div class="email">{{ overPaymentData.email }}</div>
          <!-- overPayment -->
          <p v-if="overPaymentData.status===2">You paid with cryptocurrency at <span>( {{ overPaymentData.merchantCode }} ) </span>
          at {{ overPaymentData.refundTime }}. Since your payment amount is greater than the amount due,
          you need to refund the overpayment please fill in your on-chain <span>USDT- TRC20</span>
          address completes the refund.</p>
          <!-- underPayment -->
          <p v-else-if="overPaymentData.status===3">You paid with cryptocurrency at <span>( {{ overPaymentData.merchantCode }} ) </span>
          at {{ overPaymentData.refundTime }}. Since your payment amount is less than the payable amount, the order has not been 
          completed please fill in your on-chain <span>USDT- TRC20</span>
          address completes the refund.</p>
          <p>Network : <span>{{ overPaymentData.network }}</span></p>
          <p>Address : </p>
          <input type="text" placeholder="Enter Address..." v-model="Input" @blur="AddrssIs">
          <span style="display:block;margin:.2rem 0 .1rem .1rem;color:#FF0000;font-size:.14rem">{{ isAddrss }}</span>
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
        this.$router.push('/refundLoading')
      }else{
        this.$toast('Address is ont corre')
      }
    }
  },
  mounted(){
    let params = {
        "sysOrderNum":"ArnzUmO6/aZRbQrru1CZKdgx0cwTQqyUYkFTe+dCG7rO/8zcGcYnLYEJryyvRhZXGOhqHbFxyG2f3miU0M2AwSTwiUbzLAFQ2RCUV8QTXm5JauKnJiTLlC1a/QlgkaKRcUnbjECVJkVTTkDSYtQ8ALEsxhm6KFIWfgddOJHwIRM="
      }
      this.$axios.post(this.$api.post_Addrss,params).then(res=>{
        // console.log(res);
        if(res && res.data){
          this.overPaymentData = res.data
          console.log(this.overPaymentData);
        }
      })
  }
}
</script>
<style lang="scss" scoped>
.overPaymentEmail-container{
  width: 100%;
  font-family: Jost-Regular, Jost;
  
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
    }
    .confirm{
      width: 100%;
      height: .44rem;
      background: #4479D9;
      border-radius: .04rem;
      text-align: center;
      color: #ffffff;
      line-height: .44rem;
      margin-top: .5rem;
    }
  }
}
</style>