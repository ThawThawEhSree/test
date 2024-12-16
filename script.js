document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('patientModal');
    const addPatientBtn = document.getElementById('addPatientBtn');
    const closeModal = document.querySelector('.close');
    const patientForm = document.getElementById('patientForm');
    const tableBody = document.querySelector('tbody');
    let editingRow = null;

    // Open modal
    addPatientBtn.addEventListener('click', () => {
        patientForm.reset();
        editingRow = null;
        modal.style.display = 'flex';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Save patient data
    patientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(patientForm);
        const patientData = Object.fromEntries(formData.entries());
        patientData.gender = formData.get('gender');

        if (editingRow) {
            updateRow(editingRow, patientData);
            alert('Patient updated successfully!');
        } else {
            addRow(patientData);
            alert('Patient added successfully!');
        }
        modal.style.display = 'none';
    });

    // Add a row to the table
    function addRow(data) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${Date.now()}</td>
            <td>${data.patientName}</td>
            <td>${data.status}</td>
            <td>${data.parentName}</td>
            <td>${data.breed}</td>
            <td>${data.gender}</td>
            <td>${data.dob}</td>
            <td>${data.contact}</td>
            <td>${data.address}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
        attachRowListeners(row);
    }

    // Update a row in the table
    function updateRow(row, data) {
        const cells = row.children;
        cells[1].textContent = data.patientName;
        cells[2].textContent = data.status;
        cells[3].textContent = data.parentName;
        cells[4].textContent = data.breed;
        cells[5].textContent = data.gender;
        cells[6].textContent = data.dob;
        cells[7].textContent = data.contact;
        cells[8].textContent = data.address;
    }

    // Attach listeners for Edit and Delete buttons
    function attachRowListeners(row) {
        row.querySelector('.edit').addEventListener('click', () => {
            editingRow = row;
            const cells = row.children;
            patientForm.patientName.value = cells[1].textContent;
            patientForm.status.value = cells[2].textContent;
            patientForm.parentName.value = cells[3].textContent;
            patientForm.breed.value = cells[4].textContent;
            patientForm.gender.value = cells[5].textContent;
            patientForm.dob.value = cells[6].textContent;
            patientForm.contact.value = cells[7].textContent;
            patientForm.address.value = cells[8].textContent;
            modal.style.display = 'flex';
        });

        row.querySelector('.delete').addEventListener('click', () => {
            row.remove();
            alert('Patient deleted successfully!');
        });
    }
});
