const db = firebase.firestore();
  console.log(db);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    window.location.href = "../home/index.html";
  }
})

function handleFormSubmit(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then(response =>{
        window.location.href = "home/index.html";
    }).catch(error => {
        alert("Usuário não encontrado!");
    });

 }
