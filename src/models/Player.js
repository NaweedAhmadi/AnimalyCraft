import mongoose from 'mongoose';
const positionSchema = new mongoose.Schema({ x:{type:Number,default:0}, y:{type:Number,default:1}, z:{type:Number,default:8} }, {_id:false});
const playerSchema = new mongoose.Schema({
  sessionId:{type:String,required:true,unique:true,index:true}, displayName:{type:String,required:true,trim:true,maxlength:20},
  pearls:{type:Number,default:0,min:0}, amber:{type:Number,default:0,min:0},
  owned:{type:[String],default:['rabbit']}, equipped:{type:String,default:'rabbit'}, completed:{type:[String],default:[]}, awardedMilestones:{type:[Number],default:[]},
  camp:{food:{type:Number,default:0,min:0,max:100},shelter:{type:Number,default:0,min:0,max:100}},
  supplies:{apples:{type:Number,default:0,min:0},leaves:{type:Number,default:0,min:0},wood:{type:Number,default:0,min:0}},
  lastPosition:{type:positionSchema,default:()=>({})}, difficulty:{type:String,enum:['easy','normal'],default:'normal'}
},{timestamps:true,versionKey:'revision'});
export const Player = mongoose.model('Player', playerSchema);
