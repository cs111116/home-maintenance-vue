export default {
  beforeMount(el, binding) {
    // 添加 click 事件監聽器
    el.addEventListener("click", async (event) => {
      // 禁用按鈕
      el.disabled = true;

      try {
        // 等待綁定的函數執行完成
        if (binding.value && typeof binding.value === "function") {
          await binding.value(event);
        } else {
          console.warn("v-disable-on-click requires a function as its value.");
        }
      } catch (error) {
        // 處理函數執行中的錯誤
        console.error("Error during v-disable-on-click function execution:", error);
      } finally {
        // 總是啟用按鈕
        el.disabled = false;
      }
    });
  },
};
