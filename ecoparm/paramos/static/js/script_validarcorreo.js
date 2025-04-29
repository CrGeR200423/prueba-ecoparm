function validarcorreo() {
    var correo = document.getElementById('correo').value;
    console.log(correo)
    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (!regex.test(correo)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return false;
    }
    alert("Correo valido.")
    return true;
  }