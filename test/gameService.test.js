import test from 'node:test';import assert from 'node:assert/strict';import {answersEqual,rewardFor,canPurchase,evaluateMission} from '../src/services/gameService.js';
import {MISSIONS,CHARACTERS,REWARDS} from '../src/config/game.js';
test('validates numeric and remainder answers',()=>{assert.equal(answersEqual(9,'9'),true);assert.equal(answersEqual({each:2,left:1},{each:'2',left:'1'}),true);assert.equal(answersEqual({each:2,left:1},{each:3,left:0}),false);});
test('evaluates catalog answers on server',()=>{assert.equal(evaluateMission('apple-remainder','easy',{each:2,left:1}).correct,true);});
test('first completion rewards once',()=>{assert.deepEqual(rewardFor([],[],'one'),{pearls:10,amber:0,milestone:null,duplicate:false});assert.equal(rewardFor(['one'],[],'one').duplicate,true);});
test('third distinct completion awards amber once',()=>{assert.equal(rewardFor(['a','b'],[],'c').amber,1);assert.equal(rewardFor(['a','b'],[1],'c').amber,0);});
test('purchase checks funds and ownership',()=>{const p={pearls:30,amber:0,owned:['rabbit']};assert.equal(canPurchase(p,'fox').ok,true);assert.equal(canPurchase({...p,pearls:29},'fox').ok,false);assert.equal(canPurchase({...p,owned:['rabbit','fox']},'fox').status,409);});
test('Rabbit can earn enough to unlock the complete roster',()=>{const costs=CHARACTERS.reduce((sum,c)=>sum+c.pearls,0),amber=CHARACTERS.reduce((sum,c)=>sum+c.amber,0);assert.ok(MISSIONS.length*REWARDS.missionPearls>=costs);assert.ok(Math.floor(MISSIONS.length/REWARDS.milestoneEvery)*REWARDS.milestoneAmber>=amber);});
