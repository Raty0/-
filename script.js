const book = document.getElementById('book');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 获取所有需要翻转的页面元素
// 提示：HTML 中 id="p1", id="p2", ...
const papers = document.querySelectorAll('.paper'); 
const totalPages = papers.length;
let currentPage = 1; // 当前显示的书页编号 (从 1 开始)

/**
 * 翻转页面的函数
 * @param {number} pageNum - 要翻转的页面索引 (从 0 开始)
 * @param {boolean} isFlipped - 是否设置为已翻转
 */
function turnPage(pageNum, isFlipped) {
    // 确保索引有效
    if (pageNum >= 0 && pageNum < totalPages) {
        if (isFlipped) {
            papers[pageNum].classList.add('flipped');
        } else {
            papers[pageNum].classList.remove('flipped');
        }
    }
}

// --- 按钮点击事件处理 ---

nextBtn.addEventListener('click', () => {
    // 翻页逻辑：从前往后翻，currentPage 指向未翻转的页
    // 如果当前页小于总页数，就可以翻下一页
    if (currentPage < totalPages) {
        // 翻转当前页（从 1 开始，所以索引是 currentPage - 1）
        turnPage(currentPage - 1, true); 
        currentPage++; // 页码前进
    }
    updateNavButtons();
});

prevBtn.addEventListener('click', () => {
    // 翻页逻辑：从后往前翻，currentPage 指向当前显示的下一页
    // 如果当前页大于 1，就可以翻回上一页
    if (currentPage > 1) {
        currentPage--; // 页码后退
        // 取消翻转前一页（索引是 currentPage - 1）
        turnPage(currentPage - 1, false); 
    }
    updateNavButtons();
});

// --- 导航按钮状态更新 ---

function updateNavButtons() {
    // 封面时，禁用上一页
    prevBtn.disabled = currentPage === 1;
    // 封底时，禁用下一页
    nextBtn.disabled = currentPage === totalPages;
}

// 初始化按钮状态
updateNavButtons();

// --- 📱 移动端滑动事件（可选增强） ---

let startX = 0;

book.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

book.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const threshold = 50; // 滑动阈值

    if (diffX > threshold) {
        // 向左滑动：翻到下一页
        nextBtn.click();
    } else if (diffX < -threshold) {
        // 向右滑动：翻到上一页
        prevBtn.click();
    }
});
