<template>
  <div>
    <h2>Recipe List</h2>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        <router-link :to="`/recipe/${recipe.id}`">{{ recipe.title }}</router-link> <!-- Navigate to RecipeDetails -->
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: [
      ], // Example recipe data
    };
  },
};
</script>

<!-- <template>
    <div>
      <h2>Search for Recipes</h2>
      <SearchBar @search="searchRecipes" />
      
      <div v-if="recipes && recipes.length > 0">
        <RecipesList :recipes="recipes" @selectRecipe="viewRecipeDetails" />
      </div>
      
      <div v-else>
        <p>No recipes found. Please try a different search term.</p>
      </div>
    </div>
  </template>
  
  <script>
  import SearchBar from '@/components/SearchBar.vue';
  import RecipesList from '@/components/RecipeList.vue';
  import RecipeService from '@/services/RecipeService';
  
  export default {
    components: {
      SearchBar,
      RecipesList,
    },
    data() {
      return {
        recipes: [],
      };
    },
    methods: {
      searchRecipes(searchQuery) {
        // Call the RecipeService to get the recipes based on the search query
        RecipeService.getRecipes({ query: searchQuery })
          .then((response) => {
            this.recipes = response.data.results;
          })
          .catch((error) => {
            console.error("Error fetching recipes:", error);
          });
      },
      viewRecipeDetails(recipe) {
        // Navigate to the RecipeDetails view with the recipe ID
        this.$router.push({ name: 'RecipeDetails', params: { id: recipe.id } });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Style for the Home view */
  h2 {
    color: #f76c6c; /* Cooking Mama theme color */
  }
  </style> -->
  