<template>
  <div class="refundLoading-container">
    <div class="title4">On-chain transfers will be charged a handling fee of 1USDT, and the estimated amount you will receive is 1USDT.</div>
    <div class="title" v-if="loadingData.refundStatus===2">
        <img src="@/assets/successIcon.png" alt="">
        <h2>Refund completed</h2>
      </div>
      <div class="title" v-else>
        <img src="@/assets/loading1.gif" alt="">
        <h2>Refund processing…</h2>
      </div>
      <ul class="content">
        <li>
          <p>Receipt amount:</p>
          <p>{{ loadingData.currencyAmount }} {{ loadingData.currencyCode }}</p>
        </li>
        <li>
          <p>Amounts payable:</p>
          <p>{{ loadingData.realCount }} {{ loadingData.digitalCurrencyCode }}</p>
        </li>
        <li>
          <p>The amount actually paid:</p>
          <p>{{ loadingData.coboRealCount }} {{ loadingData.digitalCurrencyCode }}</p>
        </li>
        <li>
          <p>Refund amount:</p>
          <p>{{ loadingData.refundCount }} {{ loadingData.refundUnit }}</p>
        </li>
        <li>
          <p>Amount received:</p>
          <p>{{ loadingData.refundCount-1 }} {{ loadingData.refundUnit }}</p>
        </li>
      </ul>
      <ul class="nrtwork">
        <li>
          <p>Address:</p>
          <p>{{ loadingData.address}}</p>
        </li>
        <li>
          <p>Nrtwork:</p>
          <p>{{ loadingData.network }}</p>
        </li>
        <li v-if="loadingData.refundStatus===2">
          <p>Hash:</p>
          <p>{{ loadingData.hash }}</p>
        </li>
        <li v-if="loadingData.refundStatus===2">
          <p>fill time:</p>
          <p>{{ loadingData.refundCompleteTime }}</p>
        </li>
        <li v-else>
          <p>fill time:</p>
          <p>{{ loadingData.refundTime }}</p>
        </li>
      </ul>
      <div class="footer">
        Remarks: On-chain transfers will be charged a handling fee of 1USDT, and the estimated amount you will receive is 1USDT.
      </div>
  </div>
</template>
<script>
  export default{
      data(){
        return {
          isShow:false,
          loadingData:'',
          Id:null
        }
      },
      mounted(){
        let params = {
        "sysOrderNum":sessionStorage.getItem('emailId')
      }
        this.Id = setInterval(()=>{
          this.$axios.post(this.$api.post_Addrss,params).then(res=>{
            if(res && res.data){
              if(res.data.refundStatus===2){
                this.loadingData = res.data
                clearInterval(this.Id)
              }
            }
          })
        },1000)
      },
      destroyed(){
        clearInterval(this.Id)
      }
  }

</script>
<style lang="scss" scoped>
.refundLoading-container{
  width: 400px;
  padding: 120px 0 0 0;
  font-family: Jost-Regular, Jost;
  box-sizing: border-box;
  margin:  0 auto;
  .title4{
    width: 100%;
    height: 60px;
    background: #EEF4FFFF;
    font-size: 14px;
    color: #566E9AFF;
    line-height: 60px;
    text-align: center;
    position: absolute;
    left: 0;
    top: 110px;
    overflow: hidden;
  }
  .title{
    width: 100%;
    height: 120px;
    text-align: center;
    >img{
      width: 60px;
      height: 60px;
    }
    h2{
      font-size: 16px;
      margin-top: 5px;
    }
  }
  .content{
    width: 100%;
    height: 220px;
    background: #F3F4F5;
    border-radius: 4px;
    margin-top: 20px;
    padding: 0 20px 0 20px;
    font-size: 14px;
    box-sizing: border-box;
    li{
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
  .nrtwork{
    width: 100%;
    font-size: 14px;
    background: #F3F4F5;
    padding: 0 20px 20px 20px;
    border-radius: 4px;
    box-sizing: border-box;
    margin: 20px 0 20px;
    overflow: hidden;
    li{
      width: 100%;
      height: 40px;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      >p:nth-of-type(2){
        width: 50%;
        text-align: right;
        word-wrap:  break-word;
        word-break:  normal;
      }
    }
  }
  .footer{
    width: 100%;
    font-size: 12px;
    color: #4479D9;
    line-height: .18rem;
    display: none;
  }
}
@media screen and (max-width:768px) {
  .refundLoading-container{
  width: 100%;
  padding: .5rem .2rem 1rem .2rem;
  font-family: Jost-Regular, Jost;
  box-sizing: border-box;
  .title{
    width: 100%;
    height: .8rem;
    text-align: center;
    >img{
      width: .4rem;
      height: .4rem;
    }
    h2{
      font-size: .16rem;
      margin-top: .05rem;
    }
  }
  .title4{
    display: none;
  }
  .content{
    width: 100%;
    height: 2.2rem;
    background: #F3F4F5;
    border-radius: .04rem;
    margin-top: .2rem;
    padding: 0 .2rem 0 .2rem;
    font-size: .14rem;
    box-sizing: border-box;
    li{
      display: flex;
      justify-content: space-between;
      margin-top: .2rem;
    }
  }
  .nrtwork{
    width: 100%;
    font-size: .14rem;
    background: #F3F4F5;
    padding: 0 .2rem .2rem .2rem;
    border-radius: .04rem;
    box-sizing: border-box;
    margin: .2rem 0 .2rem;
    overflow: hidden;
    li{
      width: 100%;
      height: .4rem;
      margin-top: .2rem;
      display: flex;
      justify-content: space-between;
      >p:nth-of-type(2){
        width: 50%;
        text-align: right;
        word-wrap:  break-word;
        word-break:  normal;
      }
    }
  }
  .footer{
    width: 100%;
    font-size: .12rem;
    color: #4479D9;
    line-height: .18rem;
    display: block;
  }
}
}
</style>