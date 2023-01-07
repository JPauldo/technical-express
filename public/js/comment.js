const commentFormHandler = async (event) => {
  event.preventDefault();

  const message = document.querySelector('#comment-message').value.trim();

  if (email && password) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({ message, user_id, post_id }),
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
.querySelector('.comment-form')
.addEventListener('submit', commentFormHandler);
