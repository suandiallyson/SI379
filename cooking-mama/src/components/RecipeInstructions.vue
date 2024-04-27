

<script>
import axios from 'axios'; // For HTTP requests

export default {
  props: {
    // Ensure recipeId is a required prop
    recipeId: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      instructions: [], // Store fetched instructions
      isLoading: true, // Loading state
      error: '', // Error message
    };
  },
  created() {
    // Fetch instructions when the component is created
    this.fetchInstructions();
  },
  methods: {
    async fetchInstructions() {
      try {
        const response = await axios.get(
          // Use the recipeId prop to construct the URL
          `https://api.spoonacular.com/recipes/${this.recipeId}/analyzedInstructions`,
          {
            params: {
              apiKey: '8e28d489ddfd44a7af1137b5ca53fc61', // Use your Spoonacular API key
              stepBreakdown: true, // Get detailed step breakdown
            },
          }
        );

        if (response.data.length > 0) {
          // Store fetched instructions
          this.instructions = response.data[0].steps;
        } else {
          // Handle case when no instructions are found
          this.error = 'No instructions found for this recipe.';
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Specific error message for 404 status
          this.error = 'Recipe instructions not found. Please check the recipe ID.';
        } else {
          // Log other errors and show a general error message
          console.error('Error fetching recipe instructions:', error);
          this.error = 'An error occurred while fetching recipe instructions.';
        }
      } finally {
        // Loading state is complete
        this.isLoading = false;
      }
    },
  },
};
</script>
