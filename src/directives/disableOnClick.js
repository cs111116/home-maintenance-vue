export default {
  beforeMount(el, binding) {
    el.addEventListener("click", async () => {

      const originalText = el.textContent;

      // 改變按鈕文字為 "已禁用"
      el.textContent = "已禁用";
      el.disabled = true; // 禁用按鈕
      console.log("按鈕已禁用");
      alert("按鈕已禁用")
      try {
        await binding.value(); // 等待傳遞的方法執行完成
        console.log("方法執行成功");
      } catch (error) {
        console.error("Error in executing function:", error);
      } finally {
        console.log("啟用按鈕");
        el.disabled = false; // 操作完成後啟用按鈕
        // 恢復原本按鈕文字
        el.textContent = originalText;
      }
    });
  },
};
