import { CHARACTERS, MISSIONS, REWARDS } from '../config/game.js';

export function answersEqual(expected, answer) {
  if (typeof expected === 'object') return Number(answer?.each) === expected.each && Number(answer?.left) === expected.left;
  return Number(answer) === expected;
}
export function evaluateMission(missionId, difficulty, answer) {
  const mission = MISSIONS.find(m=>m.id===missionId);
  if (!mission) throw Object.assign(new Error('Mission not found'),{status:404});
  const level=mission[difficulty]||mission.normal;
  return {correct:answersEqual(level.answer,answer), mission, level};
}
export function rewardFor(completed, awarded, missionId) {
  if (completed.includes(missionId)) return {pearls:0,amber:0,milestone:null,duplicate:true};
  const count=completed.length+1, milestone=count%REWARDS.milestoneEvery===0?count/REWARDS.milestoneEvery:null;
  return {pearls:REWARDS.missionPearls,amber:milestone&&!awarded.includes(milestone)?REWARDS.milestoneAmber:0,milestone,duplicate:false};
}
export function canPurchase(player, characterId) {
  const character=CHARACTERS.find(c=>c.id===characterId);
  if (!character) return {ok:false,status:404,message:'Explorer not found.'};
  if (player.owned.includes(characterId)) return {ok:false,status:409,message:'You already own this explorer.'};
  if (player.pearls<character.pearls||player.amber<character.amber) return {ok:false,status:400,message:'Keep adventuring—you need more currency.'};
  return {ok:true,character};
}
