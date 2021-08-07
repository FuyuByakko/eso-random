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
    <h3 class="colData" @click="toggleAllGroup(currentGroup)"> {{currentGroup.slice(3)}}: {{allSelected[currentGroup] ? '(Deselect all)' : '(Select all)' }} </h3>
    <div v-for="activity in currentGroupOptions" :key="activity" class="activities">
      <input type="checkbox" v-model="selections" :id="activity" :value="activity" @change="changeSelectAllLabel(currentGroup)">
      <label :for="activity">{{activity}}</label>
      <img class="delete_icon" :src="deleteIcon" v-if="customRandom(activity)" @click="removeActivity(activity)"/>
    </div>
    <div class="activity_inputs" v-if="randomCategory">
      <input v-model="newActivityName" type="text" @keyup.enter="addActivity" :placeholder="'Input random activities'" >
      <button @click="addPlayer">Add Activity</button>
    </div>
  </div>
</div>
</template>

<script>
import { ref, reactive,  toRefs, computed } from 'vue';
import state from '../store/selections';
import deleteIcon from '../assets/delete-2-32.png';
import { defaultRandoms } from '../store/activityOptions';

export default {
  name: 'Activities',

  setup() {
    let currentGroup = ref(Object.keys(state.options)[0]);
    const currentGroupOptions = computed(() => { return state.options[currentGroup.value]; });
    const setCurrentOptionsGroup = (e, name) => { currentGroup.value = name; };
    
    const allSelected = reactive({})
    allSelected[currentGroup] = false;
    
    const toggleAllGroup = (currentGroup) => {
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

    const changeSelectAllLabel =  (currentGroup) => {
      allSelected[currentGroup] = currentGroupOptions.value.every(activity => state.selections.includes(activity))
    };

    const customActivities = ref([]);
    const newActivityName = ref("")
    function addActivity() {
      if (!newActivityName.value || newActivityName.value.length < 1 || newActivityName.value.length > 20) {
        return;
      }

      state.options["7. Random Fun"].push(newActivityName.value);
      newActivityName.value = "";
    }
    const randomCategory = computed(() => {
      return currentGroup.value === '7. Random Fun'
    })
    const customRandom = (activityName) => {
      return currentGroup.value === '7. Random Fun' && !defaultRandoms().includes(activityName)
    }
    const removeActivity = (activityName) => {
      const indexToRemove = state.options["7. Random Fun"].indexOf(activityName);
      state.options["7. Random Fun"].splice(indexToRemove, 1);
    }

    return {
      ...toRefs(state),
      setCurrentOptionsGroup,
      currentGroupOptions,
      currentGroup,
      toggleAllGroup,
      allSelected,
      changeSelectAllLabel,
      newActivityName,
      addActivity,
      removeActivity,
      customActivities,
      randomCategory,
      customRandom,
      deleteIcon,
    }
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
  grid-template-rows: 100%;
  grid-template-areas: 
    "categories options";
  column-gap: 10px;
  align-items: start;
  justify-content: start;
  text-align: left;
}
.colData, activities {
  margin: 5px;
  padding: 2px;
  user-select: none;
}
.activities {
  width: 100%;
}
.categories{
  width: 100%;
  height: 100%;
  grid-area: categories;
  min-width: 210px;
}
.options{
  width: 95%;
  max-height: 99%;
  grid-area: options;
  border: 2px solid #a9927c;
  border-radius: 5px;
  padding-left: 15px;
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
.delete_icon {
  width: 12px;
  height: auto;
  margin-left: 10px;
}
.activity_inputs {
  margin: 10px 0;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
}
.activity_inputs input {
  padding: 7px;
  margin-right: 5px;
}
.activity_inputs button {
  padding: 7px;
  border-radius: 5px
}
</style>

