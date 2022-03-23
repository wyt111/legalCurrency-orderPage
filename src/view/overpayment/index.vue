<template>
  <div class="over-container">
      <div class="sessIcon1" v-if="n===1">
        <img src="../../assets/successIcon.png" alt="">
        <p>Susscessful! (over)</p>
        <p>38.01 USDT</p>
        <p>Your payment amount is greater than the amount due, and the payment is successful.
           The system will send you an email to collect the overpaid part,
            please pay attention to check the refund information</p>
      </div>
      <div class="sessIcon1" v-else-if="n===2">
        <img src="../../assets/successIcon.png" alt="">
        <p>Susscessful! (over)</p>
        <p>38.01 USDT</p>
        <p>Your payment amount is greater than the amount due, and the payment is successful.
           The system will send you an email to collect the overpaid part,
            please pay attention to check the refund information</p>
      </div>
      <div class="sessIcon2" v-else-if="n===3">
        <img src="../../assets/errorIcon1.png" alt="">
        <p>Unpaid! (undepaid)</p>
        <p>38.01 USDT</p>
        <p>Your payment amount is less than the amount due and the payment was unsuccessful. 
          The system will send you an email to collect, please pay attention to check the refund information.</p>
      </div>
      <div class="sessIcon2" v-else-if="n===4">
        <img src="../../assets/errorIcon1.png" alt="">
        <p>Unpaid! (undepaid)</p>
        <p>38.01 USDT</p>
        <p>Your payment amount is less than the amount due and the payment was unsuccessful. 
          Since your payment is less than 1USDT, the system will not issue a refund to you.</p>
      </div>
      <div class="content" v-if="n!==a">
                <div>
                  <p>Pay Amount</p>
                  <p>50 USDT</p>
                </div>
                <div>
                  <p>Pay Amount</p>
                  <p>50 USDT</p>
                </div>
                <div>
                  <p>Pay Amount</p>
                  <p>0.23453 SGD/USDT</p>
                </div>
      </div>
      <div class="sessIcon2" v-if="n===5">
        <img src="../../assets/errorIcon.png" alt="">
        <p>Unpaid! (undepaid)</p>
        <p>38.01 USDT</p>
        <p>Your payment amount is less than the amount due and the payment was unsuccessful. 
          The system will send you an email to collect, please pay attention to check the refund information.</p>
          <p>Your payment amount is less than the amount due and the payment was unsuccessful. 
          The system will send you an email to collect, please pay attention to check the refund information.</p>
      </div>
      <div class="sessButton" :style="{marginTop:n===5?1.2 + 'rem':.8 + 'rem'}"></div>
  </div>
</template>
<script>
  export default{
    name:'overpayment',
    data(){
      return {
        n:5,
        a:5
      }
    }
  }
</script>
<style lang="scss" scoped>

.over-container{
  width: 100%;
  padding: .4rem .2rem 0 .2rem;
  box-sizing: border-box;
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
       margin-top: .2rem;
       background:url('../../assets/successButton.png') no-repeat;
       background-size: 100% 100%;
     }
}

</style>>

