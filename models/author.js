var mongoose = require('mongoose');
const moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date}
});

// Virtual property for author's full name
AuthorSchema.virtual('name').get(function() {return this.family_name + ', ' + this.first_name;});

// Virtual property for author's URL
AuthorSchema.virtual('url').get(function() {return '/catalog/author/' + this._id;});

// Format dates
AuthorSchema.virtual('birth_date').get(function() {return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : ''});
AuthorSchema.virtual('death_date').get(function() {return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : ''});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);