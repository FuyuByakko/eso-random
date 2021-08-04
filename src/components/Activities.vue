<template>
<div class="cols">
  <div class="categories">
    <h3
      class="categoryTitle"
      :class="key==currentGroup ? 'selected': ''"
      v-for="(optionGroup, key) in options"
      :key="key"
      @click="(e) => setCurrentOptionsGroup(e, key)"
    > {{key}}
    </h3>
  </div>
  <div class="options">
    <h3 class="colData" @click="toggleAllGroup"> {{currentGroup.slice(3)}}: {{groupAllSelected ? '(Deselect all)' : '(Select all)' }} </h3>
    <div v-for="activity in currentGroupOptions" :key="activity" class="colData">
      <input type="checkbox" v-model="selections" :id="activity" :value="activity" @change="changeSelectAllLabel">
      <label :for="activity">{{activity}}</label>
    </div>
  </div>
</div>
</template>

<script>
import { ref, reactive,  toRefs, computed } from 'vue';
import state from '../store/selections'

export default {
  name: 'Activities',

  setup() {
    let currentGroup = ref(Object.keys(state.options)[0]);
    const currentGroupOptions = computed(() => { return state.options[currentGroup.value]; });
    const setCurrentOptionsGroup = (e, name) => { currentGroup.value = name; };
    
    const allSelected = reactive({})
    allSelected[currentGroup] = false;
    const groupAllSelected = computed(() => allSelected[currentGroup]);
    
    const toggleAllGroup = () => {
      allSelected[currentGroup] = !allSelected[currentGroup];
      const setOfSelections = new Set(state.selections);
      currentGroupOptions.value.forEach( activity => {
        if (allSelected[currentGroup]) {
          setOfSelections.add(activity);
        } else {
          setOfSelections.delete(activity);
        }
      });
      state.selections = [...setOfSelections];
    };

    const changeSelectAllLabel =  () => {
      allSelected[currentGroup] = currentGroupOptions.value.every(activity => state.selections.includes(activity))
    };

    return { ...toRefs(state), setCurrentOptionsGroup, currentGroupOptions, currentGroup, toggleAllGroup, groupAllSelected, changeSelectAllLabel }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
a {
  color: #42b983;
}
.cols {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto;
  grid-template-areas: 
    "categories options";
  column-gap: 10px;
  align-items: start;
  justify-content: start;
  text-align: left;
}
.colData {
  margin: 5px;
  padding: 2px;
  user-select: none;
}
.categories{
  margin: 5px 10px;
  grid-area: categories;
  min-width: 210px;
}
.options{
  grid-area: options;
  margin: 5px 10px;
  border: 2px solid #a9927c;
  border-radius: 5px;
  padding-left: 15px;
  max-height: 100%;
  overflow: auto;
}
.categoryTitle {
  user-select: none;
  cursor: pointer;
  border: 2px solid #a9927c;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
}
.categoryTitle:hover, .selected {
  border: 2px solid #f5f5f5;
  background: #3a2613bd;
  color: #f5f5f5;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
}
label {
  margin-left: 10px;
  font-size: 1.3rem;
}
</style>

