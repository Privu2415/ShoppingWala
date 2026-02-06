// 4. EVENT LISTENERS
el('cartIcon').onclick = () => toggleUI('cartSidebar', true);
el('userIcon').onclick = () => toggleUI('authSidebar', true);
el('categoryBtn').onclick = () => toggleUI('categorySidebar', true);
el('overlay').onclick = () => {
    ['cartSidebar', 'authSidebar', 'categorySidebar'].forEach(s => toggleUI(s, false));
};