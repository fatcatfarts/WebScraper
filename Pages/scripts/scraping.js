
function logout() {
  window.location.href = '/logout';
}
///////////////////LOGOUT/////////////////////
const logoutBtn = document.getElementById('logoutBtn');
const logoutOverlay = document.getElementById('logoutOverlay');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

logoutBtn.addEventListener('click', () => {
  logoutOverlay.classList.remove('hidden');
});

cancelLogout.addEventListener('click', () => {
  logoutOverlay.classList.add('hidden');
});

confirmLogout.addEventListener('click', () => {
  logout();
});

////////////////////////////////////
let array = [];
let confirm_save = false;

fetch('http://localhost:3000/api/data').then(res => res.json()).then(data => {
  document.getElementById('name').textContent = data.username
})

document.getElementById('form').addEventListener('click', async (e) => {
  e.preventDefault(); // prevent page reload
  document.querySelectorAll('.hide').forEach(btn => {
    btn.hidden = true;
  })
  document.querySelectorAll('.refresh').forEach(btn => {
    btn.innerHTML = '';
  })
  array.length = 0;
  document.querySelectorAll('.btn-check').forEach(btn => {
    if (btn.checked) {
      array.push(1);
    } else {
      array.push(0);
    }
  })


  const url = { 'url': String((document.getElementById('LINK').value)), 'array': array };
  try {
    const response = await fetch('http://localhost:3000/scrape/data2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(url)
    });

    const result = await response.json();

    for (const key in result) {
      if (result[key] !== null) {

        const id = key.toUpperCase();
        document.getElementById(id).innerText = result[key];
        document.querySelector(`[tag="${id}"]`).hidden = false;

      }
    }
    document.getElementById('save').disabled = false;

  } catch (err) {
    document.getElementById('response').textContent = 'Failed to fetch data';
  }
});
//////////////////////////////////////////////////////////////////////////////////
document.getElementById('save').addEventListener('click', async (e) => {
  e.preventDefault(); // prevent page reload

  const Content = [document.getElementById('LINK').value,
  document.getElementById('BODY').innerHTML,
  document.getElementById('HEADINGS').innerText.replace(/\s+/g, ' ').trim(),
  document.getElementById('LINKS').innerText.replace(/\s+/g, ' ').trim(),
  document.getElementById('PARAGRAPHS').innerText.replace(/\s+/g, ' ').trim(),
  document.getElementById('ARTICLES').innerText.replace(/\s+/g, ' ').trim(),
  document.getElementById('LISTS').innerText.replace(/\s+/g, ' ').trim()];


  for (let i = 0; i < array.length; i++) {
    Content[i + 1] = array[i] ? Content[i + 1] : 0
  }
  const savedata = { 'content': Content, 'username': document.getElementById('name').textContent, 'checked': confirm_save };

  if (confirm_save) {
    confirm_save = false;
  }
  try {
    const response = await fetch('http://localhost:3000/save/data3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(savedata)
    });

    const result = await response.json();
    var x = document.getElementById("snackbar");
    x.className = "show";
    if (result.success) {
      x.innerHTML = 'Updated Successfully';
      setTimeout(() => { x.className = x.className.replace("show", ""); }, 4000)
    } else if (result.checked) {
      confirm_save = true;
      x.innerHTML = 'Link Already Saved, Double Check';
      setTimeout(() => { x.className = x.className.replace("show", ""); }, 4000);
    }
    else {
      x.innerHTML = result.error;
      setTimeout(() => { x.className = x.className.replace("show", ""); }, 4000)
    }
  } catch (err) {
    document.getElementById('result').textContent = 'Failed to fetch data';
  }
});


