<template>
  <div class="search-bar">
    <input
      v-model="searchQuery" 
      placeholder="Search for recipes..."
      @keyup.enter="search" 
      class="search-input"
    />
    <button @click="search" class="search-button">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '', // Store the search query
    };
  },
  methods: {
    search() {
      console.log("Searching...");
      this.$emit('search', this.searchQuery); // Emit the search event with the query
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