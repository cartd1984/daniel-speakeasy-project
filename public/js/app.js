/**
 * Fetches data from the api
 */
function getFiles() {
  return fetch('/speakeasy-practice')
    .then(response => response.json())
    .then(drinks => {
      console.log("Files, I got them:", drinks);
      return drinks;
    })
    .catch(error => console.error("GETFILES:", error));
}

/**
 * Render a list of files
 */
function renderFiles(drinks) {
  const listItems = drinks.map(drink => `
    <li class="list-group-item">
      <strong>${drink.name}</strong> - ${drink.description} - ${drink.rate} - ${drink.comments}
       <span class="pull-right">
        <button type="button" class="btn btn-xs btn-default" onclick="handleEditFileClick(this)" data-drink-id="${drink._id}">Edit</button>
      </span>
    </li>`);
  const html = `<ul class="list-group">${listItems.join('')}</ul>`;

  return html;
}

/**
 * Fetch files from the API and render to the page
 */
function refreshFileList() {
  getFiles()
    .then(drinks => {
      
      window.fileList = drinks;
      
      const html = renderFiles(drinks);
      $('#list-container').html(html);
    });
}

function submitFileForm() {
  console.log("You clicked 'submit'. Congratulations.");
 
  const drinkData = {
    title: $('#drink-name').val(),
    description: $('#drink-description').val(),
    rate: $('#drink-rate').val(),
    comments: $('#drink-comments').val(),
    _id: $('#drink-id').val()
  };
    
  let method, url;
  if (drinkData._id) {
    method = 'PUT';
    url = '/speakeasy-practice' + drinkData._id;
  } else {
    method = 'POST';
    url = '/speakeasy-practice';
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
      console.log("data is posted", drink);
      refreshFileList();
    })
    .catch(err => {
      console.error("Uh oh. Something's not working.", err);
    }) 
  }
 
function cancelFileForm() {
  setForm();
}

function handleEditFileClick(element) {
  const drinkId = element.getAttribute('data-drink-id');

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
    _id: data._id || ''
  };

  $('#drink-name').val(drinkFile.name);
  $('#drink-description').val(drinkFile.description);
  $('#drink-rate').val(drinkFile.rate);
  $('#drink-comments').val(drinkFile.comments);
  $('#drink-id').val(drinkFile._id);

  if (drinkFile._id) {
    $('#form-label').text("Edit File");
  } else {
    $('#form-label').text("Add File");
  }
}