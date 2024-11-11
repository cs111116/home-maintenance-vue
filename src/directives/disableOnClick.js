//1. 目前遇到防止重複點題提交會遇到 顏色沒變成灰色的炫染問題 header Risgister可以 但是Loginview 沒辦法 在猜應該是遇到store 渲染的先後順序問題
export default {
  beforeMount(el, binding) {
    el.addEventListener("click", async () => {
      el.disabled = true; // 禁用按鈕
      try {
        await binding.value(); // 等待傳遞的方法執行完成
      } catch (error) {
        console.error("Error in executing function:", error);
      } finally {
        console.log("啟用按鈕");
        el.disabled = false; // 操作完成後啟用按鈕
      }
    });
  },
};
