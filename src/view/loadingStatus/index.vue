<template>
  <div id="loadingStatus">
    <img src="@/assets/loading.gif">
  </div>
</template>

<script>
export default {
  name: "loadingStatus",
  mounted(){
  
    let params = {
      "sysOrderNum": localStorage.getItem("sysOrderNum") //API148660202748314009 API149637939023643033
    }
    this.$axios.post(this.$api.post_info, params).then(res=>{
      if(res && res.data){
        this.$store.state.resultData = res.data
        this.$store.state.merchantCode = res.data.merchantCode;
        this.$store.state.cancelTo = res.data.cancelTo;
        this.$store.state.returnTo = res.data.returnTo;
        //binance
        if(res.data.payMent === "w1"){
          this.$router.replace("/binancePayment");
          this.$store.state.binancePayment = 'initialPag';
          this.$store.state.paymentType.chainName = '';
          return;
        }
        //select to 
        if(res.data.payMent === "" || res.data.payMent === null){
          this.$router.replace("/paymentSelect");
          this.$store.state.binancePayment = '';
          this.$store.state.paymentType.chainName = '';
          return;
        }
        
        if(res.data.payMent !== "w1" &&  res.data.payMent!=='' && res.data.payStatus===0){
          let params = {
                "merchantCode":res.data.merchantCode
              }
            this.$axios.post(this.$api.post_payList,params).then(res=>{
              if(res && res.data){
                  if(res.data.isEmail===1){
                    this.$store.state.isTips = res.data
                    this.$router.replace("/paymentEmail");
                  }else{
                    this.$router.replace("/paymentDetails");
                  }
              }
            })
        }
        if(res.data.payStatus!==0){
           this.$router.replace("/overPayment");
        }
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
  width: 400px;
  height: 650px;
  border-radius: 15px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  img{
    width: 150px;
    height: 150px;
  }
}
@media screen and (max-width:768px) {
  #loadingStatus{
    width: 100%;
    height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
   border-radius: 0;
  box-shadow: 0px 0px 0px 0px #fff;
  img{
    width: 1.5rem;
    height: 1.5rem;
  }
  
}
}
</style>
