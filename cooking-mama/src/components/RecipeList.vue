<template>
  <div>
    <SearchBar @search="handleSearch" /> <!-- Use the search bar component -->

    <!-- Shopping list for selected ingredients -->
    <div v-if="selectedIngredients.length > 0">
      <h2>Shopping List</h2>
      <ul>
        <li v-for="ingredient in selectedIngredients" :key="ingredient.id">
          {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
        </li>
      </ul>
    </div>

    <div v-if="isLoading">Loading recipes...</div> <!-- Loading indicator -->

    <div v-else>
      <ul>
        <!-- Display list of recipes -->
        <li v-for="recipe in recipes" :key="recipe.id">
          <strong @click="toggleInstructions(recipe.id)"> <!-- Click to toggle instructions -->
            {{ recipe.title }}
          </strong>

          <!-- Display instructions in a dropdown when clicked -->
          <div v-if="recipe.showInstructions">
            <img :src="recipe.image" alt="Recipe Image" style="width: 200px; height: 200px;" />
            <h3>Ingredients:</h3>
            <ul>
              <!-- Display ingredients with checkboxes -->
              <li
                v-for="ingredient in recipe.nutrition.ingredients"
                :key="ingredient.id"
              >
                <input
                  type="checkbox"
                  :id="ingredient.id"
                  :value="ingredient"
                  v-model="selectedIngredients"
                  @input="toggleIngredient(ingredient)"
                />
                {{ ingredient.amount }} {{ ingredient.unit }} {{ ingredient.name }}
              </li>
            </ul>

            <!-- Display recipe instructions -->
            <ol>
              <li v-for="step in recipe.instructions" :key="step.number">
                <strong>Step {{ step.number }}:</strong> {{ step.step }}
              </li>
            </ol>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { queryRecipes, getRecipeInformation } from '@/services/RecipeService'; // Import services
import SearchBar from './SearchBar.vue'; // Import the search bar component

export default {
  components: {
    SearchBar, // Register the search bar component
  },
  data() {
    return {
      recipes: [], // Store fetched recipes
      isLoading: false, // Loading state
      selectedIngredients: [], // List of selected ingredients
    };
  },
  methods: {
    // Handle search to fetch recipes based on query
    async handleSearch(query) {
      this.isLoading = true; // Start loading state
      this.recipes = []; // Clear previous recipes

      try {
        // Fetch recipes based on the search query
        const response = await queryRecipes({ query }); // Pass the search query
        
        // Populate the recipes list with fetched results
        this.recipes = response.data.results.map((recipe) => ({
          ...recipe,
          showInstructions: false, // Initially hide instructions
        }));
      } catch (error) {
        console.error('Error fetching recipes:', error); // Log any errors
      } finally {
        this.isLoading = false; // End loading state
      }
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

    // Toggle ingredient selection for shopping list
    toggleIngredient(ingredient) {
      const index = this.selectedIngredients.findIndex(
        (i) => i.id === ingredient.id
      );
      if (index === -1) {
        this.selectedIngredients.push(ingredient);
      } else {
        this.selectedIngredients.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
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




<!-- <template>
    <div>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.id">
          {{ recipe.title }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['recipes'],
  };
  </script> -->
  