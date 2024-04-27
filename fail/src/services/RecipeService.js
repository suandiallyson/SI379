import axios from 'axios';

const BASE_URL = 'https://api.spoonacular.com';
const API_KEY = 'a9e5bbca1a064a8b9d38095b494bf785'; // Ensure this is your actual API key

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
function buildRecipeQuery(searchQuery, dietaryRestrictions, dietTypes, excludedIngredients) {
  return {
    query: searchQuery,
    intolerances: dietaryRestrictions.join(","), // Comma-separated list of intolerances
    diet: dietTypes.join(","), // Comma-separated list of diet types
    excludeIngredients: excludedIngredients.join(","), // Comma-separated list of ingredients to exclude
    instructionsRequired: true, // Whether to require instructions
  };
}

function queryRecipes(query) {
  return apiClient
    .get('/recipes/complexSearch', {
      params: {
        ...query,
        instructionsRequired: true, // Ensure instructions are included
        addRecipeInformation: true, // Include recipe information
        addRecipeInstructions: true, // Include analyzed instructions
        includeIngredients: true, // Include ingredients
        addRecipeNutrition: true, // Include nutrition information
        apiKey: API_KEY, // Include your API key
        maxServings: 10, // Limit to 10 servings
      },
    })
    .catch((error) => {
      console.error('Error querying recipes:', error);
      throw error; // Re-throw error to handle it elsewhere
    });
}

function getRecipeInformation(recipeId, includeNutrition = false) {
  return apiClient
    .get(`/recipes/${recipeId}/information`, {
      params: {
        apiKey: API_KEY, // Include your API key
        includeNutrition,
      },
    })
    .catch((error) => {
      console.error('Error fetching recipe information:', error);
      throw error; // Re-throw error to handle it elsewhere
    });
}

// Ensure both functions are exported
export { buildRecipeQuery, queryRecipes, getRecipeInformation };

// import axios from 'axios';

// // Base URL for the Spoonacular API
// const BASE_URL = 'https://api.spoonacular.com';

// // Your API key for authenticating with the Spoonacular API
// const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

// // Create an Axios instance with the base configuration
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// // Fetch detailed recipe information by ID
// function getRecipeInformation(recipeId, includeNutrition = false) {
//   return apiClient.get(`/recipes/${recipeId}/information`, {
//     params: {
//       apiKey: API_KEY, // Include the API key in the request
//       includeNutrition, // Whether to include nutrition data
//     },
//   });
// }

// function buildRecipeQuery(searchQuery, dietaryRestrictions, dietTypes, excludedIngredients) {
//   const query = {
//     query: searchQuery,
//     intolerances: dietaryRestrictions.join(','), // Comma-separated list of intolerances
//     diet: dietTypes.join(','), // Comma-separated list of diet types
//     excludeIngredients: excludedIngredients.join(','), // Comma-separated list of ingredients to exclude
//     instructionsRequired: true, // Additional query parameter
//   };

//   return query;
// }

// // Function to send the query to the Spoonacular API
// function queryRecipes(query) {
//   return apiClient.get('/recipes/complexSearch', {
//     params: {
//       ...query, // Spread the query object
//       apiKey: API_KEY, // Include the API key in the request
//     },
//   });
// }

// Export the new function
// export { getRecipeInformation, buildRecipeQuery, queryRecipes };

// import axios from 'axios';

// // Base URL for the Spoonacular API
// const BASE_URL = 'https://api.spoonacular.com';

// // Your API key for authenticating with the Spoonacular API
// const API_KEY = 'dc9038e58c4a45c18fa9d87456489229'; // Replace with your actual API key

// // Create an Axios instance with the base configuration
// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// // Build the query object for the API
// function buildRecipeQuery(searchQuery, dietaryRestrictions, dietTypes, excludedIngredients) {
//   const query = {
//     query: searchQuery,
//     intolerances: dietaryRestrictions.join(','), // Comma-separated list of intolerances
//     diet: dietTypes.join(','), // Comma-separated list of diet types
//     excludeIngredients: excludedIngredients.join(','), // Comma-separated list of ingredients to exclude
//     instructionsRequired: true, // Additional query parameter
//   };

//   return query;
// }

// // Function to send the query to the Spoonacular API
// function queryRecipes(query) {
//   return apiClient.get('/recipes/complexSearch', {
//     params: {
//       ...query, // Spread the query object
//       apiKey: API_KEY, // Include the API key in the request
//     },
//   });
// }

// // Export the functions to use them in other components
// export { buildRecipeQuery, queryRecipes };

// import axios from 'axios';

// const API_KEY = 'dc9038e58c4a45c18fa9d87456489229';  // Replace this with your actual API key
// const apiClient = axios.create({
//   baseURL: 'https://api.spoonacular.com',
//   withCredentials: false,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export default {
//   getRecipes(params) {
//     return apiClient.get(`/recipes/complexSearch?apiKey=${API_KEY}`, { params });
//   },
//   getRecipeDetails(id) {
//     return apiClient.get(`/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true`);
//   },
// };

// import axios from 'axios';

// const API_KEY = 'dc9038e58c4a45c18fa9d87456489229'; // Ensure your API key is correct
// const BASE_URL = 'https://api.spoonacular.com';

// function queryRecipes(query) {
//   const endpoint = `${BASE_URL}/recipes/complexSearch`;
//   return axios.get(endpoint, {
//     params: {
//       ...query,
//       apiKey: API_KEY, // Include the API key in the request
//     },
//   });
// }
