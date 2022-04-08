<template>
  <div id="index">
    <div class="content">
      <div class="amountMoney">{{ infoObject.orderAmount }} USDT</div>
      <div class="orderStatus">
        <div class="orderStatus_img">
          <div v-if="orderStatus === 'loading'">
            <el-progress type="circle" :width="130" :stroke-width=10 :percentage="timeValue" :color="colors"></el-progress>
          </div>
          <img v-if="orderStatus === 'success'" src="@/assets/successIcon.png"/>
          <img v-if="orderStatus === 'error'" src="@/assets/errorIcon.png" />
        </div>
        
        <div class="orderStatus_text" v-if="infoObject.isPrePay !== 0">
          <span v-if="orderStatus === 'success'">{{ infoObject.payDesc }}</span>
          <span v-else-if="orderStatus === 'error'">{{$t('nav.binancePayment_orderTimeoutText')}}</span>
          <span v-else>{{$t('nav.binancePayment_advancePayment')}}</span>
        </div>
      </div>
      <div class="content1">
            <div class="amountMoney1">{{ infoObject.orderAmount }} USDT</div>
            <div class="qrcodeLogo" ref="qrCodeUrl">
              <div class="row">
                <img :src="infoObject.qrIcon" alt="">
              </div>
            </div>
            <div class="con-title" v-if="infoObject.isPrePay !== 0">{{ $t('nav.binancePayment_will') }}</div>
            <div class="con-title" style="margin-top:20px">{{ $t('nav.binancePayment_App') }}</div>
        </div>
      <div class="loading_text" v-if="orderStatus === 'loading' && infoObject.isPrePay !== 0">{{ $t('nav.binancePayment_completeReturn') }}</div>
      <div
        class="informationBar"
        :class="{ informationBar_success: orderStatus === 'loading' }"
        v-if="orderStatus === 'success' || orderStatus === 'loading'"
      >
        <div class="informationBar_line">
          <div class="title">{{ $t('nav.binancePayment_transactionAmount') }}:</div>
          <div class="number">{{ infoObject.fiatAmount }} {{ infoObject.fiat }}</div>
        </div>
        <div class="informationBar_line">
          <div class="title">{{ $t('nav.binancePayment_exchangeRate') }}:</div>
          <div class="number">{{ infoObject.fiatToUsdtRate }} {{ infoObject.fiat }}/{{ infoObject.coin }}</div>
        </div>
      </div>
      <div class="errorText" v-else>
        {{ $t('nav.binancePayment_orderTimeout') }}
      </div>
      <footer>
        <div class="goButton" @click="toLink">
          <div class="returnButton" v-if="orderStatus === 'success' || orderStatus === 'error'">
            {{ $t('nav.binancePayment_returnTo') }} {{ infoObject.mchName }}
            <img src="@/assets/rightIcon.png">
          </div>
          <img src="@/assets/biaIcon.png" v-else />
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import i18n from "@/utils/i18n";
import QRCode from 'qrcodejs2';
export default {
  name: "binancePayment",
  data() {
    return {
      orderStatus: "loading", //success error loading
      timeValue: 0,
      timeText: '00:00',
      colors: [
        {color: '#4479D9'},
      ],
      infoObject: {},
      countDown: null,
      AddrImg:'',
      isShow:''
    };
  },
  mounted() {
    document.getElementsByClassName('el-progress__text')[0].innerText = '00:00';
    if(this.$route.path === '/binancePayment'){
      this.$store.state.binancePayment_locale === '' ? this.$store.state.binancePayment_locale = 'en' : '';
      //Case insensitive recognition string
      this.recognitionLanguage(this.$store.state.binancePayment_locale);
    }
    this.queryInfo();
    this.countDown = setInterval(()=>{
      this.queryInfo();
    },1000);
  },
  destroyed(){
    i18n.locale = this.$store.state.languageValue;
    clearInterval(this.countDown);
  },
  methods: {
    recognitionLanguage(subStr){
      if(eval("/"+subStr+"/ig").test('de')){
        i18n.locale = 'de';
        return;
      }
      if(eval("/"+subStr+"/ig").test('en')){
        i18n.locale = 'en';
        return;
      }
      if(eval("/"+subStr+"/ig").test('es')){
        i18n.locale = 'es';
        return;
      }
      if(eval("/"+subStr+"/ig").test('fr')){
        i18n.locale = 'fr';
        return;
      }
      if(eval("/"+subStr+"/ig").test('hu')){
        i18n.locale = 'hu';
        return;
      }
      if(eval("/"+subStr+"/ig").test('id')){
        i18n.locale = 'id';
        return;
      }
      if(eval("/"+subStr+"/ig").test('pt-BR')){
        i18n.locale = 'pt-BR';
        return;
      }
      if(eval("/"+subStr+"/ig").test('tr')){
        i18n.locale = 'tr';
        return;
      }
      if(eval("/"+subStr+"/ig").test('zh-CN')){
        i18n.locale = 'zh-CN';
        return;
      }
      if(eval("/"+subStr+"/ig").test('zh-HK')){
        i18n.locale = 'zh-HK';
        return;
      }
      if(eval("/"+subStr+"/ig").test('ja')){
        i18n.locale = 'ja';
        return;
      }
    },
    queryInfo(){
      let params1 = {
        "sysOrderNum": localStorage.getItem("sysOrderNum"), //API148660202748314009 API149637939023643033
        "payMent": this.$store.state.paymentType.payType,
        "email": this.$store.state.paymentEmail,
      }
      let params2 = {
        "sysOrderNum": localStorage.getItem("sysOrderNum"),
      }
      let methodsName = this.$store.state.binancePayment === 'payList' ? this.$api.post_qrPay : this.$api.post_info;
      let overParams = this.$store.state.binancePayment === 'payList' ? params1 : params2;
      this.$axios.post(methodsName, overParams).then(res=>{
        if(res.data){
          this.infoObject = res.data
          this.addrImg(res.data)
          //Hide the title bar when there are payment results - this.$parent.navigationBarState
          if(this.infoObject.payStatus === 0){
            this.orderStatus = 'loading';
          }else if(this.infoObject.payStatus === 1){
            // this.orderStatus = 'success';
            window.location.href = this.infoObject.returnTo;
            this.$parent.$refs.headerRef.routerNameState = false;
          }else{
            this.orderStatus = 'error';
            this.$parent.$refs.headerRef.routerNameState = false;
          }
          this.infoObject.remainingPaymentTime -= 1;
          this.turnMinute(this.infoObject.remainingPaymentTime)
          document.getElementsByClassName('el-progress__text')[0] ?
              document.getElementsByClassName('el-progress__text')[0].innerText = this.timeText : '';
          if(this.infoObject.remainingPaymentTime <= 0){
            clearInterval(this.countDown);
            this.$store.state.resultData = res.data;
            this.$store.state.resultData.payStatus = 4;
            this.$router.push("/overpayment");
          }
        }
      })
    },
    turnMinute(value){
      if(value > 0){
        var second = value;
        var minute=0;
        minute = parseInt(second/60);
        second%=60;
        if(minute>60) {
          minute%=60;
        }
        second = second>9?second:"0"+second;
        minute = minute>9?minute:"0"+minute;
        this.timeText = minute+":"+second;
        this.timeValue = (value / 3600)*100;
        this.timeValue > 100 ? this.timeValue = 100 : '';
      }
    },
    toLink(){
      if(this.orderStatus === 'success'){
        window.location.href = this.infoObject.returnTo;
      }else if(this.orderStatus === 'error'){
        window.location.href = this.infoObject.cancelTo;
      }else{
        window.location.href = this.infoObject.deeplink;
      }
    },
    //addrss
    addrImg(n){
      if(n.qrAddress === this.AddrImg){
        return false
      }
      this.isShow - n
      this.AddrImg = n.qrAddress
      new QRCode(this.$refs.qrCodeUrl, {
        text: n.qrAddress,
        width: 140,
        height: 140,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      
    }
  },
};
</script>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
#index {
  width: 400px;
  height: 650px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
}
.amountMoney {
  font-size: 24px;
  font-family: Jost-SemiBold, Jost;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin-top: 16px;
  display: none;
}
.orderStatus {
  .orderStatus_text {
    font-size: 18px;
    font-family: Jost-Regular, Jost;
    font-weight: 400;
    color: #000000;
    margin-top: 20px;
    text-align: center;
  }
  .orderStatus_img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    .el-progress-circle{
      width: 92px;
      height: 92px;
    }
    &>div{
      display: flex;
    }
    img {
      width: 60px;
    }
  }
  .orderStatus_text_success {
    margin-top: 10px;
    font-weight: 600;
    color: #02af38;
    text-align: center;
  }
  
  .orderStatus_text_error {
    margin-top: 10px;
    font-weight: 600;
    color: #ff0000;
    text-align: center;
  }
}
.loading_text {
  font-size: 16px;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #666666;
  margin-top: 10px;
  padding: 10px 30px 0 30px;
  text-align: center;
}
.informationBar {
  margin: 60px 20px 0 20px;
  padding:5px 20px;
  background: #f3f4f5;
  border-radius: 4px;
  .informationBar_line {
    display: flex;
    margin-top: 15px;
    font-size: 14px;
    font-family: Jost-Regular, Jost;
    font-weight: 400;
    color: #000000;
    .number {
      margin-left: auto;
    }
    &:last-child {
      margin-bottom: 15px;
    }
  }
}
.informationBar_success {
  margin-top: 10px;
}
.errorText {
  font-size:16px;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #666666;
  text-align: center;
  margin: 20px 18px 0 18px;
}
footer{
  opacity: 0;
  margin-top: 40px;
}
.goButton {
  
  margin: 0 0.2rem;
  display: flex;
  .returnButton{
    
    width: 100%;
    height:44px;
    background: #4479D9;
    border-radius: 4px;
    line-height: 0.44rem;
    text-align: center;
    font-size: 0.16rem;
    font-family: Jost-SemiBold, Jost;
    font-weight: 600;
    color: #FFFFFF;
    position: relative;
    img{
      position: absolute;
      top: 0.14rem;
      right: 0.19rem;
      width: 0.27rem;
      height: 0.16rem;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.orderStatus_img ::v-deep .el-progress__text{
  font-size:18px;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #4479D9;
}
.orderStatus_img ::v-deep .el-progress-circle{
  height: 92px !important;
  width: 92px !important;
}
.content1{
    width: 100%;
    padding: 0 20px 0 20px;
    .amountMoney1{
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      font-family:Jost-Regular, Jost;
      margin-top: 20px;
    }
    .qrcodeLogo{
      width: 140px;
      height: 140px;
      position: relative;
      text-align: center;
      margin: 10px auto;
      .row{
        width: 45px;
        height: 45px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      img:nth-of-type(1){
        width: 30px;
        height: 30px;
        border-radius: 30%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
      }
      
    }
    .con-title{
      font-size: 16px;
      font-family: Jost-Regular, Jost;
      font-weight: 400;
      color: #666666;
      line-height: 23px;
      text-align: center;
      // margin-bottom: 10px;
    }
  }
@media screen and (max-width:768px) {
  html,
body,
#index {
  width: 100%;
  height: 100%;
}
#index {
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px #fff;
  display: flex;
  flex-direction: column;
  .content1{
    display: none;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
}
.amountMoney {
  font-size: 0.24rem;
  font-family: Jost-Regular, Jost;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin-top: 0.16rem;
  display: block;
}
.orderStatus {
  .orderStatus_text {
    font-size: 0.18rem;
    font-family: Jost-Regular, Jost;
    font-weight: 400;
    color: #000000;
    margin-top: 0.2rem;
    text-align: center;
  }
  .orderStatus_img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.3rem;
    &>div{
      display: flex;
    }
    img {
      width: 0.6rem;
    }
  }
  .orderStatus_text_success {
    margin-top: 0.1rem;
    font-weight: 600;
    color: #02af38;
    text-align: center;
  }
  .orderStatus_text_error {
    margin-top: 0.1rem;
    font-weight: 600;
    color: #ff0000;
    text-align: center;
  }
}
.loading_text {
  font-size: 0.14rem;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #666666;
  margin-top: 0.1rem;
  padding: 0.1rem 0.3rem 0 0.3rem;
  text-align: center;
}
.informationBar {
  margin: 0.6rem 0.2rem 0 0.2rem;
  padding: 0.05rem 0.2rem;
  background: #f3f4f5;
  border-radius: 4px;
  .informationBar_line {
    display: flex;
    margin-top: 0.15rem;
    font-size: 0.14rem;
    font-family: Jost-Regular, Jost;
    font-weight: 400;
    color: #000000;
    .number {
      margin-left: auto;
    }
    &:last-child {
      margin-bottom: 0.15rem;
    }
  }
}
.informationBar_success {
  margin-top: 0.2rem;
}
.errorText {
  font-size: 0.16rem;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #666666;
  text-align: center;
  margin: 0.2rem 0.18rem 0 0.18rem;
}
footer{
  opacity: 1;
  margin-top: 0.4rem;
}
.goButton {
  
  margin: 0 0.2rem;
  display: flex;
  .returnButton{
    width: 100%;
    height: 0.44rem;
    background: #4479D9;
    border-radius: 4px;
    line-height: 0.44rem;
    text-align: center;
    font-size: 0.16rem;
    font-family: Jost-SemiBold, Jost;
    font-weight: 600;
    color: #FFFFFF;
    position: relative;
    img{
      position: absolute;
      top: 0.14rem;
      right: 0.19rem;
      width: 0.27rem;
      height: 0.16rem;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.orderStatus_img ::v-deep .el-progress__text{
  font-size: 0.18rem;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #4479D9;
}
.orderStatus_img ::v-deep .el-progress-circle{
  height: 1.3rem !important;
  width: 1.3rem !important;
}
}
</style>
