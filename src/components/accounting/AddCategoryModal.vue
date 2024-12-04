<template>
  <div class="modal">
    <h2>新增分類</h2>
    <form @submit.prevent="submit">
      <label for="name">分類名稱:</label>
      <input type="text" v-model="category.name" id="name" required />

      <button type="submit">確定</button>
      <button type="button" @click="$emit('close')">取消</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'AddCategoryModal',
  emits: ['submit', 'close'],
  setup(_, { emit }) {
    const category = reactive({
      name: '',
    });

    const submit = () => {
      emit('submit', { ...category });
      category.name = ''; // 清空表單
      emit('close'); // 關閉彈窗
    };

    return {
      category,
      submit,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
}
</style>
