<template>
  <div id="selectLanguage" >
    
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
        {name: 'EN',state: true},
        {name: '中文',state: false}
      ]
    }
  },
  mounted(){
    this.initializationData();
  },
  methods: {
    initializationData(){
      this.$nextTick(()=>{
        this.languageList.map(item => {
          return item.name === this.$store.state.language ? item.state = true : item.state = false;
        })
      })
    },
    choiseItem(item,index){
      this.languageList.map(item => {
        return item.state = false;
      })
      this.languageList[index].state = true;
      this.$store.state.language = item.name;
      i18n.locale = item.name;
      this.$parent.$refs.headerRef.openLanguage();
    }
  }
}
</script>

<style lang="scss" scoped>
#selectLanguage{
  width: 100%;
  height: 100%;
  padding: 0.2rem 0 0 0.2rem;
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
</style>
