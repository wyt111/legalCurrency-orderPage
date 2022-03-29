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
  width: 100%;
  font-family: Jost-Regular, Jost;
  text-align: center;
  padding: .6rem .2rem 0 .2rem;
  box-sizing: border-box;
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
  }
}
</style>>
