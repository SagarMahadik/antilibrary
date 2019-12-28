const mongoose = require('mongoose');

const fancyItemSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "Please enter fancyItem's first name"]
    },
    lastName:{
        type:String
    },
    genre:{
        type:String,
        enum:['guidingLights',
              'luminaries',
              'mavericScientists',
              'menOfLetters',
              'theGrandPhilosophers',
              'architectsOfTheFuture'],
        required:true
    },
    notableWork:{
        type:String,
        required:[true,"Please enter notable work"]
    },
    quotes:[
        {   quote :{

            type:String,
            sparse:true
            }
        }
         
    ],
    books:[
        {
            bookName:{
                
                type:String,
                sparse:true
            },
            bookURL :{

                type: String,
                sparse:true
            }
        }
    ],
    videos:[
        {
            videoName:{
                type:String,
                maxlength:[50,"A video description must have less or equal to 50 characters"],
                sparse:true
            },
            videoURL: {
                type:String,
                sparse:true
            }
        }
    ],
    courses:[
        {
            courseName:{
                type:String,
                sparse:true
            },
            courseURL: {
                type:String,
                sparse:true
            },
            platform :{
                type:String,
                sparse:true
            }
        }
    ]

});

/*fancyItemSchema.pre("save",function(next){
    if(this.books.length===0) this.books.push("There is no book for thisfancyITem"); 
    if(this.quotes.length===0) this.quotes.push("There is no quote for this fancyitem");
    if (this.courses.length === 0)this.courses.push("There is no coursesfor this fancyitem"); 
    if(this.videos.length ===0)this.videos.push("There is no video for this fancyitem");    
    next();  
     
})*/

const FancyItem = mongoose.model('FancyItem',fancyItemSchema);

module.exports = FancyItem;