<template>
  <div class="select-container">
    <div class="select-search">
      <input type="text" class="Input" @blur="isShowFn" v-model="search" @input="selectSearch">
      <div @click="isHideFn" v-show="isShow" >
        <img src="../../assets//search.png" alt="">
        <p>{{ $t('nav.searchPayment_wall') }}</p>
      </div>
    </div>
        <div class="select-content" v-for="item in selectSearch()" :key="item.id">
        <h2 v-if="(item.id === 1&& search === '')" v-show="isHide">{{ $t("nav.selectPayment") }}</h2>
        <h2 v-else-if="search === ''">{{ $t("nav.selectPayment_wall") }}</h2>
          <div class="sele-con" v-for="i in item.payList " :key="i.id" @click="payment(i,item)">
          <div class="left" >
            <img :src="i.imageAddress" alt="">
            <p>{{ i.currencyCode }} <span>- {{ i.currencyFullName }}</span></p>
          </div>
          <img class="right" src="../../assets/rightArrows.png" alt="">
        </div>
      </div>
  </div>
</template>
<script>
export default{
  name:'paymentSelect',
  data(){
    return {
      isShow:true,
      search:'',
      isHide:false,
      selectData:null,
    }
  },
  methods:{
    isHideFn(){
      this.isShow = false
      document.querySelector('.Input').focus();
    },
    isShowFn(){
      setTimeout(() => {
        this.search = ''
        this.isShow = true
      }, 100);
    },
    selectSearch(){
      if(this.selectData){
         let n = [
          {
            id:1,
            payList:this.selectData[0].payList.slice(this.selectData[0].payList.length-1)
          },
          {id:2,
              payList:this.selectData[0].payList.slice(0,this.selectData[0].payList.length-1)
          }
        ]
        if(n[0].payList.length===0){
          this.isHide = false
        }else{
          this.isHide = true
        }
      if(this.search){
       return this.selectData.map(item=>{
         let obj = {}
          obj.payList = item.payList.filter(i=>{
            if(i.currencyCode.toUpperCase().includes(this.search.toUpperCase()) || i.currencyFullName.toUpperCase().includes(this.search.toUpperCase())){
              return i
            }
          })
          return obj

        })
      }else{
        return n
      }
      }
    },
    payment(payment){
      this.$store.state.paymentType = payment
      this.$store.state.binancePayment = 'payList';
      this.$store.state.isTips = this.selectData[0]
      if(this.selectData[0].isEmail === 1 && payment.payType !== 'w1' && this.$store.state.paymentEmail===''){
          this.$router.push({
            path:'/paymentEmail',
          })
      }else{
        if(payment.payType === 'w1'){
          this.$router.push('/binancePayment')
        }else{
          this.$router.push('/paymentDetails')
        }
      }
      
    },
    selectAxios(){
      let params = {
        "merchantCode":this.$store.state.merchantCode
      }
      this.$axios.post(this.$api.post_payList,params).then(res=>{
        if(res && res.data){
          this.selectData = [res.data]
        }
      })
    }
  },
  created(){
    this.selectAxios()
  }

}

</script>
<style lang="scss" scoped>
.select-container{
  width: 400px;
  height: 650px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  font-family: Jost-Regular, Jost;
  border-radius: 15px;
  padding: 0px 0 30px 0;
  box-sizing: border-box;
  margin:0 auto;
  
  .select-search{
    width: 100%;
    height: 90px;
    background: #FFFFFF;
    padding: 20px 20px 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    z-index: 999;
    input{
      width: 99%;
      height: 44px;
      border-radius: 4px;
      background: #F3F4F5;
      border: none;
      outline:none;
      text-indent: 20px;
    }
    div{
      width: 100%;
      // height: 100%;
      color: #999999;
      font-size: 12px;
      position: absolute;
      left:0;
      top: 53%;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 14px;
        height: 14px;
        margin-right: 6px;
      }
    }
  }
  .select-content{
    width: 100%;
    padding: 0 20px 0 20px ;
    box-sizing: border-box;
    position: relative;
    .dataStyle{
      text-align: center;
      margin-top: 50%;
    }
    h2{
      font-size: 16px;
      color: #000;
      margin-top: 20px;
    }
    .sele-con{
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
      cursor: pointer;
      .left{
       height: 100%;
       font-size: 14px;
       display: flex;
       align-items: center;
       span{
         color:#666666;
       }
       img{
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 20px;
       }
      }
      .right{
        width: 15px;
        height: 15px;
      }
    }
  }
}
@media screen and (max-width:768px){
 .select-container{
  width: 100%;
  height: 100%;
  font-size: .2rem;
  height: 100%;
  font-family: Jost-Regular, Jost;
  border-radius: 0;
   box-shadow: 0 0 0 0 #fff;
  z-index: 0;
  .select-search{
    width: 100%;
    height: .8rem;
    background: #fff;
    padding: 0 .2rem 0 .2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    position: sticky;
    top: 0px;
    z-index: 999;
    input{
      width: 99%;
      height: .44rem;
      border-radius: .04rem;
      background: #F3F4F5;
      border: none;
      outline:none;
      text-indent: .2rem;
    }
    div{
      width: 100%;
      height: 100%;
      color: #999999;
      font-size: .12rem;
      position: absolute;
      left:0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: .15rem;
        height: .15rem;
        margin-right: .1rem;
      }
    }

  }
  .select-content{
    width: 100%;
    padding: 0 .2rem 0 .2rem ;
    box-sizing: border-box;
    position: relative;
    .dataStyle{
      text-align: center;
      margin-top: 50%;
    }
    h2{
      font-size: .16rem;
      color: #000;
      margin-top: .2rem;
    }
    .sele-con{
      width: 100%;
      height: .35rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: .2rem;
      cursor: pointer;
      .left{
       height: 100%;
       font-size: .14rem;
       display: flex;
       align-items: center;
       span{
         color:#666666;
       }
       img{
          width: .3rem;
          height: .3rem;
          border-radius: 50%;
          margin-right: .2rem;
       }
      }
      .right{
        width: .15rem;
        height: .15rem;
      }
    }
  }

  .seartitle{
    width: 100%;
    text-align: center;
    font-size: .14rem;
    color: #c9c2c2;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

  }
}
}


</style>
