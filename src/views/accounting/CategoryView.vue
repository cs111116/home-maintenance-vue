<template>
  <div class="category-container">
    <div class="header">
      <h1>分類管理</h1>
      <button @click="showAddModal = true" class="primary-button">新增分類</button>
    </div>

    <AddCategoryModal v-if="showAddModal" @close="showAddModal = false" @submit="addCategory" />

    <EditCategoryModal v-if="showEditModal" :category="selectedCategory" @close="showEditModal = false"
      @submit="editCategory" />

    <div class="category-list">
      <div class="category-item" v-for="category in categories" :key="category.id">
        <span class="category-name">{{ category.name }}</span>
        <button @click="prepareEdit(category)" class="edit-button">修改</button>
        <button @click="deleteCategory(category.id)" class="delete-button">
          刪除
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoryStore } from "@/store/modules/accounting/category";
import AddCategoryModal from "@/components/accounting/AddCategoryModal.vue";
import EditCategoryModal from "@/components/accounting/EditCategoryModal.vue";
import { computed, ref, onMounted } from "vue";

export default {
  name: "CategoryView",
  components: {
    AddCategoryModal,
    EditCategoryModal,
  },
  setup() {
    const categoryStore = useCategoryStore();
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const selectedCategory = ref(null);

    const categories = computed(() => categoryStore.categories);

    onMounted(async () => {
      await categoryStore.fetchCategories();
    });

    const addCategory = async (category) => {
      await categoryStore.addCategory(category);
      showAddModal.value = false;
    };

    const prepareEdit = (category) => {
      selectedCategory.value = category;
      showEditModal.value = true;
    };

    const editCategory = async (updatedCategory) => {
      await categoryStore.updateCategory(updatedCategory);
      showEditModal.value = false;
    };

    const deleteCategory = async (id) => {
      await categoryStore.deleteCategory(id);
    };

    return {
      showAddModal,
      showEditModal,
      selectedCategory,
      categories,
      addCategory,
      prepareEdit,
      editCategory,
      deleteCategory,
    };
  },
};
</script>

<style scoped>
.category-container {
  max-width: 800px;
  margin: 40px auto;
  background-color: #f9f9f9;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.primary-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.primary-button:hover {
  background-color: #0056b3;
}

.category-list {
  margin-top: 20px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.category-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.delete-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #b52a35;
}

/* 修改按鈕樣式 */
.edit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-button:hover {
  background-color: #0056b3;
}
</style>
