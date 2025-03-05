// Проверка авторизации при загрузке любой страницы
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (token && (currentPage === 'login.html' || currentPage === 'register.html')) {
        window.location.href = 'index.html';
    }
    
    if (!token && currentPage === 'index.html') {
        window.location.href = 'login.html';
    }
});

// Общая функция для запросов
async function sendRequest(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        return { ok: response.ok, data: result };
    } catch (error) {
        return { ok: false, data: { detail: 'Ошибка сети' } };
    }
}

// Функция выхода
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}