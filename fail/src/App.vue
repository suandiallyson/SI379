<template>
  <div id="app">
    <header>
      <img src="./assets/images/logo.png" alt="Cooking Mama" width="100" height="auto" />
    </header>

    <nav>
      <!-- Navigation elements, if needed -->
    </nav>

    <body>
      <h2>Find a recipe that suits your needs!</h2>
      <div id="checkDiv">
        <CheckboxFilter @filter-changed="handleFilterChange" />
      </div>
      <div id="ingredientDiv">
        <IngredientExclusion @exclusion-changed="handleExclusionChange" />
      </div>
      <div id="searchDiv">
        <SearchBar @search="handleSearch" />
      </div>

      <!-- Recipe list with links to detailed instructions -->
      <div>
    <!-- List of recipes with correct links to detailed instructions -->
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <router-link :to="`/recipe/${Number(recipe.id)}`"> <!-- Pass the correct recipe ID -->
          {{ recipe.title }}
        </router-link>
      </li>
    </ul>
    </div>
    <div>
      <!-- <RecipeInstructions :id="Number(recipeId)" /> -->
      <RecipeSearch /> 
    </div>
      
    </body>

    <main>
      <!-- <router-view /> Render different components based on routing -->
    </main>

    <footer>
      <p>&copy; 2024 Cooking Mama. All rights reserved.</p> <!-- Footer content -->
    </footer>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'; // Import SearchBar component
import CheckboxFilter from './components/CheckboxFilter.vue'; // Import CheckboxFilter component
import IngredientExclusion from './components/IngredientExclusion.vue'; // Import IngredientExclusion component
import { buildRecipeQuery, queryRecipes } from '@/services/RecipeService.js'; // Import API service functions
// import RecipeList from './components/RecipeList.vue'; // Import RecipeList component
// import SearchBar from './components/RecipeList.vue';
// import RecipeInstructions from './components/RecipeInstructions.vue'; // Import your component

export default {
  components: {
    SearchBar, // Register SearchBar component
    CheckboxFilter, // Register CheckboxFilter component
    IngredientExclusion, // Register IngredientExclusion component
    // RecipeList, // Register RecipeList component
  },
  data() {
    return {
      searchQuery: '', // Search term
      dietaryRestrictions: [], // Selected dietary restrictions
      dietTypes: [], // Selected diet types
      excludedIngredients: [], // List of excluded ingredients
      recipes: [], // Fetched recipes
    };
  },
  methods: {
    handleSearch(searchQuery) {
      this.searchQuery = searchQuery;
      this.fetchRecipes(); // Fetch recipes with the new search query
    },
    handleFilterChange(filter) {
      this.dietaryRestrictions = filter.dietaryRestrictions;
      this.dietTypes = filter.dietTypes;
      this.fetchRecipes(); // Fetch recipes with updated filters
    },
    handleExclusionChange(excludedIngredients) {
      this.excludedIngredients = excludedIngredients;
      this.fetchRecipes(); // Fetch recipes with updated exclusions
    },
    fetchRecipes() {
      const query = buildRecipeQuery(this.searchQuery, this.dietaryRestrictions, this.dietTypes, this.excludedIngredients);
      queryRecipes(query) // Fetch recipes based on the query
        .then((response) => {
          this.recipes = response.data.results; // Store fetched recipes
        })
        .catch((error) => {
          console.error('Error fetching recipes:', error);
        });
    },
  },
};
</script>

<style scoped>
/* Basic styling for the app */
body {
  font-family: 'Arial Rounded MT Bold', Arial, sans-serif;
  background-color: #F5F1EE; /* Background color */
}

#searchDiv, #checkDiv, #ingredientDiv {
  margin-top: 50px; /* Spacing for different sections */
}

#app {
  text-align: center; /* Center text */
  background-color: #F5F1EE; /* Background color */
}

header {
  padding: 1rem; /* Padding for header */
  color: white; /* Text color */
}

footer {
  padding: 0.5rem; /* Padding for footer */
  color: #e55e5e; /* Thematic color for footer */
  font-family: 'Arial Rounded MT Bold', Arial, sans-serif;
}

h2 {
  font-size: 28px; /* Font size for heading */
  color: #e55e5e; /* Thematic color */
}

h3 {
  font-size: 20px; /* Font size for subheading */
  color: #e55e5e; /* Thematic color */
}

li {
  list-style-type: none; /* No bullet points */
  padding: 15px; /* Spacing between list items */
}
</style>