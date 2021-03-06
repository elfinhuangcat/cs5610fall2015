module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        // "_id"     : generated by the mongodb
        "email"      : {type: String, unique: true},    // Also used as login name
        "name"       : String,    // User's nickname, NOT an identifier
        "password"   : String,
        "friends"    : [String],  // list of user EMAILs
        "bookmarks"  : [String],  // list of recipe _ids
        "role"       : {type: String, enum : ['A', 'R', 'C'], default: "R"}, // A: admin; R: Registered User; C: Contributor
        "img"        : String // user profile image url
    }, {collection: "cs5610.project.user"});
    return UserSchema;
};