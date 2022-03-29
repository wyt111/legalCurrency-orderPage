<template>
  <div class="refundLoading-container">
    <div class="title" v-if="isShow">
        <img src="@/assets/successIcon.png" alt="">
        <h2>Refund completed</h2>
      </div>
      <div class="title" v-else>
        <img src="@/assets/loading.gif" alt="">
        <h2>Refund processing…</h2>
      </div>
      <ul class="content">
        <li>
          <p>Payment amount:</p>
          <p>123 CNY</p>
        </li>
        <li>
          <p>Amounts payable:</p>
          <p>22 USDT</p>
        </li>
        <li>
          <p>The amount actually paid:</p>
          <p>24 BTC</p>
        </li>
        <li>
          <p>Refund amount:</p>
          <p>2 USDT</p>
        </li>
        <li>
          <p>Amount received:</p>
          <p>1 USDT</p>
        </li>
      </ul>
      <ul class="nrtwork">
        <li>
          <p>Address:</p>
          <p>213456789dfh2345km21</p>
        </li>
        <li>
          <p>Nrtwork:</p>
          <p>TRC20</p>
        </li>
        <li v-show="isShow">
          <p>Hash:</p>
          <p>213456DFVD23456</p>
        </li>
        <li>
          <p>fill time:</p>
          <p>2020-03-23 14:23:34</p>
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
          isShow:false
        }
      },
      mounted(){
        setTimeout(()=>{
          this.isShow = true
        },3000)
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
    background: #F3F4F5;
    padding: 0 .2rem .2rem .2rem;
    border-radius: .04rem;
    box-sizing: border-box;
    margin: .2rem 0 .2rem;
    overflow: hidden;
    li{
      width: 100%;
      height: .2rem;
      margin-top: .2rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .footer{
    width: 100%;
    font-size: .12rem;
    color: #4479D9;
    line-height: 18px;
  }
}
</style>