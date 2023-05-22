firebase.auth().onAuthStateChanged(user => {
  console.log('user', user.uid)
  if (!user) {
    window.location.href = "../home/index.html";
  }
})

function sair(){
  firebase.auth().signOut().then(() => {
    const shouldRemove = confirm("Você deseja sair?")
    if (shouldRemove) {
      window.location.href="../index.html";
    }
  }).catch(() => {
    alert('Erro ao sair.');
  })
}

firebase.auth().onAuthStateChanged(user => {
    if (user){
        encontrarTarefas(user);
    }
})

function encontrarTarefas(user){
  firebase.firestore()
    .collection('tarefas')
    .where('user.uid', '==' ,user.uid)
    .get()
    .then(snapshot => {
      const tarefas = snapshot.docs.map(doc =>({
        ...doc.data(),
        uid: doc.id
      }) );
      console.log('tarefas: ', tarefas);
      addTarefasToScreen(tarefas)
    })
    .catch(error => {
      console.log(error);
      alert('Erro ao recuperar tarefa');
    })
}

function addTarefasToScreen(tarefas){

  tarefas.forEach(tarefa => {
    const taskItem = document.createElement('li');
    console.log('tarefa', tarefas);
    taskItem.classList.add('list-group-item');
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = "Remover";
    deleteButton.classList.add('btn', 'btn-danger', 'btn-sma');
    deleteButton.addEventListener('click', () => {
      askRemoveTask(tarefa);
    })

    const partesData = tarefa.date.split("-");
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];

    const dataFormatada = `${dia}/${mes}/${ano}`
  
    
    taskItem.innerHTML = `
      <div class="tarefaEdit">
        <small class="editarTexto">Descrição: ${tarefa.descricao}</small><br>
        <small class="editarTexto">Prazo: ${dataFormatada}</small><br>
        <small class="editarTexto">Responsável: ${tarefa.responsavel}</small><br>
        <small class="editarTexto">Status: ${tarefa.status}</small>
      <div>
      `;

    document.getElementById('taskList').appendChild(taskItem).appendChild(deleteButton);
    buttonValido();


  })
}

function askRemoveTask(tarefa){
  const shouldRemove = confirm("Deseja remove a tarefa?")
  if (shouldRemove) {
    deleteTask(tarefa);
  }
}

function addTask() {
     
    const tarefa = criarTarefa();

    firebase.firestore()
      .collection('tarefas')
      .add(tarefa)
      .then(() => {
        window.location.href="../home/index.html"
      })
      .catch(() => {
        alert('Erro ao salvar a tarefa.')
      })

      buttonValido();
}

function buttonValido(){
    form1.saveButton().disabled = !isFormValid();
}

function isFormValid(){
  return true;
}

const form1 ={
  saveButton: () => document.getElementById('create-button')
}

function criarTarefa(){

    const descricao = document.getElementById('description').value;
    const data = document.getElementById('deadline').value;
    const responsavel = document.getElementById('assignee').value;
    const status = document.getElementById('status').value;

    return {
      descricao: descricao,
      date: data,
      responsavel: responsavel,
      status: status,
      user: {
        uid: firebase.auth().currentUser.uid
      }
    }
}

function deleteTask(tarefa) {

  firebase.firestore()
    .collection('tarefas')
    .doc(tarefa.uid)
    .delete()
    .then(() => {
      atualizaPagina();
      document.getElementById(tarefa.uid).remove();
    })
    .catch(error => {
      console.log("erro", error)
    })
}

function atualizaPagina(){
 location.reload();
}
