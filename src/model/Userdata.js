const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.8c9vj.mongodb.net/DIWALI?retryWrites=true&w=majority',{
    useNewUrLParser:true,
    useUnifiedTopoLogy:true
});
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    username:{
        type:String,
        required:true
        
    },
    name:{ 
        type:String,
        required:true
       
    },    
    email:{
        type:String,
        required:true
    }
});
var Userdata=mongoose.model('userdata',UserSchema);
module.exports=Userdata;