// 用于占位按钮提示（仅示意）
document.querySelector('.btn-primary')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('【示意】咨询预约入口。实际可跳转至表单或微信。');
});

// 卡片点击演示
document.querySelectorAll('.guide-card').forEach(card => {
    card.addEventListener('click', () => {
        alert('快速导览：此处可滚动到对应板块。实际网站可加入锚点。');
    });
});