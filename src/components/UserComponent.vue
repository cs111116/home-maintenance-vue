// 前端：Vue.js - 記帳功能實作
<template>
  <div class="account-container">
    <h1 class="text-center">記帳系統</h1>
    <form @submit.prevent="addEntry">
      <label for="category">消費類別：</label>
      <select v-model="newEntry.category" id="category" required>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <label for="item">品項：</label>
      <input type="text" v-model="newEntry.item" id="item" required placeholder="消費品項" />

      <label for="amount">金額：</label>
      <input type="number" v-model="newEntry.amount" id="amount" required placeholder="金額" />

      <label for="paymentMethod">支付方式：</label>
      <select v-model="newEntry.paymentMethod" id="paymentMethod" required>
        <option v-for="method in paymentMethods" :key="method" :value="method">
          {{ method }}
        </option>
      </select>

      <button type="submit">新增記帳</button>
    </form>

    <div class="entries-list">
      <h2>記帳歷史</h2>
      <ul>
        <li v-for="entry in entries" :key="entry.id">
          <span>{{ entry.category }} - {{ entry.item }} - {{ entry.amount }}元 - {{ entry.paymentMethod }}</span>
          <button @click="editEntry(entry)">編輯</button>
          <button @click="deleteEntry(entry.id)">刪除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "UserComponent",
  setup() {
    const categories = [
      "飲食", "計畫與健康", "居住", "交通", "投資自己", "娛樂", "旅行", "人情", "家人", "代辦", "佈施", "寵物", "貸款", "台股", "虛擬貨幣", "儲蓄", "額外收入", "信貸保險金", "手機月費", "車保", "機車保", "車子維修", "機車維修", "獎章中獎", "薪水", "補習"
    ];
    const paymentMethods = [
      "現金", "電子支付(統一超Richart付費)", "國泰CUBE信用卡", "聯邦金圓信用卡", "玉山UBEAR", "富邦COSTCO聯名卡"
    ];

    const entries = ref([]);
    const newEntry = reactive({
      id: "",
      category: "",
      item: "",
      amount: null,
      paymentMethod: ""
    });

    const addEntry = () => {
      newEntry.id = uuidv4();
      entries.value.push({ ...newEntry });
      clearEntry();
    };

    const editEntry = (entry) => {
      Object.assign(newEntry, entry);
      deleteEntry(entry.id);
    };

    const deleteEntry = (id) => {
      entries.value = entries.value.filter(entry => entry.id !== id);
    };

    const clearEntry = () => {
      newEntry.id = "";
      newEntry.category = "";
      newEntry.item = "";
      newEntry.amount = null;
      newEntry.paymentMethod = "";
    };

    return {
      categories,
      paymentMethods,
      entries,
      newEntry,
      addEntry,
      editEntry,
      deleteEntry
    };
  }
};
</script>

<style scoped>
.account-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.text-center {
  text-align: center;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.entries-list ul {
  list-style-type: none;
  padding: 0;
}
.entries-list li {
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>