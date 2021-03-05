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
    const form = new FormData()
    form.append("first_name", first_name)
    form.append("last_name", last_name)
    form.append("email_address", email_address)
    form.append("password", password)
    form.append("instrument", instrument)
    form.append("phone", phone)
    form.append("teacher_id", teacher_id)
    if (photo) form.append("photo", photo)

    const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // body: JSON.stringify({
    //   username,
    //   email,
    //   password,
    // }),
  });
  return await response.json();
}
