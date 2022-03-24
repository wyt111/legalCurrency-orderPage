<template>
  <div id="loadingStatus">

  </div>
</template>

<script>
export default {
  name: "index",
  mounted(){
    let baseUrl = localStorage.getItem("baseUrl")
    let params = {
      "sysOrderNum": this.$store.state.sysOrderNum, //API148660202748314009 API149637939023643033
    }
    this.$axios.post(baseUrl + this.$api.post_qrPay, params).then(res=>{
      if(res && res.data){
        this.$store.state.merchantCode = res.data.merchantCode;
      }
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
