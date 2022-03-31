<template>
  <div class="refundLoading-container">
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
          loadingData:''
        }
      },
      mounted(){
        let params = {
        "sysOrderNum":this.$route.query.Id
      }
        let Id = setInterval(()=>{
          this.$axios.post(this.$api.post_Addrss,params).then(res=>{
            if(res && res.data){
              if(res.data.refundStatus===2){
                this.loadingData = res.data
                clearInterval(Id)
              }
            }
          })
        },1000)
        console.log(Id);
      }
  }

</script>
<style lang="scss" scoped>
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
        word-wrap:  break-word;   /*使用css换行*/
        word-break:  normal;
      }
    }
  }
  .footer{
    width: 100%;
    font-size: .12rem;
    color: #4479D9;
    line-height: .18rem;
  }
}
</style>