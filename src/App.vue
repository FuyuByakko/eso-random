<template>
  <h2 class="title1">Activities:</h2>
  <h2 class="title2">Group:</h2>
  <Group class="group"/>
  <Results class="results"/>
  <Activities class="activitySelections" />
</template>

<script>
import Activities from './components/Activities.vue'
import Group from './components/Group.vue'
import Results from './components/ResultField.vue'

export default {
  name: 'Group Management',
  components: {
    Group,
    Activities,
    Results
  },
  setup() {}
}
</script>

<style>
html, body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: #0A0602;
  background-image: url("https://esossl-a.akamaihd.net/uploads/website/Q3ZeOwb7aw/eso-bg-texture-3.png");
  text-shadow: 0px 0px 1px #000,0px 1px 1px #000,0px 1px 10px #000;
  color: #aa9480;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 95%;
  width: 70%;
  min-height: 0px;
  min-width: 1100px;
  margin: auto;
  display: grid;
  grid-template-columns: 600px minmax(420px, 500px);
  grid-template-rows: 70px minmax(370px, 70%) minmax(200px, 20%);
  row-gap: 5px;
  column-gap: 15px;
  grid-template-areas: 
    "title1 title2"
    "activities group"
    "results results";
}
.title1 {
  grid-area: title1;
  width: 100%;
  height: 100%;
}
.title2 {
  grid-area: title2;
  width: 100%;
  height: 100%;
}
.activitySelections {
  grid-area: activities;
  width: 100%;
  height: 100%;
}
.group {
  width: 100%;
  height: 100%;
  grid-area: group;
}
.results {
  width: 100%;
  height: 100%;
  grid-area: results;
}

@media screen and (max-width: 750px) {
  .title1, .title2 {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  #app {
    display: grid;
    height: 100%;
    width: 100%;
    min-width: 550px;
    grid-template-columns: 100%;
    grid-template-rows: auto 370px auto minmax(400px, 550px) minmax(250px,400px);
    justify-content: center;
    align-items: start;
    row-gap: 5px;
    column-gap: 15px;
    grid-template-areas: 
      "title1"
      "activities"
      "title2"
      "group"
      "results";
  }
}
</style>
