const postFormHandler = async (event) => {
  event.preventDefault();

  const messageEl = document.querySelector('#post-message');

  const title = document.querySelector('#post-title').value.trim();
  const message = messageEl.value.trim();
  const userId = messageEl.dataset.user;

  if (title && message) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, message, userId }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/profile`);
    } else {
      alert('Failed to log in.');
    }
  }
};

document
.querySelector('.post-form')
.addEventListener('submit', postFormHandler);
