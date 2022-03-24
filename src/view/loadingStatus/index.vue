<template>
  <div id="loadingStatus">
    <img src="@/assets/loading.gif">
  </div>
</template>

<script>
export default {
  name: "index",
  mounted(){
    let baseUrl = localStorage.getItem('baseUrl')
    let params = {
      "sysOrderNum": localStorage.getItem("sysOrderNum") //API148660202748314009 API149637939023643033
    }
    this.$axios.post(baseUrl + this.$api.post_info, params).then(res=>{
      if(res && res.data){
        this.$store.state.merchantCode = res.data.merchantCode;
        this.$store.state.cancelTo = res.data.cancelTo;
        res.data.payMent === "w1" ? (this.$router.replace("/binancePayment"),this.$store.state.binancePayment = 'initialPag') : (this.$router.replace("/paymentSelect"),this.$store.state.binancePayment = '');
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
