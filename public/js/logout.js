const logout = async () => {
  const response = await fetch('/api/users/logout', {});
};

document.querySelector('#logout').addEventListener('click', logout);
