const mongoose = require('mongoose');



var UserSchema = new Schema({
	name:{
		type:String,
		required:true
	},
	addition :{
        type:String,
		required:true
	},
	customerNumber :{
        type:String,
		required:true 
	},
	customerType :{
        type:String,
		required:true
	},
	 address:{
       street: String,
       houseNumber : String,
       city:String,
       state: String,
       postalCode : String
    },
    contactData :{

    	phone : { type:String, required : true},
        fax : String,
    	email: { type: String, required:true },
    	emailNewsLetter : String,
    	emailTechnology : String,
    	emailAccounting : String
     }

});




module.exports = mongoose.Model('User', UserSchema);