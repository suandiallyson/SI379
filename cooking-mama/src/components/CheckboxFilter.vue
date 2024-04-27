<template>
  <div class="checkbox-section"> <!-- Parent div to center the whole section -->
    <div>
      <!-- Dietary Restrictions -->
      <h3>Dietary Restrictions</h3>
      <div class="checkbox-group"> <!-- Grid layout for checkboxes -->
        <div v-for="restriction in dietaryRestrictions" :key="restriction" class="checkbox-item">
          <input
            type="checkbox"
            :id="restriction"
            :value="restriction"
            v-model="selectedDietaryRestrictions"
            @change="emitSelection"
          />
          <label :for="restriction">{{ restriction }}</label>
        </div>
      </div>

      <!-- Diet Types -->
      <h3>Diet Types</h3>
      <div class="checkbox-group"> <!-- Grid layout for checkboxes -->
        <div v-for="diet in dietTypes" :key="diet" class="checkbox-item">
          <input
            type="checkbox"
            :id="diet"
            :value="diet"
            v-model="selectedDietTypes"
            @change="emitSelection"
          />
          <label :for="diet">{{ diet }}</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dietaryRestrictions: [
        'Dairy',
        'Egg',
        'Gluten',
        'Grain',
        'Peanut',
        'Seafood',
        'Sesame',
        'Shellfish',
        'Soy',
        'Sulfite',
        'Tree Nut',
        'Wheat',
      ],
      dietTypes: [
        'Gluten Free',
        'Ketogenic',
        'Vegetarian',
        'Lacto-Vegetarian',
        'Ovo-Vegetarian',
        'Vegan',
        'Pescetarian',
        'Paleo',
        'Primal',
        'Low FODMAP',
        'Whole30',
      ],
      selectedDietaryRestrictions: [],
      selectedDietTypes: [],
    };
  },
  methods: {
    emitSelection() {
      this.$emit('filter-changed', {
        dietaryRestrictions: this.selectedDietaryRestrictions,
        dietTypes: this.selectedDietTypes,
      });
    },
  },
};
</script>

<style scoped>
.checkbox-section {
  display: flex; /* Flex layout for centering */
  justify-content: center; /* Center horizontally */
  padding: 20px; /* Add padding around the section */
}

.checkbox-group {
  display: grid; /* Use CSS grid for organization */
  grid-template-columns: repeat(6, 1fr); /* 3 columns, adjust as needed */
  grid-gap: 10px; /* Space between checkboxes */
  background-color: #f5e4cf; /* Light background color for contrast */
  border-radius: 10px; /* Rounded corners */
  padding: 20px; /* Space inside the group */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  margin: 10px; /* Space around each group */
}

.checkbox-item {
  display: flex; /* Align checkbox and label */
  align-items: center; /* Vertical alignment */
}

.checkbox-item input {
  margin-right: 8px; /* Space between checkbox and label */
}

h3 {
  text-align: center; /* Center the header text */
  color: #f76c6c; /* Thematic color */
  margin-bottom: 15px; /* Space below the header */
}
</style>



<!-- 
<style scoped>
.checkbox-group {
  display: flex; /* Enable flex layout */
  justify-content: center; /* Center horizontally */
  flex-wrap: wrap; /* Wrap checkboxes to the next line if needed */
}

.checkbox-item {
  display: flex; /* Aligns the checkbox and label */
  align-items: center; /* Aligns checkbox and label vertically */
  margin: 10px; /* Adds margin around each checkbox-item */
}

.checkbox-item input {
  margin-right: 8px; /* Adds space between checkbox and label */
}

h3 {
  text-align: center; /* Center the header */
  color: #f76c6c; /* Thematic color */
}
</style> -->

  
  <!-- <style scoped>
  .checkbox-group {
    display: flex;
    flex-direction: row;
  }
  
  .checkbox-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .checkbox-item input {
    margin-right: 8px;
  }
  
  h3 {
    color: #f76c6c; /* Thematic color */
  }
  </style>
   -->