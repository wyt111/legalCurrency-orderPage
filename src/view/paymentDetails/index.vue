<template>
  <div id="paymentDetails">
    <div class="countDown">
      <el-progress type="circle" :width="130" :stroke-width=10 :percentage="timeValue" :color="colors"></el-progress>
      <div class="seeDetails" @click="details_state = true">
        <p>{{ $t('nav.paymentDetails_viewDetails1') }}</p>
        <p>{{ $t('nav.paymentDetails_viewDetails2') }}</p>
      </div>
    </div>
    <div class="payAmount">{{ infoObject.coinCount }} {{ infoObject.coin }}</div>
    <div class="QRCodeView">
      <div class="qrcodeLogo" v-if="payMethodLogoState"><img :src="this.$store.state.paymentType.imageAddress"></div>
      <div class="qrcode" ref="qrCodeUrl"></div>
    </div>
    <div class="QRCodeOptions" v-if="showAmountState">
      <p>{{ $t('nav.paymentDetails_qrCodeAmount') }}</p>
      <p><van-switch v-model="checked" @change="showAmount"/></p>
    </div>
    <div class="codeDescription">{{ $t('nav.paymentDetails_qrCodeExplain') }}</div>
    <div class="payForm">
      <div class="payFormLine">
        <div class="title">{{ $t('nav.paymentDetails_network') }}</div>
        <div class="formItem" @click="networkView === true ? network_state = true : network_state = false">
          <div class="text">{{ networkName }}</div>
          <div class="icon"><img src="@/assets/rightIcon2.png"></div>
        </div>
      </div>
      <div class="payFormLine" @click="copy" :data-clipboard-text="infoObject.coinCount">
        <div class="title">{{ $t('nav.paymentDetails_amountDue') }}</div>
        <div class="formItem">
          <div class="text">{{ infoObject.coinCount }} {{ infoObject.coin }}</div>
          <div class="icon"><img src="@/assets/copyIcon.png"></div>
        </div>
      </div>
      <div class="payFormLine" @click="copy" :data-clipboard-text="handleQrAddress">
        <div class="title">{{ $t('nav.paymentDetails_address') }}</div>
        <div class="formItem">
          <div class="text">{{ handleQrAddress }}</div>
          <div class="icon"><img src="@/assets/copyIcon.png"></div>
        </div>
      </div>
    </div>

    <!-- view details -->
    <van-popup v-model="details_state" round position="bottom" :style="{ height: '25%' }">
      <div class="mask-header">
        <span v-if="$store.state.language === 'EN'">{{ $t('nav.paymentDetails_detailsTitle') }} {{ timeText }}</span>
        <span v-else-if="$store.state.language === '中文'">请在{{ timeText }}内完成支付</span>
      </div>
      <div class="mask-line">
        <div class="title">{{ $t('nav.paymentDetails_transactionAmount') }}:</div>
        <div class="value">{{ infoObject.fiatAmount }} {{ infoObject.fiat }}</div>
      </div>
      <div class="mask-line">
        <div class="title">{{ $t('nav.paymentDetails_exchangeRate') }}:</div>
        <div class="value">{{ infoObject.fiatToCoinRate }} {{ infoObject.fiat }}/{{ infoObject.coin }}</div>
      </div>
      <div class="mask-line">
        <div class="title">{{ $t('nav.paymentDetails_amountDue') }}:</div>
        <div class="value">{{ infoObject.coinCount }} {{ infoObject.coin }}</div>
      </div>
    </van-popup>

    <!-- select nextwork -->
    <van-popup v-model="network_state" round position="bottom" :style="{ height: '25%' }">
      <div class="network-title">{{ $t('nav.paymentDetails_network') }}</div>
      <div class="network-line" v-for="(item,index) in networkList" :key="index" @click="choiseNetwork(item,index)">
        <div class="name">{{ item.currencyFullName }}</div>
        <div class="icon" v-if="item.state"><img src="@/assets/checkIcon.png"></div>
      </div>
    </van-popup>

    <springFrame class="springFrameView" v-show="springFrame_state" :timeNum="timeText"/>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard';
import springFrame from './childrens/countdownWarning';

export default {
  name: "paymentDetails",
  components: { springFrame },
  data(){
    return{
      timeValue: 0,
      colors: [
        {color: '#4479D9'},
      ],
      timeText: '00:00',
      countDown: null,

      showAmountState: false,
      checked: true,
      handleQrAddress: '',

      details_state: false,

      network_state: false,
      networkName: '',
      networkCode: '',
      networkList: [],
      networkView: false,

      springFrame_state: false,

      infoObject: {},
      oldPayAddress: '',
      payMethodLogoState: false,
    }
  },
  mounted() {
    document.getElementsByClassName('el-progress__text')[0].innerText = '00:00';
    if(this.$store.state.paymentType && this.$store.state.paymentType.currencyCode === "USDT"){
      this.networkView = true;
      this.queryNetwork();
    }else {
      this.networkView = false;
      this.networkName = this.$store.state.paymentType.chainName;
      this.refreshPayState();
    }
    if(this.$store.state.paymentType && (this.$store.state.paymentType.currencyCode === 'ETH' || this.$store.state.paymentType.currencyCode === 'BTC' || this.$store.state.paymentType.currencyCode === 'TRX')){
      this.showAmountState = true;
    }
  },
  destroyed() {
    clearInterval(this.countDown);
  },
  methods: {
    generateQRcode(){
      new QRCode(this.$refs.qrCodeUrl, {
        text: this.handleQrAddress,
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    //network List
    queryNetwork(){
      this.$axios.post(localStorage.getItem("baseUrl") + this.$api.post_networkList, '').then(res => {
        if (res && res.data) {
          //network default state
          res.data.map(item => {return item.state = false});
          res.data[0].state = true;
          this.networkName = res.data[0].currencyFullName;
          this.networkCode = res.data[0].currencyCode;
          this.networkList = res.data;
          this.refreshPayState();
        }
      })
    },
    //
    refreshPayState(){
      this.pay();
      this.countDown = setInterval(()=>{
        this.pay();
      },1000)
    },
    //Payment status interface
    pay(){
      let params = {
        sysOrderNum: localStorage.getItem("sysOrderNum"),
        payMent: this.$store.state.paymentType.payType,
        email: '',
      }
      this.$axios.post(localStorage.getItem("baseUrl") + this.$api.post_qrPay, params).then(res => {
        if(res && res.data){
          this.infoObject = res.data;
          //QR code processing
          if(this.oldPayAddress !== this.infoObject.qrAddress){
            this.handleQrAddress = res.data.qrAddress;
            this.$refs.qrCodeUrl.innerHTML = "";
            this.payMethodLogoState = true;
            this.generateQRcode();
          }
          this.oldPayAddress = res.data.qrAddress;

          this.infoObject.remainingPaymentTime -= 1;
          this.turnMinute(this.infoObject.remainingPaymentTime)
          document.getElementsByClassName('el-progress__text')[0] ?
              document.getElementsByClassName('el-progress__text')[0].innerText = this.timeText : '';
          //When the remaining time of the order is less than 10min, the time timer on the page changes to red
          if(this.infoObject.remainingPaymentTime <= 600){
            this.colors = [{color: '#FF0000'}];
            document.getElementsByClassName('el-progress__text')[0].style.color = '#FF0000';
          }
          this.infoObject.remainingPaymentTime === 600 ? this.springFrame_state = true : '';
          //Timing end order end
          this.infoObject.remainingPaymentTime <= 0 ? clearInterval(this.countDown) : '';

          //to result
          this.infoObject.payStatus !== 0 ? (this.$router.push('/overpayment'),this.$store.state.resultData = res.data) : '';
        }
      })
    },
    //QR code with amount
    showAmount(){
      if(this.checked === true && this.infoObject.qrAddress.indexOf("?") !== -1){
        this.handleQrAddress = this.infoObject.qrAddress;
      }else{
        this.handleQrAddress = this.infoObject.qrAddress.substr(0, this.infoObject.qrAddress.indexOf("?"));
      }
      this.$refs.qrCodeUrl.innerHTML = "";
      this.generateQRcode();
    },
    choiseNetwork(item,index){
      this.networkList.map(item => {
        return item.state = false;
      })
      this.networkList[index].state = true;
      this.network_state = false;
      this.networkCode = item.currencyCode;
      this.networkName = item.currencyFullName;
      clearInterval(this.countDown);
      this.$store.state.paymentType.payType = item.currencyCode;
      this.refreshPayState();
    },
    copy(){
      let clipboard = new Clipboard('.payFormLine');
      clipboard.on('success', () => {
        this.$toast('copy success');
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        clipboard.destroy()
      })
    },
    //Calculate minutes and seconds
    turnMinute(value){
      if(value >= 0){
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
        this.timeValue = (value / 900) * 100;
        this.timeValue > 100 ? this.timeValue = 100 : '';
      }
    },
  }
}
</script>

<style lang="scss" scoped>
#paymentDetails{
  width: 100%;
  height: 100%;
  .countDown {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.2rem;
    position: relative;
    &>div{
      display: flex;
    }
    img {
      width: 0.6rem;
    }
    .seeDetails{
      position: absolute;
      right: 0.2rem;
      display: block;
      text-align: center;
      font-size: 0.14rem;
      font-family: Jost-Medium, Jost;
      font-weight: 500;
      color: #4479D9;
      cursor: pointer;
    }
  }
  .payAmount{
    font-size: 0.18rem;
    font-family: Jost-SemiBold, Jost;
    font-weight: 600;
    color: #000000;
    text-align: center;
    margin-top: 0.25rem;
  }
  .QRCodeView{
    margin-top: 0.11rem;
    min-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .qrcode{
      height: 100% !important;
    }
    .qrcodeLogo{
      position: absolute;
      top: 38%;
      left: 44.5%;
      background: #FFFFFF;
      border-radius: 50%;
      width: 0.46rem;
      height: 0.46rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 0.3rem;
        height: 0.3rem;
      }
    }
  }
  .QRCodeOptions{
    width: 2rem;
    margin: 0.1rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    p:nth-of-type(2){
      margin-left: auto;
    }
  }
  .codeDescription{
    font-size: 0.14rem;
    font-family: Jost-Regular, Jost;
    font-weight: 400;
    color: #666666;
    text-align: center;
    padding: 0.1rem 0.4rem;
    word-break: break-all;
  }
  .payForm{
    padding: 0 0.2rem;
    .payFormLine{
      margin-top: 0.2rem;
      cursor: pointer;
      .title{
        font-size: 0.16rem;
        font-family: Jost-Medium, Jost;
        font-weight: 500;
        color: #000000;
      }
      .formItem{
        height: 0.44rem;
        line-height: 0.44rem;
        background: #F3F4F5;
        border-radius: 4px;
        padding: 0 0.1rem;
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        .text{
          font-size: 0.14rem;
          font-family: Jost-Medium, Jost;
          font-weight: 500;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon{
          margin-left: auto;
          img{
            height: 0.14rem;
          }
        }
      }
    }
  }

  .mask-header{
    height: 0.46rem;
    background: #F6F6F6;
    font-size: 0.16rem;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #000000;
    text-align: center;
    line-height: 0.46rem;
  }
  .mask-line{
    padding: 0.2rem 0.2rem 0 0.2rem;
    display: flex;
    align-items: center;
    font-size: 0.14rem;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #000000;
    .value{
      margin-left: auto;
    }
  }

  .network-title{
    font-size: 0.18rem;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #000000;
    padding: 0.1rem 0;
    text-align: center;
  }
  .network-line{
    border-bottom: 1px solid #F6F6F6;
    padding: 0.1rem 0;
    margin-left: 0.2rem;
    display: flex;
    align-items: center;
    .name{
      font-size: 0.16rem;
      font-family: Jost-Medium, Jost;
      font-weight: 500;
      color: #000000;
    }
    .icon{
      display: flex;
      margin-left: auto;
      margin-right: 0.2rem;
      img{
        width: 0.19rem;
      }
    }
    &:first-child{
      padding-top: 0;
    }
  }

  .springFrameView{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

// element ui CountDown
.countDown ::v-deep .el-progress__text{
  font-size: 0.14rem;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #4479D9;

}
.countDown ::v-deep .el-progress-circle{
  height: 0.75rem !important;
  width: 0.75rem !important;
}

//vant switch
.QRCodeOptions ::v-deep .van-switch{
  width: 0.3rem;
  height: 0.15rem;
  font-size: inherit;
}
.QRCodeOptions ::v-deep .van-switch__node{
  width: 0.15rem;
  height: 0.15rem;
}

//vant Mask
#paymentDetails ::v-deep .van-overlay{
  background: rgba(0, 0, 0, 0.2) !important;
}
</style>
