

const button = document.getElementById('login_button');
const spinner = document.getElementById('spinner');
const buttonText = document.getElementById('button_text');

function toggleSpinner(isLoading) {
  if (isLoading) {
    spinner.classList.remove('d-none');
    buttonText.textContent = 'Loading...';
    button.disabled = true;
  } else {
    spinner.classList.add('d-none');
    buttonText.textContent = 'Login';
    button.disabled = false;
  }
}

document.getElementById('login_button').addEventListener('click', async (e) => {
  e.preventDefault(); // prevent page reload
  toggleSpinner(false);
  const authData = {
    "username": document.getElementById('username').value,
    "password": document.getElementById('password').value
  };
  try {
    const response = await fetch('http://localhost:3000/verified', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    });

    const result = await response.json();
    if (result.ans) {
      toggleSpinner(true);
      setTimeout(() => {
        location.replace('http://localhost:3000');
      }, 2000);
    }
    else {
      toggleSpinner(true);
      setTimeout(() => {
        location.replace('http://localhost:3000/verified/home');
      }, 2000);
      document.getElementById('result').innerHTML = result.error;
    }
  } catch (err) {
    toggleSpinner(true);
    document.getElementById('result').textContent = 'Failed to fetch data';
  }
});



