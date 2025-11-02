// Lógica das telas de Contas a Receber
async function loadContas(){
  ensureAuth();
  document.querySelector('#userchip').textContent = getUserName();
  try{
    const data = await Endpoints.conta.getAll();
    const rows = (data.registro||[]).map(r => `
      <tr>
        <td class="actions">
          <a class="btn ghost" href="conta_form.html?oper=v&id=${r.contaid}">Ver</a>
        </td>
        <td>${r.clientenome||'-'}</td>
        <td>${r.animalnome||'-'}</td>
        <td>${r.documento||''}</td>
        <td>${r.vencimento||''}</td>
        <td class="num">${numberToMoney(r.valor)}</td>
      </tr>
    `).join('');
    document.querySelector('#tbodyContas').innerHTML = rows || '<tr><td colspan="6">Nenhum registro.</td></tr>';
  }catch(e){ toast('Falha ao carregar contas.'); }
}

async function initContaForm(){
  ensureAuth();
  document.querySelector('#userchip').textContent = getUserName();
  const params = new URLSearchParams(location.search);
  const oper = params.get('oper')||'c';
  const id = Number(params.get('id')||0);

  const btnSalvar = document.querySelector('#btnSalvar');
  const btnAlterar = document.querySelector('#btnAlterar');
  const btnSalvarAlt = document.querySelector('#btnSalvarAlt');
  const btnRemover = document.querySelector('#btnRemover');

  // combos
  try{
    const [clientes, animais] = await Promise.all([Endpoints.cliente.getAll(), Endpoints.animal.getAll()]);
    const optCli = (clientes.registro||[]).map(c=>`<option value="${c.clienteid}">${c.nome}</option>`).join('');
    const optAni = (animais.registro||[]).map(a=>`<option value="${a.animalid}">${a.nome}</option>`).join('');
    document.querySelector('#clienteid').innerHTML = optCli;
    document.querySelector('#animalid').innerHTML = `<option value="">—</option>`+optAni;
  }catch{}

  if(oper==='c'){
    document.querySelector('#title').textContent = 'Nova Conta a Receber';
    toggleReadOnly(false);
    btnSalvar.style.display='inline-block';
  } else {
    // carregar registro
    try{
      const resp = await Endpoints.conta.getById(id);
      const r = (resp.registro&&resp.registro[0])||{};
      fillForm(r);
      if(oper==='v'){
        document.querySelector('#title').textContent = 'Conta a Receber';
        toggleReadOnly(true);
        btnAlterar.style.display='inline-block';
        btnRemover.style.display='inline-block';
      } else {
        document.querySelector('#title').textContent = 'Alterar Conta a Receber';
        toggleReadOnly(false);
        btnSalvarAlt.style.display='inline-block';
      }
    }catch(e){ toast('Falha ao carregar conta.'); }
  }

  // ações
  btnSalvar?.addEventListener('click', async (ev)=>{
    ev.preventDefault();
    const payload = readForm();
    try{ await Endpoints.conta.insert(payload); toast('Conta salva!'); location.href='contas.html'; }
    catch{ toast('Erro ao salvar.'); }
  });

  btnSalvarAlt?.addEventListener('click', async (ev)=>{
    ev.preventDefault();
    const payload = readForm(); payload.contaId = Number(document.querySelector('#contaId').value);
    try{ await Endpoints.conta.update(payload); toast('Conta atualizada!'); location.href='contas.html'; }
    catch{ toast('Erro ao atualizar.'); }
  });

  btnAlterar?.addEventListener('click', ()=>{
    const id = Number(document.querySelector('#contaId').value);
    location.href = `conta_form.html?oper=vu&id=${id}`;
  });

  btnRemover?.addEventListener('click', async ()=>{
    if(!confirm('Confirma remover?')) return;
    try{
      const id = Number(document.querySelector('#contaId').value);
      await Endpoints.conta.delete(id);
      toast('Removida.'); location.href='contas.html';
    }catch{ toast('Erro ao remover.'); }
  });
}

function toggleReadOnly(ro){
  ['clienteid','animalid','documento','emissao','vencimento','valor','observacao']
    .forEach(id=>{ const el=document.getElementById(id); if(!el) return; el.disabled=ro; el.readOnly=ro; });
}

function fillForm(r){
  document.querySelector('#contaId').value = r.contaid||0;
  document.querySelector('#clienteid').value = r.clienteid||'';
  document.querySelector('#animalid').value = r.animalid||'';
  document.querySelector('#documento').value = r.documento||'';
  document.querySelector('#emissao').value = dateISO(r.emissao||r.emissaoStr||r.emissaoData||r.emissao);
  document.querySelector('#vencimento').value = dateISO(r.vencimento||r.vencimentoStr||r.vencimentoData||r.vencimento);
  document.querySelector('#valor').value = numberToMoney(r.valor||0);
  document.querySelector('#observacao').value = r.observacao||'';
}

function readForm(){
  return {
    contaId: 0,
    clienteid: Number(document.querySelector('#clienteid').value),
    animalid: Number(document.querySelector('#animalid').value) || null,
    documento: document.querySelector('#documento').value.trim(),
    emissao: document.querySelector('#emissao').value || null,
    vencimento: document.querySelector('#vencimento').value || null,
    valor: moneyToNumber(document.querySelector('#valor').value),
    observacao: document.querySelector('#observacao').value.trim(),
    deleted: false
  };
}
