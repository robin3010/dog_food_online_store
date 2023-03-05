export async function signIn(userData) {
  console.log(this);
  const fetchSignIn = await fetch(`${this.baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  this.checkFetchErrors.call(fetchSignIn);

  const response = await fetchSignIn.json();
  return response;
}

export async function signUp(userData) {
  const fetchSignUp = await fetch(`${this.baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  this.checkFetchErrors.call(fetchSignUp);
}
