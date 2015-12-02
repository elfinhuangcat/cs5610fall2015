"use strict";
module.exports = function(app, mongoose, RecipeSchema) {
    var q = require("q");
    var RecipeModel = mongoose.model("RecipeModel", RecipeSchema);
    var api = {
        createRecipe: createRecipe, // arg: recipe
        findAllRecipe: findAllRecipe, // arg: null
        findRecipesInArrayOfId: findRecipesInArrayOfId, // arg: [{_id: String(Recipe's id)}]
        findRecipeById: findRecipeById, // arg: _id
        updateRecipe: updateRecipe, // arg: _id, newRecipe
        deleteRecipeById: deleteRecipeById, // arg: _id
    };
    return api;

    /**
     *
     * @param recipe
     * @returns {*|promise}
     */
    function createRecipe(recipe) {
        var deferred = q.defer();
        RecipeModel.create(recipe, function(err, result) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            }
            else {
                deferred.resolve(result); // should return the created user
            }
        });
        return deferred.promise;
    }

    /**
     *
     * @returns {*|promise}
     */
    function findAllRecipe() {
        var deferred = q.defer();
        RecipeModel.find(function(err, recipes) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(recipes);
            }
        });
        return deferred.promise;
    }


    /**
     * Find recipes whose _id appears in the array
     * @param arr : [{_id: String}]
     * @returns {*|promise}
     */
    function findRecipesInArrayOfId(arr) {
        var deferred = q.defer();
        RecipeModel.find({$or: arr}, function(err, recipes) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(recipes);
            }
        });
        return deferred.promise;
    }

    /**
     * @param id : _id
     * @returns {*|promise}
     */
    function findRecipeById(id) {
        var deferred = q.defer();

        RecipeModel.findById(id, function(err, recipe){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(recipe);
            }
        });

        return deferred.promise;
    }

    function updateRecipe(id, recipe) {
        var deferred = q.defer();
        delete recipe["_id"];
        RecipeModel.findOneAndUpdate({"_id": id}, {$set: recipe},{ 'new': true }, function(err, newRecipe) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(newRecipe);
            }
        });
        return deferred.promise;
    }

    function deleteRecipeById(id) {
        var deferred = q.defer();

        RecipeModel.remove({"_id": id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
};