<template>
  <div id="paymentDetails">
    <div class="countDown">
      <el-progress type="circle" :width="130" :stroke-width=10 :percentage="timeValue" :color="colors"></el-progress>
      <div class="seeDetails" @click="details_state = true">
        <p>view</p>
        <p>Details</p>
      </div>
    </div>
    <div class="payAmount">38.028484 USDT</div>
    <div class="QRCodeView">
      <div class="qrcode" ref="qrCodeUrl">
        <div class="qrcodeLogo"><img :src="this.$store.state.imageAddress"></div>
      </div>
    </div>
    <div class="QRCodeOptions" v-if="showAmountState">
      <p>With Amount:</p>
      <p><van-switch v-model="checked" @change="showAmount"/></p>
    </div>
    <div class="codeDescription">
      Scan the QR code or copy and paste the  payment
      details into your wallet.
    </div>
    <div class="payForm">
      <div class="payFormLine" @click="network_state = true">
        <div class="title">Network</div>
        <div class="formItem">
          <div class="text">TRC20</div>
          <div class="icon"><img src="@/assets/rightIcon2.png"></div>
        </div>
      </div>
      <div class="payFormLine" @click="copy" :data-clipboard-text="timeValue">
        <div class="title">Amount Due</div>
        <div class="formItem">
          <div class="text">38.028484 USDT</div>
          <div class="icon"><img src="@/assets/copyIcon.png"></div>
        </div>
      </div>
      <div class="payFormLine" @click="copy" :data-clipboard-text="timeValue">
        <div class="title">Address</div>
        <div class="formItem">
          <div class="text">123456789098765432345678e</div>
          <div class="icon"><img src="@/assets/copyIcon.png"></div>
        </div>
      </div>
    </div>

    <!-- view details -->
    <van-popup v-model="details_state" round position="bottom" :style="{ height: '25%' }">
      <div class="mask-header">Please complete payment within 12:11</div>
      <div class="mask-line">
        <div class="title">Transaction Amount:</div>
        <div class="value">100.00 SGD</div>
      </div>
      <div class="mask-line">
        <div class="title">Exchange Rate:</div>
        <div class="value">1.33 SGD/USDT</div>
      </div>
      <div class="mask-line">
        <div class="title">Amount Due:</div>
        <div class="value">32.01 USDT</div>
      </div>
    </van-popup>

    <!-- select nextwork -->
    <van-popup v-model="network_state" round position="bottom" :style="{ height: '25%' }">
      <div class="network-title">Network</div>
      <div class="network-line" v-for="(item,index) in networkList" :key="index" @click="choiseItem(item,index)">
        <div class="name">{{ item.name }}</div>
        <div class="icon" v-if="item.state"><img src="@/assets/checkIcon.png"></div>
      </div>
    </van-popup>

    <springFrame class="springFrameView" v-show="springFrame_state"/>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2';
import Clipboard from 'clipboard';
import springFrame from './childrens/countdownWarning';

export default {
  name: "Payment details",
  components: { springFrame },
  data(){
    return{
      timeValue: 0,
      colors: [
        {color: '#4479D9'},
      ],
      timeText: '',
      countDown: null,

      showAmountState: false,
      checked: true,

      details_state: false,

      network_state: false,
      networkList: [
        {name: 'TRC20',state: true},
        {name: 'ERC20',state: false}
      ],

      springFrame_state: false,

      infoObject: {},
    }
  },
  mounted() {
    document.getElementsByClassName('el-progress__text')[0].innerText = '00:00';
    this.generateQRcode();
    this.refreshPayState();
  },

  methods: {
    generateQRcode(){
      new QRCode(this.$refs.qrCodeUrl, {
        text: '请购买',
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
    },
    refreshPayState(){
      this.pay();
      this.countDown = setInterval(()=>{
        this.pay();
      },3000)
    },
    pay(){
      let params = {
        sysOrderNum: this.$store.state.sysOrderNum,
        payMent: this.$store.state.payType,
        email: '',
      }
      this.$axios.post(localStorage.getItem("baseUrl") + this.$api.post_qrPay, params).then(res => {
        if(res && res.data){
          this.infoObject = res.data;
          this.infoObject.remainingPaymentTime -= 1;
          this.turnMinute(this.infoObject.remainingPaymentTime)
          document.getElementsByClassName('el-progress__text')[0] ?
              document.getElementsByClassName('el-progress__text')[0].innerText = this.timeText : '';
          //When the remaining time of the order is less than 10min, the time timer on the page changes to red
          if(this.infoObject.remainingPaymentTime <= 600){
            this.colors = [{color: '#FF0000'}];
            document.getElementsByClassName('el-progress__text')[0].style.color = '#FF0000';
          }
          //Timing end order end
          this.infoObject.remainingPaymentTime === 0 ? clearInterval(this.countDown) : '';
        }
      })
    },
    showAmount(){
      console.log(this.checked)
    },
    choiseItem(item,index){
      this.networkList.map(item => {
        return item.state = false;
      })
      this.networkList[index].state = true;
      this.network_state = false;
    },
    copy(){
      let clipboard = new Clipboard('.payFormLine');
      clipboard.on('success', () => {
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        clipboard.destroy()
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
      this.timeValue = (value / 3600) * 100;
      this.timeValue > 100 ? this.timeValue = 100 : '';
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
    .qrcode{
      height: 100% !important;
      position: relative;
    }
    .qrcodeLogo{
      position: absolute;
      top: 35%;
      left: 38%;
      background: #FFFFFF;
      border-radius: 50%;
      padding: 0.08rem;
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
