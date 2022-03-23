<template>
  <div id="index">
<!--    <header>-->
<!--      <div class="navigation" @click="back"><img src="@/assets/leftIcon.svg" /></div>-->
<!--    </header>-->
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
        <div class="orderStatus_text">
          <span v-if="orderStatus === 'success'">{{ infoObject.payDesc }}</span>
          <span v-else-if="orderStatus === 'error'">{{$t('nav.orderTimeoutText')}}</span>
          <span v-else>{{$t('nav.advancePayment')}}</span>
        </div>
      </div>
      <div class="loading_text" v-if="orderStatus === 'loading'">{{ $t('nav.completeReturn') }}</div>
      <div
        class="informationBar"
        :class="{ informationBar_success: orderStatus === 'loading' }"
        v-if="orderStatus === 'success' || orderStatus === 'loading'"
      >
        <div class="informationBar_line">
          <div class="title">{{ $t('nav.transactionAmount') }}:</div>
          <div class="number">{{ infoObject.fiatAmount }} {{ infoObject.fiat }}</div>
        </div>
        <div class="informationBar_line">
          <div class="title">{{ $t('nav.exchangeRate') }}:</div>
          <div class="number">{{ infoObject.fiatToUsdtRate }} {{ infoObject.fiat }}/{{ infoObject.coin }}</div>
        </div>
      </div>
      <div class="errorText" v-else>
        {{ $t('nav.orderTimeout') }}
      </div>
<!--      <footer>-->
<!--        <div class="goButton" @click="toLink">-->
<!--          <div class="returnButton" v-if="orderStatus === 'success' || orderStatus === 'error'">-->
<!--            {{ $t('nav.returnTo') }} {{ infoObject.mchName }}-->
<!--            <img src="@/assets/rightIcon.png">-->
<!--          </div>-->
<!--          <img src="@/assets/biaIcon.png" v-else />-->
<!--        </div>-->
<!--        <div class="comeFrom">-->
<!--          <div class="comeFrom_text">Powered By</div>-->
<!--          <div class="comeFrom_logo"><img src="@/assets/achLogo.png" /></div>-->
<!--        </div>-->
<!--      </footer>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "payment pag",
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
      buttonState: false,
    };
  },
  mounted() {
    document.getElementsByClassName('el-progress__text')[0].innerText = '00:00';
    this.queryInfo();
    this.countDown = setInterval(()=>{
      this.queryInfo();
    },1000);
  },
  methods: {
    queryInfo(){
      let baseUrl = localStorage.getItem("baseUrl")
      let params = {
        "sysOrderNum": this.$store.state.sysOrderNum //API148660202748314009 API149637939023643033
      }
      this.$axios.post(baseUrl + this.$api.post_info, params).then(res=>{
        if(res.data){
          this.buttonState = true;
          this.infoObject = res.data
          if(this.infoObject.payStatus === 0){
            this.orderStatus = 'loading';
          }else if(this.infoObject.payStatus === 1){
            // this.orderStatus = 'success';
            window.location.href = this.infoObject.returnTo;
          }else{
            this.orderStatus = 'error';
          }

          this.infoObject.remainingPaymentTime -= 1;
          this.turnMinute(this.infoObject.remainingPaymentTime)
          document.getElementsByClassName('el-progress__text')[0] ?
              document.getElementsByClassName('el-progress__text')[0].innerText = this.timeText : '';
          this.infoObject.remainingPaymentTime === 0 ? clearInterval(this.countDown) : '';
        }
      })
    },
    turnMinute(value){
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
    },
    toLink(){
      if(this.buttonState === true){
        if(this.orderStatus === 'success'){
          window.location.href = this.infoObject.returnTo;
        }else if(this.orderStatus === 'error'){
          window.location.href = this.infoObject.cancelTo;
        }else{
          window.location.href = this.infoObject.deeplink;
        }
      }
    },
    back(){
      this.buttonState === true ? window.location.href = `${this.infoObject.cancelTo}` : '';
    },
  },
};
</script>

<style lang="scss" scoped>
html,
body,
#index {
  width: 100%;
  height: 100%;
}
#index {
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow: auto;
  }
}
//.navigation {
//  display: flex;
//  padding: 0.1rem 0.2rem;
//  img {
//    width: 0.18rem;
//  }
//}
.amountMoney {
  font-size: 0.24rem;
  font-family: Jost-SemiBold, Jost;
  font-weight: 600;
  color: #000000;
  text-align: center;
  margin-top: 0.16rem;
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
//footer{
//  margin-top: 0.4rem;
//}
//.goButton {
//  margin: 0 0.2rem;
//  display: flex;
//  .returnButton{
//    width: 100%;
//    height: 0.44rem;
//    background: #4479D9;
//    border-radius: 4px;
//    line-height: 0.44rem;
//    text-align: center;
//    font-size: 0.16rem;
//    font-family: Jost-SemiBold, Jost;
//    font-weight: 600;
//    color: #FFFFFF;
//    position: relative;
//    img{
//      position: absolute;
//      top: 0.14rem;
//      right: 0.19rem;
//      width: 0.27rem;
//      height: 0.16rem;
//    }
//  }
//  img {
//    width: 100%;
//    height: 100%;
//  }
//}
//.comeFrom {
//  width: 100%;
//  display: flex;
//  justify-content: center;
//  position: fixed;
//  bottom: 0.2rem;
//
//  .comeFrom_text {
//    font-size: 0.12rem;
//    font-family: Jost-Regular, Jost;
//    font-weight: 400;
//    color: #000000;
//  }
//  .comeFrom_logo {
//    display: flex;
//    margin-left: 0.1rem;
//    img {
//      height: 0.16rem;
//    }
//  }
//}

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
</style>
