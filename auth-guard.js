firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "../login/index.html";
    }
  })