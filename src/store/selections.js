import { reactive } from 'vue';
import addActivities from './activityOptions'

const state = reactive({
  selections: [],
  options: addActivities(),
  activityError: '',
  activityResult: '',
  groupPlayers: [],
  group: {
    requiredTanks: 0,
    requiredHealers: 0,
    requiredDps: 0,
  },
  groupError: "",
  groupResult: [],
})
export default state 

//NOTE: Randomization functionality for Activities
export function randomizeActivity() {
  if (state.selections.length === 0) {
    state.activityError = "Please select some activities to choose from";
    state.activityResult = "";
    return
  }
  const randomNR = Math.floor(Math.random() * state.selections.length);
  state.activityError = "";
  state.activityResult = `${state.selections[randomNR]}`;
}

//NOTE: Group-realted functions

export function randomizeRoles() {
  state.groupResult = '';
  if (state.group.requiredTanks === 0 && state.group.requiredHealers === 0 && state.group.requiredDps === 0) {
    state.groupError = 'All "Roles Required" cannot be 0.';
    return
  }
  const totalTanks = +state.group.requiredTanks;
  const totalHealers = +state.group.requiredHealers;
  const totalDps = +state.group.requiredDps;
  if (
    isNaN(totalTanks) ||
    isNaN(totalHealers) ||
    isNaN(totalDps) ||
    totalTanks < 0 ||
    totalHealers < 0 ||
    totalDps < 0 ||
    totalTanks > 24 ||
    totalHealers >24 ||
    totalDps >24
  ) {
    state.groupError = 'Invalid "Roles Required" input';
    return;
  }
  
  const availablePlayers = state.groupPlayers.filter(player => player.tank || player.healer || player.dps);
  const needed = totalTanks + totalHealers + totalDps;
  if (availablePlayers.length < needed) {
    state.groupError = `Not Enough active players. Required: ${needed}. Available: ${availablePlayers.length}.`;
    return;
  }
  const availableTanks = availablePlayers.filter(player => player.tank);
  if (availableTanks.length < totalTanks) {
    state.groupError = "Not Enough active players to fill Tank role.\n" 
  } 
  let availableHealers = availablePlayers.filter(player => player.healer);
  if (availableHealers.length < totalHealers) {
    state.groupError += "Not Enough active players to fill Healer role.\n" 
  } 
  let availableDps = availablePlayers.filter(player => player.dps);
  if (availableDps.length < totalDps) {
    state.groupError += "Not Enough active players to fill DPS role.\n" 
  }
  if (state.groupError !== '') {
    return;
  } else {
    state.groupResult = "Generating...";
  }
  const tanks = [];
  while(tanks.length < totalTanks && availableTanks.length > 0){
    const randomNr = Math.floor(Math.random() *  availableTanks.length);
    const chosenPlayer = availableTanks.splice(randomNr, 1)[0];
    availableHealers = availableHealers.filter(player => player.name != chosenPlayer.name);
    availableDps = availableDps.filter(player => player.name != chosenPlayer.name);
    if (availableHealers.length < totalHealers || availableDps.length < totalDps) {
      if (chosenPlayer.healer) { availableHealers.push(chosenPlayer); }
      if (chosenPlayer.dps) { availableDps.push(chosenPlayer); }
      continue
    }
    tanks.push(chosenPlayer.name)
  }
  
  const healers = [];
  while(healers.length < totalHealers && availableHealers.length > 0){
    const randomNr = Math.floor(Math.random() *  availableHealers.length);
    const chosenPlayer = availableHealers.splice(randomNr, 1)[0]
    availableDps = availableDps.filter(player => player.name != chosenPlayer.name);
    if (availableDps.length < totalDps && chosenPlayer.dps) {
      availableDps.push(chosenPlayer);
      continue
    }
    healers.push(chosenPlayer.name);
  }
  const dps = [];
  while(dps.length < totalDps && availableDps.length > 0){
    const randomNr = Math.floor(Math.random() *  availableDps.length);
    const chosenPlayer = availableDps.splice(randomNr, 1)[0]
    dps.push(chosenPlayer.name)
  }
  if( tanks.length !== totalTanks || healers.length !== totalHealers || dps.length !== totalDps) {
    state.groupError = `Cannot create a party with the current combination of roles.
    Please check that you have sufficient members to run various roles.`
    return;
  }
  state.groupResult = [
    { role: "Tanks", players: tanks.join(", ") },
    { role: "Healers", players: healers.join(", ") },
    { role: "Dps", players: dps.join(", ") },
  ];
  state.groupError = ""
}
