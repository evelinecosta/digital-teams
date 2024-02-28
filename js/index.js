let teams = JSON.parse(localStorage.getItem("lista")) || [];

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
    localStorage.setItem("lista", JSON.stringify(teams))
    adicionarCards();
    overlay.classList.remove('show');
    formCriar.classList.remove('show');
    }
}

formParticipante.onsubimit = () => {
    event.preventDefault();
    if(teams[Number(teamID.value)].members.length == teams[Number(teamID.value)].capacity){
        alert('Capacidade máxima atingida')
    }else{
        teams[Number(teamID.value)].members.push(nomeParticipante.value);
        localStorage.setItem("lista", JSON.stringify(teams));
        alert("Participante inserido com sucesso!");
        formParticipante.reset();
        adicionarCards();
    }
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

adicionarCards();

function removerCard(indice){
    let listaAuxiliar = [];
    for(let i = 0; i < teams.length; i++){
        if(i != indice){
            listaAuxiliar.push(teams[i]);
        }
    }
    teams = listaAuxiliar;
    localStorage.setItem("lista", JSON.stringify(teams));
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

function mostrarParticipantes(indice){
    alert(teams[indice].members)
}