<template>
  <div class="add-excluded-ingredients"> <!-- Flex layout for side-by-side alignment -->
    <!-- Left section: header and input field -->
    <div class="input-section"> <!-- Column layout for header and input/button -->
      <h3>Add ingredients you want to exclude</h3> <!-- Header above input -->
      <div class="input-row"> <!-- Flex layout for input and button -->
        <input
          v-model="newIngredient"
          placeholder="Add an ingredient to exclude"
          @keyup.enter="addIngredient"
        />
        <button @click="addIngredient">Add</button> <!-- Button on the same line as input -->
      </div>
    </div>

    <!-- Right section: list of excluded ingredients -->
    <div class="excluded-ingredients"> <!-- Section for the list -->
      <h3>List of Excluded Ingredients</h3>
      <ul>
        <li v-for="(ingredient, index) in excludedIngredients" :key="index">
          {{ ingredient }}
          <button @click="removeIngredient(index)">Remove</button> <!-- Button to remove ingredient -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newIngredient: '', // Holds the value for the new ingredient
      excludedIngredients: [], // List of excluded ingredients
    };
  },
  methods: {
    addIngredient() {
      if (this.newIngredient.trim()) {
        this.excludedIngredients.push(this.newIngredient.trim()); // Add to list
        this.newIngredient = ''; // Clear the input field
        this.emitExclusionList(); // Emit the updated list
      }
    },
    removeIngredient(index) {
      this.excludedIngredients.splice(index, 1); // Remove from the list
      this.emitExclusionList(); // Emit the updated list
    },
    emitExclusionList() {
      this.$emit('exclusion-changed', this.excludedIngredients); // Emit the updated list
    },
  },
};
</script>


<style scoped>
input {
  padding: 12px; /* Increase padding for a larger field */
  border: 1px solid #ccc; /* Border styling */
  border-radius: 8px; /* Rounded corners */
  width: 250px; /* Increase width for a larger field */
  font-size: 16px; /* Increase font size */
  margin-right: 10px; /* Space between input and other elements */
}

button {
  padding: 10px 14px; /* Adjust padding for the button */
  border: none; /* No border */
  border-radius: 8px; /* Rounded corners */
  background-color: #f76c6c; /* Button color */
  color: white; /* Text color */
  cursor: pointer; /* Change cursor on hover */
}

button:hover {
  background-color: #e55e5e; /* Hover effect for the button */
}

.excluded-ingredients ul {
  list-style-type: none; /* No bullet points */
  padding: 0; /* Remove default padding */
}

.excluded-ingredients ul li {
  display: flex; /* Align items horizontally */
  justify-content: space-between; /* Space between text and button */
  padding: 10px 0; /* Add vertical padding for spacing */
  border-bottom: 1px solid #ccc; /* Optional: Divider between list items */
}

.input-row {
  display: flex; /* Flex layout for input and button */
  align-items: center; /* Align them on the same line */
}

.input-section {
  display: flex; /* Flex layout */
  flex-direction: column; /* Separate header from input/button */
}

.add-excluded-ingredients {
  display: flex; /* Flex layout for side-by-side alignment */
  justify-content: center; /* Center the components horizontally */
  gap: 20px; /* Space between sections */
}

h3 {
  font-size: 20px; /* Font size for the header */
  color: #e55e5e; /* Thematic color */
  margin-bottom: 10px; /* Space below the header */
}
</style>




  
  <!-- <style scoped>
  /* Basic styling for the input field and button */
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-right: 10px;
  }
  
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 8px;
    background-color: #f76c6c;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #e55e5e;
  }
  
  /* Styling for the list of excluded ingredients */
  .excluded-ingredients {
    margin-top: 15px;
  }
  
  .excluded-ingredients ul {
    list-style-type: disc;
  }
  
  .excluded-ingredients ul li {
    display: flex;
    justify-content: space-between;
  }
  
  .excluded-ingredients button {
    margin-top: 10px;
    background-color: #f76c6c;
    border: none;
    color: white;
    border-radius: 8px;
    padding: 5px;
    cursor: pointer;
  }
  
  .excluded-ingredients button:hover {
    background-color: #e55e5e;
  }

  h3 {
  font-size: 20px;
  color: #e55e5e;
  }
  </style>
   -->