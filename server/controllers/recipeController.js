const SpoonacularApi = require('spoonacular_api');

const defaultClient = SpoonacularApi.ApiClient.instance;

const apiKeyScheme = defaultClient.authentications['apiKeyScheme']; 
apiKeyScheme.apiKey = process.env.API_KEY
console.log(apiKeyScheme)
console.log(process.env.API_KEY)
const apiInstance = new SpoonacularApi.RecipesApi();

// JC Imports: To save recipe and update existing userDoc. Can move import and method to userController if more appropriate
const User = require('../models/userModel');

// Helper Function to Deconstruct Api response for Frontend, adjust allowed filters for additional props
const deconstruct = (data) => {
  const newData = [];
for (const recipe of data){
  const allowed = ['id', 'title', 'image', 'readyInMinutes', 'dairyFree', 'glutenFree', 'vegan', 'vegetarian', 'diets']
  const cleanRecipe = {};

  for (let key in recipe){
      if(allowed.includes(key)){
          cleanRecipe[key] = recipe[key]
      }
  }
  newData.push(cleanRecipe)
}
return newData
}

let opts = {
  'query': 'beef',
  'cuisine': 'indian',
  'instructionsRequired': true, // Boolean | Whether the recipes must have instructions.
  'addRecipeNutrition': true, // Boolean | If set to true, you get more information about the recipes returned.
  'includeNutrition': true,
  'addRecipeInformation': true, 
  'limitLicense': true, // Boolean | Whether the recipes should have an open license that allows display with proper attribution.
  'intolerances': 'gluten', // String | A comma-separated list of intolerances. All recipes returned must not contain ingredients that are not suitable for people with the intolerances entered. See a full list of supported intolerances.
  'number': 5 // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
};

const recipeController = {}; 

recipeController.getRandomRecipe = (req, res, next) => {
  console.log('getRandomRecipe Controller');

  apiInstance.getRandomRecipes(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log('API called successfully. Returned data: ' + console.log(JSON.stringify(data, null, 2)))
      res.locals.randomRecipe = JSON.stringify(data);
      return next()
    }
  });

} 

recipeController.searchRecipes = (req, res, next) => {

  apiInstance.searchRecipes(opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      let ids = data.results.map((e)=> e.id).toString()
      // console.log('test ids ---------', ids)
      // console.log('<<<<<<<<<<<<< PRE second Api Call >>>>>>>>>>>>>>>>>>>>>>')

      apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
        if (error) {
          console.error(error);
        } else {
         res.locals.recipes = deconstruct(data)
         return next()
        }
      });
    }
  });
  // Inner Api Query based on IDs of first query?
  // The second part of this route has NOT been tested
  // Be mindful that these will result in two requests each time... or more
  // apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log('API called successfully. Returned data: ' + data);
  //   }
  // });

} 

// If we decide to make a separate page, we will need this controller for additional calls
// Otherwise this can be included in the earlier call nested
recipeController.getRecipeInformationBulk = (req, res, next) => {
  console.log('bulk');

  apiInstance.getRecipeInformationBulk(ids, opts, (error, data, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log(data)

      return next()
    }
  });

} 

// JC New Code: Update savedRecipes property on userDoc
recipeController.updateSavedRecipes = async (req, res, next) => {

  try {
    const saveNewRecipe = req.body;
    
    // JC: Example variable from cookies to query DB for this specific user. 
    const { id } = res.locals.user;
    console.log(id)
    console.log("PRE FIND BY ID")

    const userDoc = await User.findByIdAndUpdate({ _id: id },
      {
      $push: {
        savedRecipes: saveNewRecipe,
      },
    },);
    return next();
  }
  catch(err) {
    return next({
      log: 'Error occured in recipeController.updateSavedRecipes',
      status: 400,
      message: { err: `recipeController.updateSavedRecipes: ${err}` }
    });
  }
}




module.exports = recipeController;