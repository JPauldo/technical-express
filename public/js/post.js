const postFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const message = document.querySelector('#post-message').value.trim();

  if (email && password) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/profile/${response.id}`);
    } else {
      alert('Failed to log in.');
    }
  }
};

document
.querySelector('.post-form')
.addEventListener('submit', postFormHandler);
