<template>
  <div id="paymentDetails" v-if="payment_isShow">
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
        <div class="formItem" @click="networkShow">
          <div class="text">{{ networkName }}</div>
          <div class="icon"><img src="@/assets/rightIcon2.png"></div>
        </div>
      </div>
      <div class="isShow" v-show="networt_isShow">
          <div v-for="(item,index) in networkList" :key="item.id" @click="choiseNetwork(item,index)" :style="{borderTop:networkList.length>1&&index/2!==0?'1px solid #E6E6E7FF':'none'}">
            <p>{{item.currencyFullName}} </p>
            <img v-if="item.state" src="@/assets/checkIcon.png" alt="">
          </div>
      </div>
      <div class="payFormLine" @click="copy" :data-clipboard-text="infoObject.coinCount">
        <div class="title">{{ $t('nav.paymentDetails_amountDue') }}</div>
        <div class="formItem">
          <div class="text">{{ infoObject.coinCount }} {{ infoObject.coin }}</div>
          <div class="icon"><img src="@/assets/copyIcon.png"></div>
        </div>
      </div>
      <div class="payFormLine" @click="copy" :data-clipboard-text="displayAddress">
        <div class="title">{{ $t('nav.paymentDetails_address') }}</div>
        <div class="formItem">
          <div class="text">{{ displayAddress }}</div>
          <div class="icon"><img src="@/assets/copyIcon.png"></div>
        </div>
      </div>
    </div>

    <!-- view details -->
    <van-popup v-model="details_state" round :position="bottom_top()" :style="{ height: bottom_top()==='top'?'29%':'25%' }">
      <div class="mask-header">
        <span v-if="$store.state.languageValue === 'en'">{{ $t('nav.paymentDetails_detailsTitle') }} {{ timeText }}</span>
        <span v-else-if="$store.state.languageValue === 'zh-CN'">请在{{ timeText }}内完成支付</span>
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
  <div v-else id="paymentDetails"></div>
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
      displayAddress: '',
      handleQrAddress: '',

      details_state: false,

      network_state: false,
      networkName: '',
      networkCode: '',
      networkList: [],
      networkView: false,
      network:false,
      springFrame_state: false,
      networt_isShow:false,

      infoObject: {},
      oldPayAddress: '',
      payMethodLogoState: false,
      payment_isShow:false
    }
  },
  mounted() {
    // document.getElementsByClassName('el-progress__text')[0].innerText = '00:00';
    if(this.$store.state.paymentType && this.$store.state.paymentType.currencyCode === "USDT"){
      this.networkView = true;
      this.queryNetwork();
    }else {
      this.networkView = false;
      this.networkName = this.$store.state.paymentType.chainName
      this.refreshPayState();
    }
     if(this.$store.state.paymentType ){
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
      this.$axios.post(this.$api.post_networkList, '').then(res => {
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
        sysOrderNum: this.$route.query.id,
        payMent: this.$store.state.paymentType.payType,
        email: this.$store.state.paymentEmail,
      }
      this.$axios.post(this.$api.post_qrPay, params).then(res => {
        if(res && res.data){
          this.infoObject = res.data;
          this.$store.state.binanData = res.data
          this.payment_isShow = true
          this.$store.state.payentAmite = this.infoObject.coin
          res.data.chainName !== null && res.data.chainName !== '' ? this.networkName = res.data.chainName : '';
          //QR code processing
          if(this.oldPayAddress !== this.infoObject.qrAddress){
             this.handleQrAddress = res.data.qrAddress;
              this.displayAddress = res.data.qrAddress.slice(res.data.qrAddress.indexOf(":")+1,res.data.qrAddress.indexOf("?"))
              this.payMethodLogoState = true;
                //innnerHTML error  
               let id = setInterval(()=>{
                 let qrCodeUrl = this.$refs.qrCodeUrl
                 if(qrCodeUrl===undefined){
                   qrCodeUrl = this.$refs.qrCodeUrl
                 }else{
                   clearInterval(id)
                   this.$refs.qrCodeUrl.innerHTML = ""
                  this.generateQRcode()
                 }
               },100)
              //  this.$refs.qrCodeUrl.innerHTML = ""
              //     this.generateQRcode()
          }
          this.oldPayAddress = res.data.qrAddress;
          
          this.infoObject.remainingPaymentTime -= 1;
          this.turnMinute(this.infoObject.remainingPaymentTime)
              document.getElementsByClassName('el-progress__text')[0] ?
              document.getElementsByClassName('el-progress__text')[0].innerText = this.timeText : '';
          //When the remaining time of the order is less than 10min, the time timer on the page changes to red
          if(this.infoObject.remainingPaymentTime <= 600 && res.data){
        
              this.colors = [{color: '#FF0000'}];
             document.getElementsByClassName('el-progress__text')[0]?document.getElementsByClassName('el-progress__text')[0].style.color = '#FF0000':''
          }
          
          this.infoObject.remainingPaymentTime === 600 ? this.springFrame_state = true : '';
          //to result
          if(this.infoObject.remainingPaymentTime<=0){
            clearInterval(this.countDown)
            this.$store.state.resultData = res.data
            if(this.$store.state.resultData.payStatus===0){
              this.$store.state.resultData.payStatus = 4;
              this.$router.push('/overpayment')
            }
            this.$router.push('/overpayment')
            clearInterval(this.countDown)
          }else if(this.infoObject.remainingPaymentTime>0 && this.infoObject.payStatus!==0){
            this.$store.state.resultData = res.data
            this.$router.push('/overpayment')
            return false
          }
          
        }
      })
    },
    //QR code with amount
    showAmount(){
      if(this.checked === true && this.infoObject.qrAddress.indexOf("?") !== -1){
        this.handleQrAddress = this.infoObject.qrAddress;
      }else{
        this.handleQrAddress = this.infoObject.qrAddress.slice(this.infoObject.qrAddress.indexOf(":")+1, this.infoObject.qrAddress.indexOf("?"));
      }
      this.$refs.qrCodeUrl.innerHTML = "";
      this.generateQRcode();
    },
    choiseNetwork(item,index){
      this.networkList.map(item => {
        return item.state = false;
      })
      this.networt_isShow = false
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
    bottom_top(){
      let _width = document.documentElement.clientWidth || document.body.clientWidth
      return _width>768?'top':'bottom'
    },
    //network hide show
    networkShow(){
      let _width = document.documentElement.clientWidth || document.body.clientWidth
      let icon = document.querySelector('.formItem .icon img')
      if(_width<769){
         this.networkView === true ? this.network_state = true : this.network_state = false
         icon.src =require('@/assets/rightIcon2.png')
         this.networt_isShow = false
         return 
      }else{
        this.networkView === true ? this.networt_isShow = ! this.networt_isShow: this.networt_isShow = false
        this.networt_isShow?icon.src = require('@/assets/iconRight.png'):icon.src =require('@/assets/rightIcon2.png')
      }
     
    }
  },
  watch:{
    // Scroll to compatible 
    details_state(newVal){
      let box = document.querySelector('#paymentDetails')
      let _width = document.documentElement.clientWidth || document.body.clientWidth
      if(_width<769 && newVal){
        box.scrollTop = 0
        box.style = 'overflow-y:hidden'
        return 
      }else if(_width<769 && newVal===false){
        box.style = 'overflow-y:scroll'
        return 
      }else if(_width>769 && newVal){
        box.scrollTop = 0
        document.body.style = 'overflow-y:scroll !important'
        box.style = 'overflow-y:hidden'
        return
      }else{
        box.style = 'overflow-y:scroll'
      }
    },
    //overflow:hidden no body
    springFrame_state:{
      immediate:true,
      handler(newVal){
        if(newVal){
          this.$nextTick(()=>{
             document.querySelector('#paymentDetails').style = 'overflow:hidden'
          })
         
        }else{
          this.$nextTick(()=>{
             document.querySelector('#paymentDetails').style = 'overflow-y:scroll'
          })
        }
        
      }
    },
    //onreze
    network_state(newVal){
      let _width = document.documentElement.clientWidth || document.body.clientWidth
      let box =  document.querySelector('#paymentDetails')
      if(newVal&&_width<769){
        box.scrollTop = 0
        box.style.overflow = 'hidden'
      }else if(!newVal&&_width<769){
        box.style = 'overflow-y:scroll'
      }else if(newVal&&_width>769){
        box.scrollTop = 0
        box.style.overflow = 'hidden'
        document.body.style = 'overflow-y:scroll !important'
      }else{
        box.style.overflow = 'scroll'
        document.body.style = 'overflow-y:scroll !important'
      }
    },
    //isShow payment
    payment_isShow:{
      immediate:true,
      handler(newVal){
          this.pay()

            this.$nextTick(()=>{
            newVal && this.$store.state.resultData.payStatus===0?document.getElementsByClassName('el-progress__text')[0].innerText = '00:00'&&this.pay():''

         })
        
      }
    }
  },
  
}
</script>

<style lang="scss" scoped>
#paymentDetails{
  width: 400px;
  height: 650px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  margin: 0 auto;

  padding-bottom: 50px;
  position: relative;
  .countDown {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    position: relative;
    &>div{
      display: flex;
    }
    img {
      width: 60px;
    }
    .seeDetails{
      position: absolute;
      right: 20px;
      display: block;
      text-align: center;
      font-size:14px;
      font-family: Jost-Medium, Jost;
      font-weight: 500;
      color: #4479D9;
      cursor: pointer;
    }
  }
  .payAmount{
    font-size: 18px;
    font-family: Jost-SemiBold, Jost;
    font-weight: 600;
    color: #000000;
    text-align: center;
    margin-top: 25px;
  }
  .QRCodeView{
    margin-top: 11px;
    min-height: 200px;
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
      width: 46px;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 30px;
        height: 30px;
      }
    }
  }
  .QRCodeOptions{
    width: 200px;
    margin: 10px auto;
    font-family: Jost-Regular, Jost;
    display: flex;
    justify-content: center;
    align-items: center;
    p:nth-of-type(2){
      margin-left: auto;
    }
  }
  .codeDescription{
    font-size: 14px;
    font-family: Jost-Regular, Jost;
    font-weight: 400;
    color: #666666;
    text-align: center;
    padding: 10px 40px;
    word-wrap:break-word;
  }
  .payForm{
    padding: 0 20px;
    .isShow{
      width: 100%;
      background: #F3F4F5FF;
      border-radius: 4px;
      padding: 0px 0 10px 0;
      transition: 1s;
      position: relative;
      left: 0;
      top: 0;
      div{
        height: 44px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 10px 0;
        box-sizing: border-box;
        cursor: pointer;
        p{
          font-size: 14px;
          font-family: Jost-Regular, Jost;
        }
        img{
          width: 15px;
          height: 18px;
        }
      }
    }
    .payFormLine{
      margin-top: 20px;
      cursor: pointer;
      .title{
        font-size: 16px;
        font-family: Jost-Regular, Jost;
        font-weight: 500;
        color: #000000;
      }
      .formItem{
        margin-bottom: 20px;
      }
      .formItem{
        height: 44px;
        line-height: 44px;
        background: #F3F4F5;
        border-radius: 4px;
        padding: 0 10px;
        margin-top:10px;
        display: flex;
        align-items: center;
        .text{
          width: 90%;
          font-size: 14px;
          font-family: Jost-Regular, Jost;
          font-weight: 500;
          color: #000000;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .icon{
          margin-left: auto;
          img{
            height: 14px;
          }
        }
      }
    }
  }

  .mask-header{
    width: 100%;
    height: 46px;
    background: #F6F6F6;
    font-size: 14px;
    font-family: Jost-Regular, Jost;
    font-weight: 600;
    color: #000000;
    text-align: center;
    line-height: 46px;
    position: absolute;
    bottom: 0;
  }
  .mask-line{
    padding: 20px 20px 0 20px;
    display: flex;
    align-items: center;
    font-size: 14px; 
    font-family: Jost-Regular, Jost;
    font-weight: 500;
    color: #000000;
    .value{
      margin-left: auto;
    }
  }

  .network-title{
    font-size: 18px;
    font-family: Jost-Regular, Jost;
    font-weight: 500;
    color: #000000;
    padding: 10px 0;
    text-align: center;
  }
  .network-line{
    border-bottom: 1px solid #F6F6F6;
    padding: 10px 0;
    margin-left: 20px;
    display: flex;
    align-items: center;
    .name{
      font-size: 16px;
      font-family: Jost-Medium, Jost;
      font-weight: 500;
      color: #000000;
    }
    .icon{
      display: flex;
      margin-left: auto;
      margin-right: 20px;
      img{
        width: 19px;
      }
    }
    &:first-child{
      padding-top: 0;
    }
  }

  .springFrameView{
    padding: 40px 0 0 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

// element ui CountDown
.countDown ::v-deep .el-progress__text{
  font-size: 14px;
  font-family: Jost-Regular, Jost;
  font-weight: 400;
  color: #4479D9;

}
.countDown ::v-deep .el-progress-circle{
  height: 75px !important;
  width:75px !important;
}

//vant switch
.QRCodeOptions ::v-deep .van-switch{
  width: 30px;
  height:15px;
  font-size: inherit;
}
.QRCodeOptions ::v-deep .van-switch__node{
  width: 15px;
  height: 15px;
}

//vant Mask
#paymentDetails ::v-deep .van-overlay{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2) !important;
  position: absolute;
  left: 0;
  top: 0;
}

#paymentDetails ::v-deep .van-popup--round{
  width: 400px !important;
  position: absolute;
}
@media screen and (max-width:768px) {
  #paymentDetails{
  width: 100%;
  height: 100%;
  border-radius: 0;
  box-shadow: 0 0 0 0 #FFFFFF;
  padding: 0;
  font-family: Jost-Medium, Jost;
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
    font-family: Jost-Regular, Jost;
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
    font-family: Jost-Regular, Jost;
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
    .isShow{
      display: none;
    }
    .payFormLine{
      margin-top: 0.2rem;
      cursor: pointer;
      .title{
        font-size: 0.16rem;
        font-family: Jost-Regular, Jost;
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
          font-family: Jost-Regular, Jost;
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
    font-size: 0.14rem;
    font-family: Jost-Regular, Jost;
    font-weight: 600;
    color: #000000;
    text-align: center;
    line-height: 0.46rem;
    position: relative;
    top: 0;
  }
  .mask-line{
    padding: 0.2rem 0.2rem 0 0.2rem;
    display: flex;
    align-items: center;
    font-size: 0.14rem;
    font-weight: 500;
    color: #000000;
    .value{
      margin-left: auto;
    }
  }

  .network-title{
    font-size: 0.18rem;
    font-family: Jost-Regular, Jost;
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
      font-family: Jost-Regular, Jost;
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
  width: 100%;
  background: rgba(0, 0, 0, 0.2) !important;
}
#paymentDetails ::v-deep .van-popup--round{
  width: 100% !important;
}

}
</style>
