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
        <SearchBar @search="handleSearch" /> <!-- Trigger search handler -->
      </div>
      <!-- Shopping list for selected ingredients -->
      <div v-if="selectedIngredients.length > 0">
        <h2>Shopping List</h2>
        <ul>
          <li v-for="ingredient in selectedIngredients" :key="ingredient.id">
            {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <div id="recipeList">
        <!-- <SearchBar @search="handleSearch" /> Use the search bar component -->
        
        <div v-if="isLoading">Loading recipes...</div> <!-- Loading indicator -->
    
        <div id="recipe" v-else>
          <ul>
            <!-- Display list of recipes -->
            <li v-for="recipe in recipes" :key="recipe.id">
              <strong @click="toggleInstructions(recipe.id)"> <!-- Click to toggle instructions -->
                {{ recipe.title }}
              </strong>
    
              <!-- Display instructions in a dropdown when clicked -->
              <div v-if="recipe.showInstructions">
                <ol>
                  <img :src="recipe.image" alt="Recipe Image" style="width: 200px; height: 200px;" />
                  <p>Ingredients:</p>
                  <ul>
                    <li v-for="ingredient in recipe.nutrition.ingredients" :key="ingredient.id">
                      <input type="checkbox" :id="ingredient.id" :value="ingredient" v-model="selectedIngredients" @input="toggleIngredient(ingredient)"/> {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
                    </li>
                  </ul>
                  <!-- <p>Ingredients:</p>
                  <ul>
                    Display ingredients
                    <li v-for="ingredient in recipe.nutrition.ingredients" :key="ingredient.id">
                      {{ ingredient.amount }}
                      {{ ingredient.name }} Show original ingredient name
                      {{ ingredient.unit }}
                    </li>
                  </ul> -->
                  <li v-for="step in recipe.instructions" :key="step.number">
                    <strong>Step {{ step.number }}:</strong> {{ step.step }}
                  </li>
                </ol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </body>
    <footer>
      <p>&copy; 2024 Cooking Mama. All rights reserved.</p> <!-- Footer content -->
    </footer>
  </div>
</template>

<script>
// import SearchBar from './components/SearchBar.vue'; // Import SearchBar component
import CheckboxFilter from './components/CheckboxFilter.vue'; // Import CheckboxFilter component
import IngredientExclusion from './components/IngredientExclusion.vue'; // Import IngredientExclusion component
import { buildRecipeQuery, queryRecipes, getRecipeInformation } from '@/services/RecipeService.js'; // Import API service functions
import SearchBar from './components/SearchBar.vue';
// import RecipeInstructions from './components/RecipeInstructions.vue'; // Import your component

export default {
  components: {
    SearchBar, // Register SearchBar component
    CheckboxFilter, // Register CheckboxFilter component
    IngredientExclusion, // Register IngredientExclusion component
  },
  data() {
    return {
      searchQuery: '', // Search term
      dietaryRestrictions: [], // Selected dietary restrictions
      dietTypes: [], // Selected diet types
      excludedIngredients: [], // List of excluded ingredients
      recipes: [], // Fetched recipes,
      isLoading: false, // Loading state
      selectedIngredients: [], // Selected ingredients for shopping list
    };
  },
  methods: {
    // Handle search to fetch recipes based on query
    handleSearch(query) {
        this.searchQuery = query;
        this.fetchRecipes();
      },
    // Toggle the visibility of recipe instructions
    async toggleInstructions(recipeId) {
        const recipe = this.recipes.find((r) => r.id === recipeId);
  
        if (recipe.showInstructions) {
          // If instructions are visible, hide them
          recipe.showInstructions = false;
        } else {
          try {
            // Fetch recipe information to get the instructions
            const response = await getRecipeInformation(recipeId);
            
            recipe.showInstructions = true; // Toggle instructions on
            recipe.instructions = response.data.analyzedInstructions[0]?.steps || []; // Extract steps
          } catch (error) {
            console.error('Error fetching recipe instructions:', error); // Handle errors
          }
        }
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
    async fetchRecipes() {
      const query = buildRecipeQuery(this.searchQuery, this.dietaryRestrictions, this.dietTypes, this.excludedIngredients);
      this.isLoading = true; // Start loading state
        try {
          // Fetch recipes based on the search query
          const response = await queryRecipes(query);
          
          // Populate the recipes list with fetched results
          this.recipes = response.data.results.map((recipe) => ({
            ...recipe,
            showInstructions: false, // Initially hide instructions
          }));
          console.log(this.recipes);
        } catch (error) {
          console.error('Error fetching recipes:', error); // Log any errors
        } finally {
          this.isLoading = false; // End loading state
        }
    },
    toggleIngredient(ingredient) {
      const index = this.selectedIngredients.findIndex((i) => i.id === ingredient.id);
      if (index === -1) {
        this.selectedIngredients.push(ingredient);
      } else {
        this.selectedIngredients.splice(index, 1); // Deselect if already in the list
      }
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

.search-bar {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #f2f2f2;
}

.search-input {
  padding: 12px;
  border-radius: 15px;
  width: 300px;
  margin-right: 20px;
}

.search-button {
  padding: 8px 12px;
  background-color: #e55e5e;
  color: white;
}

.search-button:hover {
  background-color: #e55e5e;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

li:hover {
  background-color: #f76c6c;
  color: white;
}

img {
  padding: 20px;
}
</style>