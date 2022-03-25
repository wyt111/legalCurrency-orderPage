<template>
  <div id="loadingStatus">
    <img src="@/assets/loading.gif">
  </div>
</template>

<script>
export default {
  name: "loadingStatus",
  mounted(){
    //sotre order id
    this.$route.query.id ? localStorage.setItem("sysOrderNum",this.$route.query.id) : '';

    let baseUrl = localStorage.getItem('baseUrl');
    let params = {
      "sysOrderNum": localStorage.getItem("sysOrderNum") //API148660202748314009 API149637939023643033
    }
    this.$axios.post(baseUrl + this.$api.post_info, params).then(res=>{
      if(res && res.data){
        this.$store.state.merchantCode = res.data.merchantCode;
        this.$store.state.cancelTo = res.data.cancelTo;
        this.$store.state.returnTo = res.data.returnTo;
        if(res.data.payMent === "w1"){
          this.$router.replace("/binancePayment");
          this.$store.state.binancePayment = 'initialPag';
          return;
        }
        if(res.data.payMent === "" || res.data.payMent === null){
          this.$router.replace("/paymentSelect");
          this.$store.state.binancePayment = '';
          return;
        }
        this.$router.replace("/paymentDetails");
        this.$store.state.binancePayment = 'initialPag';
        this.$store.state.paymentType.payType = res.data.payMent;
        this.$store.state.paymentType.currencyCode = res.data.coin;
        this.$store.state.paymentType.imageAddress = res.data.qrIcon;
        this.$store.state.paymentType.chainName = res.data.chainName;
      }
    })
  }
}
</script>

<style lang="scss" scoped>
#loadingStatus{
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>
