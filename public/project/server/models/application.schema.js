module.exports = function(mongoose) {
    // This is the schema for storing the application to be contributor
    var ApplicationSchema = mongoose.Schema({
        // "_id"     : generated by the mongodb
        "applicant"  : String,    // applicant's email
        "content"    : String     // applicant's reason to become a contributor
    }, {collection: "cs5610.project.application"});
    return ApplicationSchema;
};