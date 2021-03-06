"use strict";
module.exports = function(app, model){
    // new recipe object in the body
    app.post(  "/rest/api/recipescom/recipe", createRecipe);

    // find all recipes OR get recipe by author email (query - author : email)
    app.get(   "/rest/api/recipescom/recipe", getRecipe);

    // get a recipe by id
    app.get(   "/rest/api/recipescom/recipe/:id", getRecipeById);

    // update a recipe by id
    app.put(   "/rest/api/recipescom/recipe/:id", updateRecipe);

    // delete a recipe by id
    app.delete("/rest/api/recipescom/recipe/:id", deleteRecipeById);


    app.get(   "/rest/api/recipescom/recipe/style-count/:style", getRecipesCountByStyle);
    app.get(   "/rest/api/recipescom/recipe/mealtype-count/:mealtype", getRecipesCountByMealtype);
    app.get(   "/rest/api/recipescom/recipe/style/:style", getRecipesByStyle);
    app.get(   "/rest/api/recipescom/recipe/mealtype/:mealtype", getRecipesByMealtype);


    /**
     * @param req
     * @param res - the created recipe (single recipe)
     */
    function createRecipe(req, res) {
        model
            .createRecipe(req.body)
            .then(function(recipe){
                res.json(recipe);
            });
    }


    /**
     * Get all recipes (for now)
     * @param req
     * @param res
     */
    function getRecipe(req, res) {
        if (req.query.author != undefined || req.query.author != null) {
            model
                .findRecipesByUserEmail(req.query.author)
                .then(function(recipes) {
                    res.json(recipes);
                });
        } else {
            model
                .findAllRecipe()
                .then(function(recipes) {
                    res.json(recipes);
                });
        }
    }

    function getRecipeById(req, res) {
        model
            .findRecipeById(req.params["id"])
            .then(function(recipe) {
                res.json(recipe);
            });
    }

    /**
     * updates an existing recipe whose id property is equal to the id path parameter.
     * The new properties are set to the values in the user object embedded in the HTTP request.
     * @param req : id (param), new recipe in the body
     * @param res
     */
    function updateRecipe(req, res) {
        model
            .updateRecipe(req.params["id"], req.body)
            .then(function(recipe) {
                res.json(recipe);
            });
    }

    /**
     * removes an existing recipe whose id property is equal to the id path parameter.
     * @param req
     * @param res
     */
    function deleteRecipeById(req, res) {
        model
            .deleteRecipeById(req.params["id"])
            .then(function(result) {
                res.json(result);
            });
    }

    function getRecipesCountByStyle(req, res) {
        model
            .getRecipeCountByStyle(req.params["style"])
            .then(function(count) {
                res.json(count);
            });
    }

    function getRecipesCountByMealtype(req, res) {
        model
            .getRecipeCountByMealtype(req.params["mealtype"])
            .then(function(count) {
                res.json(count);
            });
    }

    function getRecipesByStyle(req, res) {
        model
            .findRecipesByStyle(req.params["style"])
            .then(function(recipes) {
                res.json(recipes);
            });
    }

    function getRecipesByMealtype(req, res) {
        model
            .findRecipesByMealtype(req.params["mealtype"])
            .then(function (recipes) {
                res.json(recipes);
            });
    }
};