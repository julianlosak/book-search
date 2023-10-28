const fetchWithToken = (url, method, body, token) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
};

export const getMe = (token) => {
  return fetchWithToken('/api/users/me', 'GET', null, token);
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const saveBook = (bookData, token) => {
  return fetchWithToken('/api/users', 'PUT', bookData, token);
};

export const deleteBook = (bookId, token) => {
  return fetchWithToken(`/api/users/books/${bookId}`, 'DELETE', null, token);
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
