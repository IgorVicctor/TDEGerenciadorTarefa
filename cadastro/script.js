firebase.auth().onAuthStateChanged(user => {
  if (user) {
    window.location.href = "../home/index.html";
  }
})

function cadastrar(event) {
    event.preventDefault();
    
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(
      email, password
    ).then(() => {
      alert("O usuário foi cadastro com sucesso!");
      window.location.href = "../home/index.html";
    }).catch(error => {
      alert(getErrorMessage(error))
    })

    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
  }

  function getErrorMessage(error){
    if(error.code == 'auth/email-already-in-use'){
      return "Email ja está em uso."
    }
    return error.message;
  }
  
  document.getElementById('cadastroForm').addEventListener('submit', cadastrar);

