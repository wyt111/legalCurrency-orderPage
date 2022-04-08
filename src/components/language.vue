<template>
  <div id="selectLanguage">
    <div class="language-line" v-for="(item,index) in languageList" :key="index" @click="choiseItem(item,index)">
      <div class="name">{{ item.name }}</div>
      <div class="icon" v-if="item.state"><img src="@/assets/checkIcon.png"></div>
    </div>
  </div>
</template>

<script>
import i18n from "@/utils/i18n";

export default {
  name: "language",
  data(){
    return{
      languageList: [
        {name: 'EN',value: 'en',state: true},
        {name: '中文',value: 'zh-CN',state: false}
      ],
      widthSize:document.body.clientWidth || document.documentElement.clientWidth
    }
  },
  mounted(){
    this.initializationData();
  },
  methods: {
    initializationData(){
      this.$nextTick(()=>{
        this.languageList.map(item => {
          return item.value === this.$store.state.languageValue ? item.state = true : item.state = false;
        })
      })
    },
    choiseItem(item,index){
      this.languageList.map(item => {
        return item.state = false;
      })
      this.languageList[index].state = true;
      this.$store.state.languageValue = item.value;
      this.$store.state.languageName = item.name;
      i18n.locale = item.value;
      this.$parent.$refs.headerRef.openLanguage();
    }
  }
}
</script>

<style lang="scss" scoped>
  #selectLanguage{
  width: 130px;
  height: 650px;
  background: #FFFFFFFF;
  padding: 20px 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  display: block;
  position: absolute;
  right: 31%;
  border-radius: 15px;
  z-index: 999;
  .language-line{
  border-bottom: 1px solid #F6F6F6;
  padding: 10px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  .name{
    // font-size: 16px;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #000000;
  }
  .icon{
    display: flex;
    margin-left: auto;
    margin-right: 20px;
    img{
      width: 19px;
    }
  }
  &:first-child{
    padding-top: 0;
  }
}
}


@media screen and(min-width: 1024px) and (max-width:1280px){
   #selectLanguage{
  width: 130px;
  height: 650px;
  background: #FFFFFFFF;
  padding: 20px 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  display: block;
  position: absolute;
  right: 20%;
  border-radius: 15px;
  z-index: 999;
  
}
}
@media screen and (max-width:1024px){
    #selectLanguage{
  width: 130px;
  height: 650px;
  background: #FFFFFFFF;
  padding: 20px 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
  display: block;
  position: absolute;
  // top: 0;
  right: 15%;
  // transform: translate(80%,50%);
  border-radius: 15px;
  z-index: 999;
  .language-line{
  border-bottom: 1px solid #F6F6F6;
  padding: 10px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  .name{
    // font-size: 16px;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #000000;
  }
  .icon{
    display: flex;
    margin-left: auto;
    margin-right: 20px;
    img{
      width: 19px;
    }
  }
  &:first-child{
    padding-top: 0;
  }
}
}
}
@media screen and (max-width:768px){
  #selectLanguage{
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.2rem;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px #ffffff;
  box-sizing: border-box;
  position: relative;
  right: 0;
  z-index: 6;
}
.language-line{
  border-bottom: 1px solid #F6F6F6;
  padding: 0.1rem 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  .name{
    font-size: 0.16rem;
    font-family: Jost-Medium, Jost;
    font-weight: 500;
    color: #000000;
  }
  .icon{
    display: flex;
    margin-left: auto;
    margin-right: 0.2rem;
    img{
      width: 0.19rem;
    }
  }
  &:first-child{
    padding-top: 0;
  }
}
}
</style>
