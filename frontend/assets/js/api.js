// Camada de acesso à API do Back-End
const BASE_URL = localStorage.getItem('BASE_URL') || 'http://localhost:40000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

async function apiPost(path, body, auth=true){
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(auth?getAuthHeaders():{}) },
    body: JSON.stringify(body||{})
  });
  if(!res.ok) throw new Error('Falha na requisição.');
  return res.json();
}

async function apiGet(path, auth=true){
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { ...(auth?getAuthHeaders():{}) }
  });
  if(!res.ok) throw new Error('Falha na requisição.');
  return res.json();
}

// Endpoints esperados (ajuste se o seu Back usar nomes diferentes)
const Endpoints = {
  auth: {
    login: (cred) => apiPost('/Login', cred, false)
  },
  cliente: {
    getAll: () => apiGet('/cliente/getAll', false),
  },
  animal: {
    getAll: () => apiGet('/animal/getAll', false),
  },
  conta: {
    getAll: () => apiGet('/contaReceber/getAll', false),
    getAllAbertas: () => apiGet('/contaReceber/getAllAbertas', false),
    getById: (contaId) => apiPost('/contaReceber/getByID', { contaId }),
    insert: (data) => apiPost('/contaReceber/insert', data),
    update: (data) => apiPost('/contaReceber/update', data),
    delete: (contaId) => apiPost('/contaReceber/delete', { contaId }),
  },
  recebimento: {
    getAll: () => apiGet('/recebimento/getAll', false),
    insert: (data) => apiPost('/recebimento/insert', data),
  },
  funcionario: {
    getAll: () => apiGet('/funcionario/getAll', false),
  }
};
