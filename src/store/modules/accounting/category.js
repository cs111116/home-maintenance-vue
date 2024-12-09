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
        this.categories = response.data.data || [];
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    },
    // 新增分類
    async addCategory(category) {
      try {
        const response = await mainAxios.post('/categories', category);
        this.categories.push(response.data.data);
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    },
    async updateCategory(updatedCategory) {
      console.log("editCategory triggered from:", updatedCategory);
      if (!updatedCategory || !updatedCategory.id) {
        console.error("更新分類失敗: 缺少 ID");
        return;
      }
      try {
        const response = await mainAxios.put(
          `/categories/${updatedCategory.id}`,
          updatedCategory
        );
        const index = this.categories.findIndex(
          (category) => category.id === updatedCategory.id
        );
        if (index !== -1) {
          this.categories[index] = response.data.data;
        }
      } catch (error) {
        console.error("Failed to update category:", error);
      }
    },
    // 刪除分類
    async deleteCategory(id) {
      try {
        await mainAxios.delete(`categories/${id}`);
        this.categories = this.categories.filter((category) => category.id !== id);
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    },
  },
});
