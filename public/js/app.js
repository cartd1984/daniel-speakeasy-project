//Fetch data from the api
function getFiles() {
  return fetch('/speakeasy')
    .then(response => response.json())
    .then(drinks => {
      console.log("I have the drinks:", drinks);
      return drinks;
    })
    .catch(error => console.error("GETDRINKS:", error));
}

// Renders the drink files
function renderFiles(drinks) {
  const drinkList = drinks.map(drink => `
    <li class="list-group-item">
      <strong>${drink.name}</strong> - ${drink.description} - ${drink.rate} - ${drink.comments}
       <span class="pull-right">
        <button type="button" class="btn btn-xs btn-default" onclick="handleEditFileClick(this)" data-file-id="${drink._id}">Edit</button>
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteFileClick(this)" data-file-id="${drink._id}">Del</button>
        </span>
    </li>`);
  const html = `<ul class="list-group">${drinkList.join('')}</ul>`;

  return html;
}

// Fetch files from the API and render to the page
function refreshFileList() {
  getFiles()
    .then(drinks => {
      
      window.fileList = drinks;
      
      const html = renderFiles(drinks);
      $('#list-container').html(html);
    });
}

/*
function toggleAddFileFormVisibility() {
  $('#form-container').toggleClass('hidden');
} */

function submitFileForm() {
  console.log("You clicked 'submit'. Good work.");
 
  const drinkData = {
    name: $('#drink-name').val(),
    description: $('#drink-description').val(),
    rate: $('#drink-rate').val(),
    comments: $('#drink-comments').val(),
    _id: $('#drink-id').val()
  }
    
let method, url;
  if (drinkData._id) {
    method = 'PUT';
    url = '/speakeasy/' + drinkData._id;
  } else {
    method = 'POST';
    url = '/speakeasy';
  }
 
  fetch(url, {
    method: method,
    body: JSON.stringify(drinkData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(drink => {
      console.log("data is submitted", drink);
      setForm();
      refreshFileList();
    })
    .catch(err => {
      console.error("Uh oh. It didn't submit.", err);
    }) 
}

function cancelFileForm() {
  setForm();
}
    
function handleEditFileClick(element) {
  const drinkId = element.getAttribute('data-file-id');
    console.log("I will edit for you", drinkId);

  const editDrink = window.fileList.find(drink => drink._id === drinkId);
    if (editDrink) {
     setForm(editDrink)
    }
  }

function setForm(data) {
  data = data || {};

  const drinkFile = {
    name: data.name || '',
    description: data.description || '',
    rate: data.rate || '',
    comments: data.comments || '',
    _id: data._id || '',
  };

  $('#drink-name').val(drinkFile.name);
  $('#drink-description').val(drinkFile.description);
  $('#drink-rate').val(drinkFile.rate);
  $('#drink-comments').val(drinkFile.comments);
  $('#drink-id').val(drinkFile._id);

  if (drinkFile._id) {
    $('#form-label').text("Edit Drink");
  } else {
    $('#form-label').text("Add Drink");
  }
}
    
function handleDeleteFileClick(element) {
  const drinkId = element.getAttribute('data-file-id');

  if (confirm("Are you sure?")) {
    console.log("Drink", drinkId, "is GONE!!!!!!");
    deleteFile(drinkId);
  }
}
    
function deleteFile(drinkId) {
    const url = '/speakeasy/' + drinkId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      console.log("DELETED!");
      refreshFileList();
    })
    .catch(err => {
      console.error("The drink is not deleted!", err);
    });
}
