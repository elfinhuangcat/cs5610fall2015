module.exports = function(mongoose) {
    var AllStyles = [
        'American',
        'British',
        'Cajun',
        'Caribbean',
        'Chinese',
        'French',
        'German',
        'Greek',
        'Indian',
        'Italian',
        'Japanese',
        'Korean',
        'Lebanese',
        'Mediterranean',
        'Mexican',
        'Moroccan',
        'Soul',
        'Spanish',
        'Thai',
        'Turkish',
        'Vietnamese',
        'Mixed',
        'Other'
    ];
    var AllMealType = [
        'barbecue',
        'box lunch',
        'breakfast',
        'brunch',
        'dinner',
        'high tea',
        'nosh',
        'picnic',
        'snack',
        'supper',
        'other'
    ];
    var RecipeSchema = mongoose.Schema({
        // "_id"     : generated by mongodb
        "title"      : String, // recipe's title
        "author"     : String, // recipe's author EMAIL
        "img"        : { data: Buffer, contentType: String }, // food image
        "style"      : [{type: String, enum: AllStyles}], // can have many styles
        "mealtype"   : [{type: String, enum: AllMealType}], // can belong to many meal types
        "time"       : Number, // Preparation time
        "unit"       : {type: String, enum: ['H','M','S']}, // Preparation time unit
        "ingredients": String,
        "steps"      : String,
        "comments"   : [{
            "author" : String, // author's EMAIL
            "replyto": String, // user's EMAIL
            "content": String}]
    }, {collection: "cs5610.project.recipe"});
    return RecipeSchema;
};