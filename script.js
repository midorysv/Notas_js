let editando = false;
let indiceEditar = null;

window.onload = mostrarNotas;

function guardarNota() {
  const texto = document.getElementById('notaTexto').value.trim();
  if (texto === '') {
    alert("No puedes guardar una nota vacía.");
    return;
  }

  let notas = JSON.parse(localStorage.getItem('notas')) || [];

  if (editando) {
    notas[indiceEditar].texto = texto;
    notas[indiceEditar].fecha = new Date().toLocaleString();
    editando = false;
    indiceEditar = null;
    document.getElementById('btnGuardar').innerText = 'Guardar Nota';
  } else {
    notas.push({
      texto: texto,
      fecha: new Date().toLocaleString()
    });
  }

  localStorage.setItem('notas', JSON.stringify(notas));
  document.getElementById('notaTexto').value = '';
  mostrarNotas();
}

function mostrarNotas() {
  const tabla = document.getElementById('tablaNotas');
  tabla.innerHTML = '';
  let notas = JSON.parse(localStorage.getItem('notas')) || [];

  notas.forEach((nota, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${nota.texto}</td>
        <td>${nota.fecha}</td>
        <td>
          <button class="btn btn-rosa-sm me-1" onclick="editarNota(${index})">Editar</button>
          <button class="btn btn-rosa-sm" onclick="eliminarNota(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function eliminarNota(index) {
  let notas = JSON.parse(localStorage.getItem('notas')) || [];
  notas.splice(index, 1);
  localStorage.setItem('notas', JSON.stringify(notas));
  mostrarNotas();
}

function eliminarTodas() {
  if (confirm("¿Estás segurx de que deseas eliminar TODAS las notas?")) {
    localStorage.removeItem('notas');
    mostrarNotas();
  }
}

function editarNota(index) {
  let notas = JSON.parse(localStorage.getItem('notas')) || [];
  document.getElementById('notaTexto').value = notas[index].texto;
  editando = true;
  indiceEditar = index;
  document.getElementById('btnGuardar').innerText = 'Actualizar Nota';
  
}
