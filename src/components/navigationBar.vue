<template>
  <div class="navigation">
    <p class="navigation-icon"><img src="@/assets/leftIcon.svg" /></p>
    <p class="routerName">{{ $route.name }}</p>
    <div class="searchLanguage" @click="changeLanguage">
      <p class="text">EN</p>
      <p class="icon"><img src="@/assets/rightIcon.png"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
  methods: {
    changeLanguage(){

    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  padding: 0.1rem 0.2rem;
  img {
    width: 0.18rem;
  }
  .navigation-icon{
    display: flex;
  }
  .routerName{
    font-size: 0.18rem;
    font-family: Jost-SemiBold, Jost;
    font-weight: 600;
    color: #000000;
    line-height: 0.21rem;
    margin-left: 0.2rem;
    margin-top: -0.03rem;
  }
  .searchLanguage{
    margin-left: auto;
    display: flex;
    align-items: center;
    .text{
      width: 0.24rem;
      height: 0.24rem;
      border: 1.9px solid #999999;
      line-height: 0.23rem;
      text-align: center;
      border-radius: 5px;
      color: #999999;
      font-size: 0.12rem;
      font-weight: bold;
      margin-right: 0.1rem;
    }
    .icon{
      display: flex;
      align-items: center;
      img{
        width: 0.14rem;
      }
    }
  }
}
</style>
