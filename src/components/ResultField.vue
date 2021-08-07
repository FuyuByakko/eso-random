<template>
  <div class="results">
    <div class="activity_selections">
      <h3> Selections:</h3>
      <div class="selection_list"> {{selections.join(", ")}} </div>
    </div>
    <div class="buttons">
      <button @click="randomizeActivity">Randomize Activity</button>
      <button @click="randomizeRoles">Randomize Group</button>
    </div>
    <div class="randomizer_results">
      <h2 v-if="activityError">{{activityError}}!</h2>
      <span v-else-if="activityResult">
        <h3>You will be doing:</h3>
        <h2>{{activityResult}}!</h2>
      </span>
      <h3 v-if="groupError">{{groupError}}</h3>
      <h3 v-else v-for="result of groupResult" :key="result.name">{{result.role}}: <strong>{{result.players}}</strong></h3>
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
h3, h2 {
  margin: 10px 0;
}
h3 {
  font-size: 1.1rem;
}
h2 {
  font-size: 1.3rem;
}
.results {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  height: 100%;
  min-height: 0;
  min-width: 0;
}
.activity_selections {
  width: 30%;
  min-width: 150px;
  height: 100%;
  margin: 0 20px;
  text-align: center;
}
.selection_list {
  color: whitesmoke;
  text-align: left;
  width: 90%;
  margin: 0 auto;
  height: 65%;
  overflow: auto;
}
.buttons {
  margin: 10px 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 0;
  min-width: 0;
}
.buttons button {
  width: 200px;
  height: 50px;
  font-size: max(16px, 1em);
  margin: 10px;
}
.randomizer_results {
  min-width: 40%;
}
</style>
