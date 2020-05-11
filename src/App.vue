<template>
  <div id="app">
    <h1 
    style="font-size:40px"
    >
      {{ $t("business_structures") }}</h1>
      <p>Powered by BizPaL</p>
    <br/>
    <router-view />
  </div>
</template>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:left;
  color:#edf3f7;
  background-color: #274f6e;
}
h1 {
  padding: 40px;
  align-content: center;
  color:white;
  font-size:40px;
}
</style>
