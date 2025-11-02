// Lógica das telas de Recebimentos
async function loadRecebimentos(){
  ensureAuth();
  document.querySelector('#userchip').textContent = getUserName();
  try{
    const data = await Endpoints.recebimento.getAll();
    const rows = (data.registro||[]).map(r => `
      <tr>
        <td>${r.contaid}</td>
        <td>${r.data||''}</td>
        <td><span class="badge ${badgeClass(r.forma)}">${formaLabel(r.forma)}</span></td>
        <td class="num">${numberToMoney(r.valorecebido)}</td>
        <td class="num">${numberToMoney(r.desconto)}</td>
        <td class="num">${numberToMoney(r.juros)}</td>
        <td>${r.funcionarionome||'-'}</td>
      </tr>
    `).join('');
    document.querySelector('#tbodyRec').innerHTML = rows || '<tr><td colspan="7">Nenhum registro.</td></tr>';
  }catch(e){ toast('Falha ao carregar recebimentos.'); }
}

async function initRecebimentoForm(){
  ensureAuth();
  document.querySelector('#userchip').textContent = getUserName();
  // combos
  try{
    const [contas, funcs] = await Promise.all([Endpoints.conta.getAllAbertas(), Endpoints.funcionario.getAll()]);
    document.querySelector('#contaId').innerHTML = (contas.registro||[]).map(c=>
      `<option value="${c.contaid}">[Doc: ${c.documento}] ${c.clientenome} — R$ ${numberToMoney(c.valor)}</option>`
    ).join('');
    document.querySelector('#funcionarioid').innerHTML = (funcs.registro||[]).map(f=>
      `<option value="${f.funcionarioid}">${f.nome}</option>`
    ).join('');
    document.querySelector('#data').value = new Date().toISOString().slice(0,10);
  }catch{}

  document.querySelector('#btnSalvar').addEventListener('click', async (ev)=>{
    ev.preventDefault();
    const payload = {
      recebimentoId: 0,
      contaId: Number(document.querySelector('#contaId').value),
      data: document.querySelector('#data').value || null,
      forma: document.querySelector('#forma').value,
      valorRecebido: moneyToNumber(document.querySelector('#valorRecebido').value),
      desconto: moneyToNumber(document.querySelector('#desconto').value),
      juros: moneyToNumber(document.querySelector('#juros').value),
      observacao: document.querySelector('#observacao').value.trim(),
      funcionarioid: Number(document.querySelector('#funcionarioid').value) || null
    };
    try{ await Endpoints.recebimento.insert(payload); toast('Recebimento lançado!'); location.href='recebimentos.html'; }
    catch{ toast('Erro ao lançar.'); }
  });
}

function formaLabel(f){ return f==='PIX' ? 'PIX' : (f==='CARTAO'?'Cartão':'Dinheiro'); }
function badgeClass(f){ return f==='PIX' ? 'pix' : (f==='CARTAO'?'card':'cash'); }
