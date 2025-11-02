// Helpers de autenticação e guarda de rota
function ensureAuth() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
}
function logout(){ localStorage.removeItem('token'); window.location.href = 'login.html'; }
function setUserName(name){ localStorage.setItem('userName', name||'Usuário'); }
function getUserName(){ return localStorage.getItem('userName') || 'Usuário'; }
