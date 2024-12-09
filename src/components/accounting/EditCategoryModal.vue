<template>
  <div class="modal">
    <div class="modal-content">
      <h2>修改分類</h2>
      <form @submit.prevent="submitEditCategory">
        <div class="form-group">
          <label for="categoryName">分類名稱</label>
          <input type="text" id="categoryName" v-model="categoryName" placeholder="輸入新的分類名稱" required />
        </div>
        <div class="modal-actions">
          <button type="submit" class="save-button">
            儲存
          </button>
          <button type="button" class="cancel-button" @click="$emit('close')">
            取消
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "EditCategoryModal",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const categoryName = ref("");
    // 監聽傳入的 category prop，並初始化分類名稱
    watch(
      () => props.category,
      (newCategory) => {
        console.log("props.category updated:", newCategory);
        if (newCategory) {
          categoryName.value = newCategory.name;
        } else {
          console.error("Invalid category received:", newCategory);
        }
      },
      { immediate: true }
    );
    const submitEditCategory = async () => {
      console.log("submitEditCategory triggered");
      if (!categoryName.value.trim()) {
        alert("分類名稱不能為空");
        return;
      }
      try {
        await emit("submit", {
          id: props.category.id,
          name: categoryName.value.trim(),
        });
      } catch (error) {
        console.error("修改分類時出錯:", error);
      }
    };

    return {
      categoryName,
      submitEditCategory,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease-in-out;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.save-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #0056b3;
}

.cancel-button {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #5a6268;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>