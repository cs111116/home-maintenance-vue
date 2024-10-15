<template>
  <v-card>
    <v-toolbar color="primary">
      <v-tabs v-model="activeTab">
        <v-tab value="addEntry">記帳</v-tab>
        <v-tab value="entriesList">記帳紀錄</v-tab>
      </v-tabs>
    </v-toolbar>
    <div v-if="activeTab === 'addEntry'" class="account-container">
      <h1 class="text-center">記帳系統</h1>
      <form @submit.prevent="addEntry">
        <label for="category">消費類別：</label>
        <select v-model="newEntry.category" id="category" required>
          <optgroup v-for="group in categories" :key="group.group" :label="group.group">
            <option v-for="item in group.items" :key="item" :value="item">
              {{ item }}
            </option>
          </optgroup>
        </select>

        <label for="item">品項：</label>
        <input type="text" v-model="newEntry.item" id="item" required placeholder="消費品項" />

        <label for="amount">金額：</label>
        <input type="number" v-model="newEntry.amount" id="amount" required placeholder="金額" />

        <label for="remark">備註：</label>
        <input type="text" v-model="newEntry.remark" id="remark" placeholder="備註" />

        <label for="paymentMethod">支付方式：</label>
        <select v-model="newEntry.paymentMethod" id="paymentMethod" required>
          <option v-for="method in paymentMethods" :key="method" :value="method">
            {{ method }}
          </option>
        </select>

        <button type="submit">新增記帳</button>
      </form>
    </div>
    <div v-else-if="activeTab === 'entriesList'" class="account-container entries-list">
      <h2>記帳歷史</h2>
      <ul>
        <li v-for="entry in entries" :key="entry.id">
          <span>{{ entry.category }} - {{ entry.item }} - {{ entry.amount }}元 - {{ entry.paymentMethod }}</span>
          <button @click="editEntry(entry)">編輯</button>
          <button @click="deleteEntry(entry.id)">刪除</button>
        </li>
      </ul>
    </div>
  </v-card>
</template>

<script>
import { ref, reactive } from "vue";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "UserComponent",
  setup() {
    const categories = [
      { group: "生活", items: ["飲食", "帥氣與健康", "居住", "交通", "手機月費", "情侶基金", "貸款"] },
      { group: "教育", items: ["投資自己"] },
      { group: "休息", items: ["寵物", "娛樂", "旅行"] },
      { group: "交通工具", items: ["車稅", "維修"] },
      { group: "保險", items: ["機車", "汽車", "個人", "家庭"] },
      { group: "儲蓄", items: ["儲蓄"] },
      { group: "投資", items: ["台股", "美股"] },
      { group: "付出", items: ["家人", "人情", "代墊", "佈施"] },
      { group: "薪資", items: ["薪水"] },
      { group: "不勞而獲", items: ["額外收入", "發票中獎", "家人"] },
      { group: "其他", items: ["補額"] }
    ];
    const paymentMethods = [
      "現金", "電子支付(統一從Richat付款)", "國泰CUBE信用卡", "聯邦全國信用卡", "玉山UBEAR", "富邦COSTCO聯名卡"
    ];

    const entries = ref([]);
    const newEntry = reactive({
      id: "",
      category: "",
      item: "",
      amount: null,
      remark: "",
      paymentMethod: ""
    });
    const activeTab = ref("addEntry");

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
      newEntry.remark = "";
      newEntry.paymentMethod = "";
    };

    return {
      categories,
      paymentMethods,
      entries,
      newEntry,
      addEntry,
      editEntry,
      deleteEntry,
      activeTab
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
.tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.tabs button {
  padding: 10px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.tabs button.active {
  background-color: #0056b3;
}
.tabs button:hover {
  background-color: #0056b3;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-appearance: menulist;
  appearance: menulist;
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