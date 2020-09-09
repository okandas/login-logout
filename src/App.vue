<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import "assets/normalize.css";
@import "assets/layout.css";
@import "assets/snackbar.css";

#app {
  font-family: 'Poppins','Open Sans', Helvetica, Arial, sans-serif;
}

html, body {
  background: #050507;
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  height: 100%;
}

#app {
  margin: 0 50px;
}

*,:after,:before {
    box-sizing: border-box
}

:focus {
    outline: 0
}

body,html {
    margin: 0;
    padding: 0;
    height: 100%;
}

h1,h2,h3,h4 {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 400
}
</style>
