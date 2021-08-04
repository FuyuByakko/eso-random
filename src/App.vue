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
  margin: 0 auto;
  padding: 0;
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
  margin: 0 auto;
  height: 95vmin;
  max-width: 1100px;
  min-width: 750px;
  display: grid;
  grid-template-columns: 600px 1fr;
  grid-template-rows: 70px 2fr 1fr;
  row-gap: 5px;
  column-gap: 15px;
  grid-template-areas: 
    "title1 title2"
    "activities group"
    "results results";
}
.title1 {
  grid-area: title1;
}
.title2 {
  grid-area: title2;
}
.activitySelections {
  grid-area: activities;
  max-height: 60vh;
}
.group {
  min-width: 420px;
  max-height: 60vh;
  grid-area: group;
}
.results {
  width: 100%;
  grid-area: results;
}
</style>
