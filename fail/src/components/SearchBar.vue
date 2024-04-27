<template>
  <div>
    <!-- Search Bar -->
    <div class="search-bar">
      <input
        v-model="searchQuery"
        placeholder="Search for recipes..."
        @keyup.enter="search"
        class="search-input"
      />
      <button @click="search" class="search-button">Search</button>
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

    <!-- Loading indicator while fetching recipes -->
    <div v-if="isLoading">Loading recipes...</div> 

    <!-- Display the list of recipes -->
    <div v-else>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.id">
          <strong @click="toggleInstructions(recipe.id)">
            {{ recipe.title }}
          </strong>

          <!-- Toggle instructions when clicked -->
          <div v-if="recipe.showInstructions">
            <img :src="recipe.image" alt="Recipe Image" style="width: 200px; height: 200px;" />
            <h3>Ingredients:</h3>
            <ul>
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

            <!-- Recipe instructions -->
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
import { queryRecipes, getRecipeInformation } from '@/services/RecipeService'; 

export default {
  data() {
    return {
      searchQuery: '', // Search term
      recipes: [], // List of fetched recipes
      isLoading: false, // Loading state
      selectedIngredients: [], // Shopping list items
    };
  },
  methods: {
    search() {
      this.handleSearch(this.searchQuery); // Initiate a search with the current query
    },
    
    // Fetch recipes based on search query
    async handleSearch(query) {
      this.isLoading = true; // Start loading state
      this.recipes = []; // Clear previous list

      try {
        const response = await queryRecipes({ query }); // Fetch recipes
        this.recipes = response.data.results.map((recipe) => ({
          ...recipe,
          showInstructions: false, // Initially hide instructions
        }));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        this.isLoading = false; // End loading state
      }
    },

    // Toggle the visibility of recipe instructions
    async toggleInstructions(recipeId) {
      const recipe = this.recipes.find((r) => r.id === recipeId);

      if (recipe.showInstructions) {
        recipe.showInstructions = false; // Hide instructions
      } else {
        try {
          const response = await getRecipeInformation(recipeId); // Fetch instructions
          recipe.showInstructions = true; // Show instructions
          recipe.instructions = response.data.analyzedInstructions[0]?.steps || [];
        } catch (error) {
          console.error('Error fetching recipe instructions:', error);
        }
      }
    },

    // Toggle ingredient selection for shopping list
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
  background-color: #f76c6c;
  color: white;
}

.search-button:hover {
  background-color: #e55e5e;
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
