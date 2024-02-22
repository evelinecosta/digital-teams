let teams = [];

criarBtn.onclick = () => {
    overlay.classList.add('show');
    formCriar.classList.add('show');
}

fecharBtn.onclick = () => {
    overlay.classList.remove('show');
    formCriar.classList.remove('show');
}

fecharParticipanteBtn.onclick = () => {
    overlay.classList.remove('show');
    formParticipante.classList.remove('show');
}

overlay.onclick = () => {
    overlay.classList.remove('show');
    formCriar.classList.remove('show');
    formParticipante.classList.remove('show');
}

formCriar.onsubmit = () => {
    event.preventDefault();
    if(verificarLista(nome.value)){
        alert("Este nome já está em uso")
    }else{
        teams.push({
            name: nome.value,
            capacity: capacidade.value,
            members: []
    });
    adicionarCards();
    overlay.classList.remove('show');
    formCriar.classList.remove('show');
}
}

formParticipante.onsubimit = () => {
    event.preventDefault ();
    teams[Number(teamID.value)].members.push(nomeParticipante.value);
    alert("Participante inserido com sucesso");
    formParticipante.reset()
}

function adicionarCards(){
    listTeams.innerHTML = '';
    if(teams.length === 0){
        listTeams.innerHTML = '<li class="noTeams"><h4>Nenhum team criado ainda</h4></li>';
        return
    }
    for(let i = 0; i < teams.length; i++){
        listTeams.innerHTML += `
            <li>
                <h4>${teams[i].name} <box-icon name='show'></box-icon></h4>
                <h1>0 <span>/ ${teams[i].capacity}</span></h1>
                <div class="actions">
                    <button onClick="mostrarformParticipante(${i})">adicionar</button>
                    <button onClick="removerCard(${i})"><box-icon name='trash'></box-icon></button>
                </div>
            </li>
        `;
    }
}

function removerCard(indice){
    let listaAuxiliar = [];
    for(let i = 0; i < teams.length; i++){
        if(i != indice){
            listaAuxiliar.push(teams[i]);
        }
    }
    teams = listaAuxiliar;
    adicionarCards();
}

function verificarLista(nomeDoTeam){
    let achou = false;
    for(let i = 0; i < teams.length; i++){
        if(teams[i].name === nomeDoTeam){
            achou = true;
        }
    }
    return achou;
}

function mostrarformParticipante(indice){
    overlay.classList.add("show");
    formParticipante.classList.add("show");
    teamID.value = indice;
}