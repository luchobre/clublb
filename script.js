 // Arreglo para guardar a los socios
let members = [];

// Funcion para cargar los socios del local storage
function loadMembers() {
    const storedMembers = localStorage.getItem("members");
    if (storedMembers) {
      members = JSON.parse(storedMembers);
    }
  }

  // Funcion para guardar los socios en el local storage
function saveMembers() {
    localStorage.setItem("members", JSON.stringify(members));
  }

// Evento para enviar el formulario
document.getElementById("affiliation-form").addEventListener("submit", function(event) {
  event.preventDefault();

  // Obtener los valores del formulario por id
  const nameInput = document.getElementById("name");
  const lastNameInput = document.getElementById("lastName");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("email");
  const categorySelect = document.getElementById("category");

  // Creo un objeto para guardar cada socio creado
  const member = {
    name: nameInput.value,
    lastName: lastNameInput.value,
    address: addressInput.value,
    email: emailInput.value,
    category: categorySelect.value,
    paymentStatus: false,
    access: false
  };

  // Agregar un socio al arreglo
  members.push(member);

  // Resetear Formulario para despues de insertarlo
  nameInput.value = "";
  lastNameInput.value = "";
  addressInput.value = "";
  emailInput.value = "";
  categorySelect.selectedIndex = 0;

  // Actualizar lista de socios
  updateMembersList();

  // Guarda los socios en el local storage
    saveMembers();
});

// Funcion para actualizar la lista de socios en la tabla
function updateMembersList() {
  const membersList = document.getElementById("members-list");

  // Limpiar filas existentes
  membersList.innerHTML = "";

  // Crear nueva fila para cada socio
  members.forEach(function(member, index) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = member.name;
    row.appendChild(nameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = member.lastName;
    row.appendChild(lastNameCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = member.address;
    row.appendChild(addressCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = member.email;
    row.appendChild(emailCell);

    const categoryCell = document.createElement("td");
    categoryCell.textContent = member.category;
    row.appendChild(categoryCell);

    const paymentStatusCell = document.createElement("td");
    paymentStatusCell.textContent = member.paymentStatus ? "Pago" : "Impago";
    row.appendChild(paymentStatusCell);

    const accessCell = document.createElement("td");
    accessCell.textContent = member.access ? "Autorizado" : "Denegado";
    row.appendChild(accessCell);

    const actionsCell = document.createElement("td");

    const togglePaymentButton = document.createElement("button");
    togglePaymentButton.textContent = member.paymentStatus ? "No pagó" : "Pagó";
    togglePaymentButton.addEventListener("click", function() {
      togglePaymentStatus(index);
    });
    actionsCell.appendChild(togglePaymentButton);

    const accessButton = document.createElement("button");
    accessButton.textContent = member.access ? "Denegar Acceso" : "Permitir Acceso";
    accessButton.addEventListener("click", function() {
      toggleAccess(index);
    });
    actionsCell.appendChild(accessButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", function() {
      editMember(index);
    });
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Borrar";
    deleteButton.addEventListener("click", function() {
      deleteMember(index);
    });
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);

    membersList.appendChild(row);
  });
}

// Función para cambiar el estado de pago de un socio
function togglePaymentStatus(index) {
  members[index].paymentStatus = !members[index].paymentStatus;

  // Chequear si el pago está actualizado
  if (members[index].paymentStatus) {
    members[index].access = true; // Permite el acceso si el pago esta hecho
  } else {
    members[index].access = false; // Deniega el acceso si el pago no esta hecho
  }

  // Actualiza lista de los socios
  updateMembersList();

  // Guarda los socios en el local storage
  saveMembers();
}

// Función para cambiar el acceso de un socio
function toggleAccess(index) {
  members[index].access = !members[index].access;

  // Actualiza lista de los socios
  updateMembersList();

  // Guarda los socios en el local storage
  saveMembers();
}

// Funcion para editar un socio
function editMember(index) {
  const member = members[index];

  // Llenar el formulario con la información de los socios
  document.getElementById("name").value = member.name;
  document.getElementById("lastName").value = member.lastName;
  document.getElementById("address").value = member.address;
  document.getElementById("email").value = member.email;
  document.getElementById("category").value = member.category;

  // Eliminar el socio de el arreglo para que no aparezca duplicado al editar
  members.splice(index, 1);

  // Actualiza lista de los socios
  updateMembersList();

  // Guarda los socios en el local storage
  saveMembers();
}

// Funcion para eliminar un socio
function deleteMember(index) {
  // Eliminar el socio de el arreglo
  members.splice(index, 1);

  // Actualiza lista de los socios
  updateMembersList();

 // Guarda los socios en el local storage
 saveMembers();
}

// Carga los socios desde el local stoarge en la pagina ed carga
loadMembers();

// Llamada a la funcion para actualizar la lista inicial de socios
updateMembersList();
