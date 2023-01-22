const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentEl = document.querySelector('#comment-message');

  const message = commentEl.value.trim();
  const { user, post } = commentEl.dataset;
  console.log(message, user, post);

  // if (message) {
  //   console.log('Here');
  //   const response = await fetch('/api/comments', {
  //     method: 'POST',
  //     body: JSON.stringify({ message, userId: user, postId: post }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   if (response.ok) {
  //     document.location.replace(`/profile/${response.id}`);
  //   } else {
  //     alert('Failed to log in.');
  //   }
  // }
};

document
.querySelector('.comment-form')
.addEventListener('submit', commentFormHandler);
