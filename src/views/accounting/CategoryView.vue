<template>
  <div>
    <h1>分類管理</h1>
    <button @click="showAddModal = true">新增分類</button>

    <!-- 新增分類的彈窗 -->
    <AddCategoryModal v-if="showAddModal" @close="showAddModal = false" @submit="addCategory" />

    <!-- 顯示分類清單 -->
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
        <button @click="deleteCategory(category.id)">刪除</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCategoryStore } from '@/store/modules/accounting/category';
import AddCategoryModal from '@/components/accounting/AddCategoryModal.vue';

export default {
  name: 'CategoryView',
  components: {
    AddCategoryModal,
  },
  setup() {
    const categoryStore = useCategoryStore();

    // 載入分類數據
    categoryStore.fetchCategories();

    return {
      categories: categoryStore.categories, // 綁定分類數據
      addCategory: categoryStore.addCategory, // 新增分類
      deleteCategory: categoryStore.deleteCategory, // 刪除分類
      showAddModal: false, // 控制新增彈窗的顯示
    };
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
button {
  margin: 5px;
}
</style>
