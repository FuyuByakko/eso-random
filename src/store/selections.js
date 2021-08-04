import { reactive } from 'vue';

const state = reactive({
  selections: [],
  options: addActivities(),
  activityResult: '',
  groupPlayers: [],
  group: {
    requiredTanks: 0,
    requiredHealers: 0,
    requiredDps: 0,
  },
  groupResult: '',
})
export default state 

//NOTE: Randomization functionality for Activities
export function randomizeActivity() {
  if (state.selections.length === 0) {
    state.result = "Please select some activities to choose from";
    return
  }
  const randomNR = Math.floor(Math.random() * state.selections.length);
  state.activityResult = `You will be doing ${state.selections[randomNR]}!`;
}

//NOTE: Group-realted functions

export function randomizeRoles() {
  state.groupResult = '';
  if (state.group.requiredTanks === 0 || state.group.requiredHealers === 0 || state.group.requiredDps === 0) {
    state.groupResult = '"Roles Required" input required.';
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
    state.groupResult = 'Invalid "Roles Required" input';
    return;
  }
  
  const availablePlayers = state.groupPlayers.filter(player => player.tank || player.healer || player.dps);
  const needed = totalTanks + totalHealers + totalDps;
  if (availablePlayers.length < needed) {
    state.groupResult = `Not Enough active players. Required: ${needed}. Available: ${availablePlayers}.`;
    return;
  }
  const availableTanks = availablePlayers.filter(player => player.tank);
  if (availableTanks.length < totalTanks) {
    state.groupResult += "Not Enough active players to fill Tank role.\n" 
  } 
  let availableHealers = availablePlayers.filter(player => player.healer);
  if (availableHealers.length < totalHealers) {
    state.groupResult += "Not Enough active players to fill Healer role.\n" 
  } 
  let availableDps = availablePlayers.filter(player => player.dps);
  if (availableDps.length < totalDps) {
    state.groupResult += "Not Enough active players to fill DPS role.\n" 
  }
  if (state.groupResult !== '') {
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
    state.groupResult = `Cannot create a party with the current combination of roles.
    Please check that you have sufficient members to run various roles.`
    return;
  }
  state.groupResult = `
  Tanks: ${tanks}\n
  Healers: ${healers}\n
  Dps: ${dps}\n
  `
}





function addActivities() {
  return {
    "1. Soloable": ["Fishing", "Delves", "Questing", "Leveling", "Maesltrom Arena", "Vateshran Hollows"],
    "2. Small Group": ["World Bosses", "Battlegrounds", "Public Dungeons", "Random Normal", "Random Vet", "Pledges", "DSA", "Blackrose Prison"],
    "3. Base Dungeons": [ 
      "Fungal Grotto I",
      "Fungal Grotto II",
      "Spindleclutch I",
      "Spindleclutch II",
      "The Banished Cells I",
      "The Banished Cells II",
      "Darkshade Caverns I",
      "Darkshade Caverns II",
      "Wayrest Sewers I",
      "Wayrest Sewers II",
      "Elden Hollow I",
      "Elden Hollow II",
      "Arx Corinium",
      "Crypt of Hearts I",
      "Crypt of Hearts II",
      "City of Ash I",
      "City of Ash II",
      "Direfrost Keep",
      "Volenfell",
      "Tempest Island",
      "Blessed Crucible",
      "Blackheart Haven",
      "Selene's Web",
      "Vaults of Madness",
    ],
    "4. DLC Dungeons": [
      "Imperial City Prison",
      "White-Gold",
      "Cradle of Shadows",
      "Ruins of Mazzatun",
      "Bloodroot Forge",
      "Falkreath Hold",
      "Fang Lair",
      "Scalecaller",
      "March of Sacrifices",
      "Moon Hunter",
      "Depths of Malatar",
      "Frostvault",
      "Lair of Maarselok",
      "Moongrave Fane",
      "Icereach",
      "Unhallowed Grave",
      "Castle Thorn",
      "Stone Garden"
    ],
    "5. Trials": [
      "Aetherian Archives",
      "Hel Ra CItadel",
      "Sanctum Ophidia",
      "Maw of Lorkaj",
      "Hall of Fabrications",
      "Cloudrest",
      "Asylum",
      "Kyne's Aegis"
    ],
    "6. Large scale / PvP": ["Cyrodiil PvP", "Imperial City"],
    "7. Random Fun": ["Naked Dungeon/Trial", "Arena Race", "Other Game"],
  }
}