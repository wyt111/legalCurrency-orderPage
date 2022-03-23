<template>
  <div id="countdownWarning">
    <div class="warningView">
      <div class="title">Complete Payment By:</div>
      <div class="countDown-amount">{{ timeNum }}</div>
      <div class="warning-content">
        <div class="title">
          <div><img src="@/assets/timeIcon.png"></div>
          <div>Awaiting Payment</div>
        </div>
        <div class="text">This invoice will expire soon. Please ensure payment is completed within the remaining time.</div>
        <div class="options" @click="closeWarming">GOT IT</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "countdownWarning",
  props: ["timeNum"],
  watch: {
    'timeNum': {
      deep: true,
      immediate: true,
      handler() {

      }
    }
  },
  methods: {
    closeWarming(){
      this.$parent.springFrame_state = false;
    }
  }
}
</script>

<style lang="scss" scoped>
#countdownWarning{
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  .title{
    font-size: 0.24rem;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #000000;
    text-align: center;
    img{
      width: 0.2rem;
    }
  }
  .countDown-amount{
    margin-top: 0.1rem;
    font-size: 0.48rem;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #FF0000;
    text-align: center;
  }
  .warning-content{
    width: 90%;
    margin: 0.4rem auto;
    background: #FFFFFF;
    border-radius: 15px;
    .title{
      border-radius: 15px 15px 0 0;
      display: flex;
      font-size: 0.16rem;
      font-family: Jost-Medium, Jost;
      font-weight: 500;
      color: #000000;
      padding: 0.12rem 0.2rem;
      background: #F6F6F6;
      &>div:last-child{
        margin-left: 0.1rem;
      }
    }
    .text{
      font-size: 0.14rem;
      font-family: Jost-Regular, Jost;
      font-weight: 400;
      color: #000000;
      padding: 0.18rem 0.2rem 0.43rem 0.2rem;
    }
    .options{
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.16rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #4479D9;
      border-top: 1px solid #F6F6F6;
      cursor: pointer;
    }
  }
}
</style>
