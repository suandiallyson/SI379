<template>
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <p>{{ recipe.summary }}</p>
      
      <h3>Ingredients</h3>
      <ul>
        <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.id">
          {{ ingredient.original }}
        </li>
      </ul>
  
      <h3>Instructions</h3>
      <div v-html="recipe.instructions"></div>
    </div>
  
    <div v-else>
      <p>Loading recipe details...</p>
    </div>
  </template>
  
  <script>
  import RecipeService from '@/services/RecipeService';
  
  export default {
    data() {
      return {
        recipe: null,
      };
    },
    methods: {
      fetchRecipe() {
        const recipeId = this.$route.params.id;
        RecipeService.getRecipeDetails(recipeId)
          .then((response) => {
            this.recipe = response.data;
          })
          .catch((error) => {
            console.error("Error fetching recipe details:", error);
          });
      },
    },
    created() {
      // Fetch recipe details when this view is created
      this.fetchRecipe();
    },
  };
  </script>
  
  <style scoped>
  /* Style for the RecipeDetails view */
  h1 {
    color: #f76c6c; /* Cooking Mama theme color */
  }
  
  h3 {
    margin-top: 1rem;
  }
  
  ul {
    list-style-type: disc;
    padding-left: 1.5rem;
  }
  </style>
  