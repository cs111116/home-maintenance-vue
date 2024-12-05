import { defineStore } from 'pinia';
import mainAxios from '@/plugins/axios';

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [], // 保存分類數據
  }),
  actions: {
    // 獲取分類數據
    async fetchCategories() {
      try {
        const response = await mainAxios.get('/categories');
        console.log('API Response:', response); // 確認完整結構
        this.categories = response.data.data || [];
        console.log('Updated Categories in Store:', this.categories); // 檢查更新後的值
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    // 新增分類
    async addCategory(category) {
      try {
        const response = await mainAxios.post('/categories', category);
        this.categories.push(response.data.category);
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    },
    // 刪除分類
    async deleteCategory(id) {
      try {
        await mainAxios.delete(`/api/categories/${id}`);
        this.categories = this.categories.filter((category) => category.id !== id);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    },
  },
});
