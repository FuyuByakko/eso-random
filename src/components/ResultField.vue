<template>
  <div class="results">
    <div class="activity_selections">
      <h4> Selections:</h4>
      <div class="selection_list"> {{selections.join(", ")}} </div>
    </div>
    <div class="buttons">
      <button @click="randomizeActivity">Randomize Activity</button>
      <button @click="randomizeRoles">Randomize Group</button>
    </div>
    <div class="randomizer_results">
      <p>{{activityResult}}</p>
      <p>{{groupResult}}</p>
    </div>
  </div>
</template>

<script>
import state, { randomizeActivity, randomizeRoles } from '../store/selections'
import { toRefs } from 'vue'

export default {
  name: 'resuts',
  setup() {

    return {
      ...toRefs(state),
      randomizeActivity,
      randomizeRoles,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
  margin: 5px;
  padding: 0;
}
.results {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.activity_selections {
  margin: 10px 30px;
  text-align: left;
  width: 30%;
}
.selection_list {
  color: whitesmoke;
  max-height: 130px;
  overflow: auto;
}
.buttons {
  margin: 10px 30px;
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
.buttons button {
  width: 200px;
  height: 50px;
  font-size: max(16px, 1em);
  margin: 10px;
}
.randomizer_results {
  width: 30%;
}
</style>
