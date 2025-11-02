// Utilidades de UI (toasts, máscaras simples)
function toast(msg){
  const t = document.querySelector('.toast');
  if(!t) return alert(msg);
  t.textContent = msg; t.style.display='block';
  setTimeout(()=> t.style.display='none', 2400);
}

function moneyToNumber(str){
  if(typeof str === 'number') return str;
  if(!str) return 0;
  // aceita "1.234,56" ou "1234.56"
  const s = String(str).trim().replace(/\./g,'').replace(',','.');
  const n = Number(s);
  return isNaN(n) ? 0 : n;
}

function numberToMoney(n){
  return (Number(n)||0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function dateISO(d){
  if(!d) return '';
  const dt = new Date(d);
  return dt.toISOString().slice(0,10);
}
