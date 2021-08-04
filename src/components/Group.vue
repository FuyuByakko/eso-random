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
        <input v-model="newPlayerName" type="text" @keyup.enter="addPlayer" :placeholder="'Input name and select roles..'" >
        <button @click="addPlayer">Add Member</button>
      </span>
      <div class="players_table">
        <table class="players">
          <tr>
            <th width="32%"> Name </th>
            <th width="18%"> Tank </th>
            <th width="18%"> Healer </th>
            <th width="18%"> DPS </th>
            <th width="18%"> </th>
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
              <!-- <img :src="" /> -->X
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
  display: grid;
  grid-template-rows: 8vh 50vh;
  grid-template-areas: 
    "required"
    "group";
  row-gap: 20px;
  align-items: center;
  justify-content: center;
  padding: 5px;
  user-select: none;
  text-align: left;
}
.required {
  grid-area: required;
  padding: 0px 5px;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.5fr 1fr 1.5fr 1fr;
  grid-template-rows: 20px 20px;
  min-width: 300px;
  row-gap: 15px;
  column-gap: 5px;
  grid-template-areas: 
    "required_header required_header required_header required_header required_header required_header"
    "required_tanks_header required_tanks_input required_healers_header required_healers_input required_dps_header required_dps_input";
  justify-items: center;
  align-items: center;
}
.required_header {
  grid-area: required_header;
}
.required_header_tanks {
  grid-area: required_tanks_header;
  min-width: 70px;
}
.required_input_tanks {
  grid-area: required_tanks_input;
  width: 100%;
  min-width: 50px;
}
.required_header_healers {
  grid-area: required_healers_header;
  min-width: 70px;
}
.required_input_healers {
  grid-area: required_healers_input;
  width: 100%;
  min-width: 50px;
}
.required_header_dps {
  grid-area: required_dps_header;
  min-width: 70px;
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
  align-items: center;
  justify-content: flex-start;
}

.players {
  width: 100%;
  padding: 0px 10px;
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
}
</style>    
