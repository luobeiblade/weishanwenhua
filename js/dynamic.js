// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 1. 瓷器图片折叠/展开交互（原有逻辑保留）
    const toggleBtn = document.getElementById('porcelainToggleBtn');
    const hideItems = document.querySelectorAll('.hide-item');
    const grid = document.getElementById('porcelainGrid');
    let isExpanded = false;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            if (isExpanded) {
                hideItems.forEach(item => item.style.display = 'block');
                toggleBtn.innerHTML = '收起 <span>▼</span>';
                toggleBtn.classList.add('collapsed');
            } else {
                hideItems.forEach(item => item.style.display = 'none');
                toggleBtn.innerHTML = '展开查看全部 <span>▼</span>';
                toggleBtn.classList.remove('collapsed');
            }
        });
    }

    // 2. 新增：图片放大预览交互
    const modal = document.getElementById('imgPreviewModal');
    const previewImg = modal.querySelector('.preview-img');
    const closeBtn = modal.querySelector('.close-btn');
    const porcelainImgs = document.querySelectorAll('.porcelain-img');

    // 点击图片打开弹窗
    porcelainImgs.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止事件冒泡
            // 获取原图地址（如果有原图URL，可替换为 this.dataset.original || this.src）
            const imgSrc = this.src;
            previewImg.src = imgSrc;
            previewImg.alt = this.alt;
            modal.classList.add('active');
            // 禁止页面滚动
            document.body.style.overflow = 'hidden';
        });
    });

    // 点击关闭按钮关闭弹窗
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // 恢复页面滚动
    });

    // 点击弹窗空白处关闭弹窗
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // 按ESC键关闭弹窗
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});