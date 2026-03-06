// 轮播图核心逻辑
document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const slideCount = slides.length;
    let currentIndex = 0;

    // ====== 新增：图片放大预览相关元素 ======
    const imageViewer = document.getElementById('imageViewer');
    const viewerImage = document.getElementById('viewerImage');
    const viewerCaption = document.getElementById('viewerCaption');
    const viewerClose = document.getElementById('viewerClose');

    // 更新轮播图位置和指示器状态
    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // 下一张
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
    }

    // 上一张
    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
    }

    // 点击指示器切换
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            clearInterval(autoPlayInterval);
            autoPlayInterval = setInterval(nextSlide, 3000);
        });
    });

    // 绑定按钮事件
    prevBtn.addEventListener('click', () => {
        prevSlide();
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 3000);
    });
    nextBtn.addEventListener('click', () => {
        nextSlide();
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(nextSlide, 3000);
    });

    // 自动轮播（3秒切换一次）
    let autoPlayInterval = setInterval(nextSlide, 3000);

    // 鼠标悬停暂停轮播，离开继续
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 3000);
    });

    // ====== 新增：图片放大功能 ======
    // 1. 点击轮播图图片放大
    slides.forEach(slide => {
        const img = slide.querySelector('img');
        const caption = slide.querySelector('.carousel-caption').textContent;
        
        img.addEventListener('click', () => {
            // 设置放大图片的地址和标题
            viewerImage.src = img.src;
            viewerImage.alt = img.alt;
            viewerCaption.textContent = caption;
            
            // 显示放大层
            imageViewer.classList.add('active');
            
            // 暂停页面滚动
            document.body.style.overflow = 'hidden';
            
            // 暂停轮播
            clearInterval(autoPlayInterval);
        });
    });

    // 2. 关闭放大预览
    function closeViewer() {
        imageViewer.classList.remove('active');
        // 恢复页面滚动
        document.body.style.overflow = '';
        // 恢复轮播
        autoPlayInterval = setInterval(nextSlide, 3000);
    }

    // 点击关闭按钮关闭
    viewerClose.addEventListener('click', closeViewer);

    // 点击遮罩层关闭
    imageViewer.addEventListener('click', (e) => {
        if (e.target === imageViewer) {
            closeViewer();
        }
    });

    // 按ESC键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageViewer.classList.contains('active')) {
            closeViewer();
        }
    });
});