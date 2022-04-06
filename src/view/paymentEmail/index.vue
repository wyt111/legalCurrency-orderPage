<template>
  <div class="paymentEmail-container">
      <img class="logo" src="@/assets/email.png" alt="">
      <h2>{{ $t('nav.payment_email') }}</h2>
      <p>{{ $t('nav.paymentemail_addr') }}</p>
        <input class="email" type="text" v-model="email" :placeholder="$t('nav.paymentemail_Email')" @blur="changeFn">
        <div id="hint">{{hint}}</div>
        <div class="centent">
          <input type="checkbox" v-model="checked">
          <p>{{$t('nav.paymentemail_consent')}}</p>
        </div>
        <img class="submit" src="@/assets/subActive.png" @click="submitSend" alt="" v-if="isShow">
        <img class="submit" src="@/assets/submit.png" @click="submitSend" alt="" v-else>
  </div>
</template>
<script>
export default{
  data(){
    return {
      hint:'',
      email:'',
      checked:false
    }
  },
  methods:{
    changeFn(){
      let emailHint = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      let hint = document.querySelector('#hint')
      if(this.email === ''){
        this.hint = '*The mailbox cannot be empty'
        hint.style.color = 'red'
        return false
      }else if(emailHint.test(this.email) === false){
        this.hint = '*Please enter the correct email address'
        hint.style.color = 'red'
        return false
      }
      this.hint = '*Correct email address'
      hint.style.color = '#6ABF86'
      return true
    },
    submitSend(){
      if(this.checked && this.changeFn()){
        this.$store.state.paymentEmail = this.email
        if(this.$store.state.isTips === 1){
          this.$router.push('/paymentPrompt')
        }else{
            if(this.$store.state.paymentType.payType === 'w1'){
              this.$router.push('/binancePayment')
            }else{
              this.$router.push('/paymentDetails')
            }
        }
        return true
      }else{
        if(!this.changeFn()){
          this.$toast('Please see email')
          return
        }
        if(this.checked === false){
          this.$toast('Please check the protocol')
          return
        }
        return false
      } 
    }
  },
  computed:{
    isShow(){
      let isShow1 = false
     if(this.checked===true && this.changeFn() === true){
        isShow1 = true
      }else{
        isShow1 = false
      }
      return isShow1
    }
  }
}

</script>
<style lang="scss" scoped>
.paymentEmail-container{
  width: 400px;
  height: 650px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  margin: auto;
  font-family: Jost-Regular, Jost;
  text-align: center;
  padding: 60px 20px 0 20px;
  box-sizing: border-box;
  // position: relative;
  .logo{
    width: 60px;
    height: 60px;
  }
  >h2{
    font-size: 24px;
    color: #000000;
    margin-top: 10px;
    font-weight: 700;
  }
  >p{
    font-size: 16px;
    color: #666666;
   line-height: 24px;
  }
  .email{
    width: 380px;
    height: 44px;
    border-radius: 4px;
    background: #F3F4F5FF;
    border: none;
    outline:none;
    font-size: 16px;
    text-indent: 10px;
    margin-top: 40px;
  }
  #hint{
    text-align: left;
  }
  .centent{
    display: flex;
    box-sizing: border-box;
    line-height: 24px;
    margin: 20px 10px 10px 10px;
    text-align: left;
    font-size: 14px;
    input{
      width: 20px;
      height: 20px;
      margin-top: 2px;
      margin-right: 5px;
    }
  }
  .submit{
    width: 380px;
    height:44px;
    margin-top: 205px;
    cursor: pointer;
  }
}
@media screen and (max-width:768px) {
  .paymentEmail-container{
  width: 100%;
  border-radius: 0;
  font-family: Jost-Regular, Jost;
  text-align: center;
  padding: .6rem .2rem 0 .2rem;
  box-sizing: border-box;
   box-shadow: 0 0 0 0 #fff;
  // position: relative;
  .logo{
    width: .6rem;
    height: .6rem;
  }
  >h2{
    font-size: .16rem;
    color: #000000;
    margin-top: .1rem;
    font-weight: 700;
  }
  >p{
    font-size: .14rem;
    color: #666666;
    line-height: .24rem;
  }
  .email{
    width: 100%;
    height: .44rem;
    border-radius: .04rem;
    background: #F3F4F5;
    border: none;
    outline:none;
    font-size: .14rem;
    text-indent: .1rem;
    margin-top: .4rem;
  }
  #hint{
    text-align: left;
  }
  .centent{
    display: flex;
    box-sizing: border-box;
    line-height: .24rem;
    margin: .2rem 0 1rem 0;
    text-align: left;
    font-size: .14rem;
    input{
      width: .2rem;
      height: .2rem;
      margin-top: .02rem;
      margin-right: .05rem;
    }
  }
  .submit{
    width: 100%;
    height: .44rem;
    margin-top: .2rem;
    cursor: pointer;
  }
}
}
</style>>
