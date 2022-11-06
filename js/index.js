var contatoUsuarios = [];

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("formContato").addEventListener("submit", function(e) {
        e.preventDefault();
        salvarUsuarioContato();
    });

    buscarUsuarios();
}); 


async function buscarUsuarios(){
    await fetch('https://63078a7e3a2114bac7655c20.mockapi.io/contatos')
    .then((response) => response.json())
    .then((data) => {
        usuarios = data;
        atualizarTabela(data)
    })
}

function atualizarTabela(array){
    let tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    array.forEach(element => {
        let tr  = document.createElement("tr");
        let tdNome = document.createElement("td");
        let tdEmail =  document.createElement("td");
        let tdTelefone = document.createElement("td");

        tdNome.innerHTML = element.nome;
        tdEmail.innerHTML = element.email;
        tdTelefone.innerHTML = element.telefone;

        tr.appendChild(tdNome);
        tr.appendChild(tdEmail);
        tr.appendChild(tdTelefone);

        tbody.appendChild(tr);
    });
}

function filtrar(){
    let filtro = document.getElementById("filtro").value;
    let usuFiltrado = usuarios.filter( u => 
        u.nome.startsWith(filtro) || 
        u.email.startsWith(filtro) ||
        u.telefone.startsWith(filtro));

    atualizarTabela(usuFiltrado);
}

function salvarUsuarioContato(){
  let fieldNome = document.getElementById("nome");
  let fieldEmail = document.getElementById("email");
  let fieldTelefone = document.getElementById("telefone");
  
  contatoUsuarios.push({
    nome: fieldNome.value,
    email: fieldEmail.value,
    telefone: fieldTelefone.value
  });

  fieldNome.value = "";
  fieldEmail.value = "";
  fieldTelefone.value = "";

  console.log(contatoUsuarios);
}

function sincronizarTabela(){    
    contatoUsuarios.forEach((cont) => {
        fetch('https://63078a7e3a2114bac7655c20.mockapi.io/contatos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cont),
        })
            .then((response) => response.json())
            .then((data) => {
                toast();
                buscarUsuarios();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }) 
        
    }

function toast(){
    const toastLive = document.getElementById('liveToast')
    const toast = new bootstrap.Toast(toastLive)

    toast.show();
}