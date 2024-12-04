import { defineStore } from 'pinia';
import axios from 'axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [], // 保存分類數據
  }),
  actions: {
    // 獲取分類數據
    async fetchCategories() {
      try {
        const response = await axios.get('/categories');
        this.categories = response.data.categories;
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    // 新增分類
    async addCategory(category) {
      try {
        const response = await axios.post('/categories', category);
        this.categories.push(response.data.category);
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    },
    // 刪除分類
    async deleteCategory(id) {
      try {
        await axios.delete(`/api/categories/${id}`);
        this.categories = this.categories.filter((category) => category.id !== id);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    },
  },
});
