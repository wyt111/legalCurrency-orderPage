<template>
  <div class="paymentPrompt-container">
      <div class="paymentPrompt-title">
        <img src="@/assets/errorIcon.png" alt="">
        <h2>{{ $t('nav.paymentPrompt_tips') }}</h2>
      </div>
      <div class="content">
        <p>{{ $t('nav.paymentPrompt_succe') }}</p>
      </div>
      <div class="content">
        <p>
           {{ $t('nav.paymentPrompt_high') }}
        </p>
      </div>
      <div class="goPayment" @click="goPayment">
        <p>Confirm</p>
          <img src="@/assets/rightIcon.png" alt="">
      </div>
  </div>
</template>
<script>
  export default{
    
    methods:{
      goPayment(){
        if(this.$store.state.paymentType.payType === 'w1'){
          this.$router.push('/binancePayment')
        }else{
          this.$router.push('/paymentDetails')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.paymentPrompt-container{
  width: 440px;
  height: 700px;
  font-family: Jost-Regular, Jost;
  padding: 0 20px 0 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  .paymentPrompt-title{
    text-align: center;
    padding-top: 60px;
    box-sizing: border-box;
    img{
      width: 60px;
      height: 60px;
      margin-bottom: 10px;
    }
    h2{
      font-size: 16px;
      color:#000000;
      margin-bottom: 40px;
    }
  }
  .content{
    width: 100%;
    height: 50px;
    margin-top: 30px;
    position: relative;
    p{
      width: 90%;
      font-size: 14px;
      color: #666666;
      margin-left: 30px;
    }
  }
  .content::after{
    display: block;
    content:'';
    width: 8px;
    height: 8px;
    background: #666666;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 10%;
  }
  .goPayment{
    width: 100%;
    height: 44px;
    background: #4479D9;
    border-radius: 4px;
    display: flex;
    align-items: center;
    margin-top:250px;
    cursor: pointer;
    img{
      width: 25px;
      height: 16px;
    }
    p{
      text-align: center;
      font-size: 16px;
      color: #FFFFFF;
      font-weight: 600;
      margin: 0  25% 0 44%;
    }
  }
}
@media screen and (max-width:768px) {
  .paymentPrompt-container{
  width: 100%;
  font-family: Jost-Regular, Jost;
  padding: 0 .2rem 0 .2rem;
  box-sizing: border-box;
  border-radius: 0;
  box-shadow: 0 0 0 0 #fff;
  .paymentPrompt-title{
    text-align: center;
    padding-top: .6rem;
    box-sizing: border-box;
    img{
      width: .6rem;
      height: .6rem;
      margin-bottom: .1rem;
    }
    h2{
      font-size: .16rem;
      color:#000000;
      margin-bottom: .1rem;
    }
  }
  .content{
    width: 100%;
    height: .5rem;
    position: relative;
    p{
      width: 90%;
      font-size: .14rem;
      color: #666666;
      margin-left: .2rem;
    }
  }
  .content::after{
    display: block;
    content:'';
    width: .08rem;
    height: .08rem;
    background: #666666;
    border-radius: 50%;
    position: absolute;
    left: 0;
    top: 10%;
  }
  .goPayment{
    width: 100%;
    height: .44rem;
    background: #4479D9;
    border-radius: .04rem;
    display: flex;
    align-items: center;
    margin-top: 2rem;
    cursor: pointer;
    // justify-content: space-around;
    img{
      width: .25rem;
      height: .16rem;
    }
    p{
      text-align: center;
      font-size: .16rem;
      color: #FFFFFF;
      font-weight: 600;
      margin: 0  25% 0 44%;
    }
  }
}
}
</style>