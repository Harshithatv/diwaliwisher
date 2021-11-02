const express=require('express');
const app= express();
const Userdata = require('./src/model/Userdata');
var nodemailer = require('nodemailer');
const port=process.env.PORT || 2500;




app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views','./src/views');


app.get('/',function(req,res){
    
    res.render("first",
    {
        
        title:'Happy Diwali'
    }
    );
});
app.post('/submit',function(req,res){
    
    var item ={
        username:  req.body.username,
        name: req.body.name,
       email:  req.body.email,
        
     }
  
     var wish = Userdata(item);
      wish.save((err, result) => {
         if (err) {
            
         } else {
            res.redirect(`signin/${result._id}`);
        }
    
      });
            
});
app.get('/signin/:id',(req,res)=>{
    const id = req.params.id
    
   Userdata.findOne({_id: id})
 
   .then((wish)=>{
       
   res.render("signin",{
       title:'Happy Diwali',
       wish,
       msg:''
   });
   })
 
 });
 app.get('/wish/:i',(req,res)=>{
    const i = req.params.i
    
   Userdata.findOne({_id: i})
 
   .then((wish)=>{
       
   res.render("wish",{
      title:'Happy Diwali',
       wish
   });
   })

 
 });
 app.get('/send/:id', (req, res) => {
 
  
    const id = req.params.id
  
    Userdata.findOne({_id: id})
  
   .then((wish)=>{
  
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: 'diwaliwishes123@gmail.com',
             pass: 'Diwali123#'
         }
     })
    
    
    var mailOptions = {
      from: 'newones890@gmail.com',
      to: wish.email,
      subject: 'Happy Diwali ',
      text:'Hi '+ wish.name+ ', Here is a Diwali Surprise from '+wish.username+'  Click the link.  '+'https://diwaliwisherapp1.herokuapp.com/wish/'+wish._id  
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        
        res.redirect(`/signin/${wish._id}`);
              
      } else {
        res.render("signin",{
          title:'Happy Diwali',
           wish,
           msg:'Wishes Reached '+wish.name
       });
       console.log("success");
      }
    });
    });
   
   });


app.listen(port,()=>{console.log("Server Ready at" + port)});