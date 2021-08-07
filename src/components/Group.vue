<template>
  <div class="group">
    <div class="required">
      <h3 class="required_header"> Roles Required: </h3>
      <h4 class="required_header_tanks"> Tanks: </h4>
      <input class="required_input_tanks" type="number" min="0" max="24" v-model="group.requiredTanks">
      <h4 class="required_header_healers"> Healers: </h4>
      <input class="required_input_healers" type="number" min="0" max="24" v-model="group.requiredHealers">
      <h4 class="required_header_dps"> DPS: </h4>
      <input class="required_input_dps" type="number" min="0" max="24" v-model="group.requiredDps">
    </div>

    <div class="group_members">
      <h3> Member List: </h3>
      <p>{{newNameError}}</p>
      <span class="member_inputs">
        <input v-model="newPlayerName" type="text" @keyup.enter="addPlayer" :placeholder="'Input member name..'" >
        <button @click="addPlayer">Add Member</button>
      </span>
      <div class="players_table">
        <table class="players">
          <tr>
            <th width="32%"> Name </th>
            <th width="18%"> Tank </th>
            <th width="18%"> Healer </th>
            <th width="18%"> DPS </th>
            <th width="10%"> </th>
          </tr>
          <tr v-for="player in groupPlayers" :key="player.name">
            <td> {{player.name}} </td>
            <td @click="updateRole(player, 'tank')">
              <img :src="player.tank ? roleLogos.tankOn : roleLogos.tankOff" />
            </td>
            <td @click="updateRole(player, 'healer')">
              <img :src="player.healer ? roleLogos.healOn : roleLogos.healOff" />
            </td>
            <td @click="updateRole(player, 'dps')">
              <img :src="player.dps ? roleLogos.dpsOn : roleLogos.dpsOff" />
            </td>
            <td @click="removePlayer(player)">
              <img class="delete_icon" :src="deleteIcon" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, toRefs } from 'vue';
import tankOn from "../assets/tank_on.png"
import tankOff from "../assets/tank_off.png"
import healOn from "../assets/heal_on.png"
import healOff from "../assets/heal_off.png"
import dpsOn from "../assets/dps_on.png"
import dpsOff from "../assets/dps_off.png"
import state from '../store/selections'
import deleteIcon from '../assets/delete-2-32.png';

export default {
  name: 'Group Management',
  setup() {
    const roleLogos = {
      tankOn, tankOff, healOn, healOff, dpsOn, dpsOff
    } 

    const newPlayerName = ref("");
    const newNameError = ref("");

    function addPlayer() {
      if (!newPlayerName.value || newPlayerName.value.length < 2 || newPlayerName.value.length > 20) {
        newNameError.value = "Input a valid name (2 - 20 characters)";
        return;
      }
      if (state.groupPlayers.find((player) => player.name === newPlayerName.value)) { 
        newNameError.value = "Name already present. Please change to a unique name.";
        return;
      }
      const newPlayer = {
        name: newPlayerName.value,
        tank: true,
        healer: true,
        dps: true
      }

      state.groupPlayers.push(newPlayer);
      newNameError.value = "";
      newPlayerName.value ='';
      return
    }

    function updateRole(player, role) {
      player[role] = !player[role];
      console.log(`${player.name}'s role as ${role} set to ${player[role]}`);
    }

    function removePlayer(playerToRemove) {
      const indexToRemove = state.groupPlayers.findIndex(player => player.name === playerToRemove.name)
      const removed = state.groupPlayers.splice(indexToRemove, 1);
      console.log(`Removing ${removed[0].name}`);
    }

    return {
      ...toRefs(state),
      updateRole,
      addPlayer,
      removePlayer,
      newPlayerName,
      newNameError,
      roleLogos,
      deleteIcon,
    }
  }
}
</script>

<style scoped>
h3, h4, input, p, button {
  margin: 0;
  padding: 0;
}
input {
  box-sizing: border-box;
  line-height: 1;
  font-size: max(16px, 1em);
  font-family: inherit;
  padding: 0.3em 0.5em;
  background-color: #fff;
  border: 2px solid var(--input-border);
  border-radius: 4px;
}

.group {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: minmax(75px, 1fr) 7fr;
  grid-template-columns: 90%;
  grid-template-areas: 
    "required"
    "group";
  row-gap: 20px;
  align-content: start;
  justify-content: center;
  user-select: none;
  text-align: left;
  min-height: 0;
  min-width: 0;
}
.required {
  height: 100%;
  width: 95%;
  grid-area: required;
  display: grid;
  grid-template-columns: repeat(3, minmax(70px, 7fr), minmax(50px, 5fr));
  grid-template-rows: 20px 20px;
  min-width: 300px;
  row-gap: 15px;
  column-gap: 5px;
  grid-template-areas: 
    "required_header required_header required_header required_header required_header required_header"
    "required_tanks_header required_tanks_input required_healers_header required_healers_input required_dps_header required_dps_input";
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}
.required_header {
  grid-area: required_header;
}
.required_header_tanks {
  grid-area: required_tanks_header;
  min-width: 70px;
  text-align: right;
}
.required_input_tanks {
  grid-area: required_tanks_input;
  width: 100%;
  min-width: 50px;
}
.required_header_healers {
  grid-area: required_healers_header;
  min-width: 70px;
  text-align: right;
}
.required_input_healers {
  grid-area: required_healers_input;
  width: 100%;
  min-width: 50px;
}
.required_header_dps {
  grid-area: required_dps_header;
  min-width: 70px;
  text-align: right;
}
.required_input_dps {
  grid-area: required_dps_input;
  width: 100%;
  min-width: 50px;
}

.group_members {
  grid-area: group;
  width: 100%;
  height: 100%;
  display: flex;  
  flex-direction: column;
  align-content: center;
  justify-content: flex-start;
  text-align: center;
  min-height: 0;  /* NEW */
  min-width: 0;
}

.players {
  width: 100%;
  padding: 0px 10px;
  border: 2px solid #a9927c;
  border-radius: 5px;
}
.players_table {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  overflow: hidden;
  overflow-y: auto;
}
.member_inputs {
  margin: 10px 0;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-content: center;
}
.member_inputs input {
  padding: 7px;
  margin-right: 5px;
}
.member_inputs button {
  padding: 7px;
  border-radius: 5px
}
.delete_icon {
  width: 40%;
  max-width: 25px;
  height: auto;
  margin: 0;
}

@media screen and (max-width: 1100px) {
  .required {
    grid-area: required;
    padding: 0px 5px;
    display: grid;
    grid-template-columns: 7fr 5fr;
    grid-template-rows: 20px 20px 20px 20px;
    min-width: 300px;
    row-gap: 10px;
    column-gap: 5px;
    grid-template-areas: 
      "required_header required_header"
      "required_tanks_header required_tanks_input"
      "required_healers_header required_healers_input"
      "required_dps_header required_dps_input";
    justify-items: center;
    align-items: center;
  }
  .group {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: minmax(120px, 1fr) 7fr;
  grid-template-columns: 90%;
  }
}
@media screen and (max-width: 750px) {
  .required {
    row-gap: 5px;
  }
  .group {
    row-gap: 5px;
  }
}
</style>    
