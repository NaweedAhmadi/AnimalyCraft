import 'dotenv/config';import mongoose from 'mongoose';import {MISSIONS,CHARACTERS} from '../src/config/game.js';
if(!process.env.MONGODB_URI)throw new Error('Set MONGODB_URI in .env first.');
await mongoose.connect(process.env.MONGODB_URI);await mongoose.connection.collection('gamecontent').updateOne({_id:'catalog'},{$set:{missions:MISSIONS,characters:CHARACTERS,updatedAt:new Date()}},{upsert:true});console.log(`Seeded ${MISSIONS.length} missions and ${CHARACTERS.length} explorers.`);await mongoose.disconnect();
