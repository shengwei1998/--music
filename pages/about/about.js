Page({
  fn1(e) {
    console.log(e.target); // 真正点在那个元素上
    console.log(e.currentTarget); // 处理事件的元素
  }
})