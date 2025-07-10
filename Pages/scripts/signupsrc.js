const button = document.getElementById('signup');
const spinner = document.getElementById('spinner');
const buttonText = document.getElementById('button_text');

function toggleSpinner(isLoading) {
  if (isLoading) {
    spinner.classList.remove('d-none');
    buttonText.textContent = 'Loading...';
    button.disabled = true;
  } else {
    spinner.classList.add('d-none');
    buttonText.textContent = 'Sign Up';
    button.disabled = false;
  }
}

document.getElementById('signup').addEventListener('click', async (e) => {
  e.preventDefault(); // prevent page reload
  toggleSpinner(true);
  const authData = {
    "username": document.getElementById('username').value,
    "password": document.getElementById('password').value
  };
  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authData)
    });

    const result = await response.json();
    if (result.success) {
      document.getElementById('result').innerHTML = 'User_inserted'
      setTimeout(() => {
        location.replace('http://localhost:3000/verified/home');
      }, 2000);

    }
    else {
      document.getElementById('result').innerHTML = result.error;
      setTimeout(() => {
        location.replace('http://localhost:3000/signup');
      }, 2000);

    }

  } catch (err) {
    toggleSpinner(false);
    document.getElementById('result').textContent = 'Failed to Connect to the server';
  }
});




