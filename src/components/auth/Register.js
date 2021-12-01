import React, { useState } from 'react';

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <div>
      <h1>Register Here</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emial">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
