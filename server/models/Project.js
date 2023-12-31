const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
name :{
    type: String
}, description :{
    type: String
}, status :{
    type: String,
    enum: ['new', 'progress', 'completed']
},
// foreign key
clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
}
});

module.exports = mongoose.model('Project', projectSchema)