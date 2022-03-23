<template>
  <div class="select-container">
    <div class="select-search">
      <input type="text" class="Input" @blur="isShowFn" v-model="search">
      <div @click="isHideFn" v-show="isShow" >
        <img src="../../assets//search.png" alt="">
        <p>Search Wallet Currency</p>
      </div>
    </div>
    <div class="select-content" v-for="item in searchFn()" :key="item.id">
      <h2>{{ item.title }}</h2>
      <div class="sele-con" v-for="i in item.data" :key="i.id" @click="payment(i)">
        <div class="left" >
          <img src="../../assets/errorIcon.png" alt="">
          <p>{{ i.con1 }} <span>- {{ i.con }}</span></p>
        </div>
        <img class="right" src="../../assets/rightArrows.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name:'Select payment option',
  data(){
    return {
      isShow:true,
      search:'',
      isHide:false,
      selectData:[
        {
          id:1,
          title:'Payment Wallets',
          data:[
            {id:101,con:'Alchemy Pay',con1:'ACH'}
          ]
        },
        {
          title:'Payment Wallets',
           data:[
            {id:111,con:'Alchemy Pay',con1:'ACH'},
            {id:112,con:'Bitcoin',con1:'BTC'},
            {id:113,con:'Binance USD',con1:'BUSD'},
            {id:114,con:'Ethereum',con1:'ETH'},
            {id:115,con:'Tether',con1:'USDT'},
            {id:116,con:'Avalanche',con1:'AVAX'},
            {id:117,con:'Algorand',con1:'ALGO'}
          ]
        }
       
      ]
    }
  },
  methods:{
    //点击聚集焦点
    isHideFn(){
      this.isShow = false
      document.querySelector('.Input').focus();
    },
    //点击失去焦点时
    isShowFn(){
      setTimeout(() => {
        this.search = ''
        this.isShow = true
      }, 200);
    },
    //搜索
    searchFn(){
      const n = this.selectData
      if (this.search !== '') {
        // eslint-disable-next-line array-callback-return
        let n1 =  this.selectData.map(item=>{
          let obj = {}
          obj.data =  item.data.filter(i=>{
            if(i.con1.includes(this.search.toUpperCase()) === true || i.con.toUpperCase().includes(this.search.toUpperCase()) === true){
              return i
            } 
          })
          return obj
          
        })
        return n1
      } else {
        return n
      }
    },
    //点击单个支付
    payment(i){
      alert(i.con1)
    }
  }
 
}

</script>
<style lang="scss" scoped>

.select-container{
  width: 100%;
  font-size: .2rem;
  height: 100%;
  font-family: Jost-Regular, Jost;
  padding-top: .09rem;
  .select-search{
    width: 100%;
    height: .44rem;
    padding: 0 .2rem 0 .2rem;
    // font-family: Jost-Regular, Jost;
    box-sizing: border-box;
    position: relative;
    input{
      width: 99%;
      height: 100%;
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
        width: .1rem;
        height: .14rem;
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
</style>