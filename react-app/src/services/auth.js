export const authenticate = async() => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  return await response.json();
}

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    }
  });
  return await response.json();
};


export const signUp = async (newStudent) => {
  const {first_name, last_name, email_address, password,
    instrument, phone, parent_name, photo, teacher_id} = newStudent;
  const created_at = new Date()
  const form = new FormData()
  form.append("first_name", first_name)
  form.append("last_name", last_name)
  form.append("email_address", email_address)
  form.append("password", password)
  form.append("instrument", instrument)
  form.append("phone", phone)
  form.append("teacher_id", teacher_id)
  form.append("created_at", created_at.toISOString().replace('Z', '+00:00'))
  if (photo) form.append("photo", photo)
  if (parent_name) form.append("parent_name", parent_name)

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: form
  });
  return await response.json();
}
