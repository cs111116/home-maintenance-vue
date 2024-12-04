import { defineStore } from 'pinia';
import { useCategoryStore } from './category';
// import { useSubcategoryStore } from './subcategory';
// import { usePaymentMethodStore } from './paymentMethod';
// import { useItemStore } from './item';

export const useAccountingStore = defineStore('accounting', {
  actions: {
    async fetchAllAccountingData() {
      const categoryStore = useCategoryStore();
    //   const subcategoryStore = useSubcategoryStore();
    //   const paymentMethodStore = usePaymentMethodStore();
    //   const itemStore = useItemStore();

      // 平行加載所有會計相關數據
      await Promise.all([
        categoryStore.fetchCategories(),
        // subcategoryStore.fetchSubcategories(),
        // paymentMethodStore.fetchPaymentMethods(),
        // itemStore.fetchItems(),
      ]);
    },
  },
});
