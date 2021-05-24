export const authenticate = async() => {
  const response = await fetch('/api/auth/',{
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
}

export const login = async (email, password, student) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      student
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


export const signUp = async (newUser) => {
  const {first_name, last_name, email_address, password,
    instrument, phone, parent_name, photo, teacher_id,
    address, city, stateId, zip, role} = newUser;
  const form = new FormData()
  form.append("first_name", first_name)
  form.append("last_name", last_name)
  form.append("email_address", email_address)
  form.append("phone", phone)
  form.append("password", password)
  form.append("student", role)
  if (instrument) form.append("instrument", instrument)
  if (teacher_id) form.append("teacher_id", teacher_id)
  if (photo) form.append("photo", photo)
  if (parent_name) form.append("parent_name", parent_name)
  if (address) form.append("street_address", address)
  if (city) form.append("city", city)
  if (stateId) form.append("state_id", stateId)
  if (zip) form.append("zip", Number(zip))

  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: form
  });
  return await response.json();
}
