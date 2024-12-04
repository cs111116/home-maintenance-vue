import CategoryView from '../../views/accounting/CategoryView.vue';
// import SubcategoryView from '../../views/accounting/SubcategoryView.vue';
// import PaymentMethodView from '../../views/accounting/PaymentMethodView.vue';
// import ItemView from '../../views/accounting/ItemView.vue';

export default [
  {
    path: '/accounting/categories',
    name: 'Categories',
    component: CategoryView,
    meta: { requiresAuth: true }, // 確保需要登入
  },
//   {
//     path: '/accounting/subcategories',
//     name: 'Subcategories',
//     component: SubcategoryView,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/accounting/payment-methods',
//     name: 'PaymentMethods',
//     component: PaymentMethodView,
//     meta: { requiresAuth: true },
//   },
//   {
//     path: '/accounting/items',
//     name: 'Items',
//     component: ItemView,
//     meta: { requiresAuth: true },
//   },
];
