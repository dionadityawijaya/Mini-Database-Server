document.getElementById('showData').onclick = function() {
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('dataContent').textContent = JSON.stringify(data, null, 2);
            document.getElementById('dataDisplay').classList.remove('hidden');
            document.getElementById('formDisplay').classList.add('hidden');
            document.getElementById('updateFormDisplay').classList.add('hidden');
            history.pushState({}, '', '/data'); // Ubah URL
        })
        .catch(error => console.error('Error fetching data:', error));
};

document.getElementById('addData').onclick = function() {
    document.getElementById('formDisplay').classList.remove('hidden');
    document.getElementById('dataDisplay').classList.add('hidden');
    document.getElementById('updateFormDisplay').classList.add('hidden');
    history.pushState({}, '', '/data/add'); // Ubah URL
};

document.getElementById('submitAddData').onclick = function() {
    const newData = { 
        id: document.getElementById('dataId').value,  // Menambahkan ID dari input form
        name: document.getElementById('dataName').value, 
        value: document.getElementById('dataValue').value 
    };

    fetch('/data/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)  // Mengirim data termasuk ID
    })
    .then(() => {
        alert('Data berhasil ditambahkan!');
        document.getElementById('formDisplay').classList.add('hidden');
        
        // Reset nilai form setelah data berhasil ditambahkan
        document.getElementById('dataId').value = '';  
        document.getElementById('dataName').value = '';
        document.getElementById('dataValue').value = '';
        
        history.pushState({}, '', '/data'); // Kembali ke tampilan data
    })
    .catch(error => console.error('Error adding data:', error));
};


document.getElementById('updateData').onclick = function() {
    document.getElementById('updateFormDisplay').classList.remove('hidden');
    document.getElementById('dataDisplay').classList.add('hidden');
    document.getElementById('formDisplay').classList.add('hidden');
    history.pushState({}, '', '/data/update'); // Ubah URL
};

document.getElementById('submitUpdateData').onclick = function() {
    const updateId = document.getElementById('updateId').value;
    const updatedData = { 
        name: document.getElementById('updateName').value, 
        value: document.getElementById('updateValue').value 
    };

    fetch(`/data/update/${updateId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(() => {
        alert('Data berhasil diperbarui!');
        document.getElementById('updateFormDisplay').classList.add('hidden');
        document.getElementById('updateId').value = '';
        document.getElementById('updateName').value = '';
        document.getElementById('updateValue').value = '';
        history.pushState({}, '', '/data'); // Kembali ke tampilan data
    })
    .catch(error => console.error('Error updating data:', error));
};


document.getElementById('deleteData').onclick = function() {
    const deleteId = prompt('Masukkan ID data yang ingin dihapus:');
    
    if (deleteId) {
        fetch(`/data/delete/${deleteId}`, {
            method: 'DELETE'
        })
        .then(() => {
            alert('Data berhasil dihapus!');
            history.pushState({}, '', '/data'); // Kembali ke tampilan data
        })
        .catch(error => console.error('Error deleting data:', error));
    }
};