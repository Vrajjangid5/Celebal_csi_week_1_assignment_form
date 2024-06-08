import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const cityOptions = {
  India: ['Mumbai', 'Delhi', 'Bangalore'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  UK: ['London', 'Manchester', 'Birmingham'],
};

const Form = () => {
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.firstName) errors.firstName = 'First Name is required';
    if (!values.lastName) errors.lastName = 'Last Name is required';
    if (!values.username) errors.username = 'Username is required';
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    if (!values.phoneNo) errors.phoneNo = 'Phone Number is required';
    if (!values.country) errors.country = 'Country is required';
    if (!values.city) errors.city = 'City is required';
    if (!values.panNo) {
      errors.panNo = 'Pan Number is required';
    } else if (values.panNo.length !== 10) {
      errors.panNo = 'Pan Number must be exactly 10 characters';
    }
    if (!values.aadharNo) {
      errors.aadharNo = 'Aadhar Number is required';
    } else if (!/^\d+$/.test(values.aadharNo)) {
      errors.aadharNo = 'Aadhar Number must be numeric';
    }
    return errors;
  };

  useEffect(() => {
    const errors = validate(formValues);
    setFormErrors(errors);
  }, [formValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    adjustMarginTop();
  };

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
      city: '',
    });
    adjustMarginTop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      navigate('/success', { state: { ...formValues } });
    }
  };

  const adjustMarginTop = () => {
    const filledFields = Object.values(formValues).filter(Boolean).length;
    const container = document.querySelector('.container');
    if (filledFields > 0) {
      container.style.marginTop = `${175 - (75 / Object.keys(formValues).length) * filledFields}%`;
    } else {
      container.style.marginTop = '175%';
    }
  };

  return (
    <div className="container">
      <h1>Registration Form</h1>
      <p>Fill out the form carefully for registration</p>
      <form onSubmit={handleSubmit}>
        <div className='nameplate'>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formValues.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
          {formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formValues.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
          {formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          {formErrors.username && <p className="error">{formErrors.username}</p>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {formErrors.email && <p className="error">{formErrors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {formErrors.password && <p className="error">{formErrors.password}</p>}
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={formValues.phoneNo}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {formErrors.phoneNo && <p className="error">{formErrors.phoneNo}</p>}
        </div>
        <div>
          <label>Country</label>
          <select
            name="country"
            value={formValues.country}
            onChange={handleCountryChange}
          >
            <option value="">Please Select</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
          {formErrors.country && <p className="error">{formErrors.country}</p>}
        </div>
        <div>
          <label>City</label>
          <select
            name="city"
            value={formValues.city}
            onChange={handleChange}
            disabled={!formValues.country}
          >
            <option value="">Please Select</option>
            {formValues.country &&
              cityOptions[formValues.country].map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
          </select>
          {formErrors.city && <p className="error">{formErrors.city}</p>}
        </div>
        <div>
          <label>PAN Number</label>
          <input
            type="text"
            name="panNo"
            value={formValues.panNo}
            onChange={handleChange}
            placeholder="Enter your PAN number"
          />
          {formErrors.panNo && <p className="error">{formErrors.panNo}</p>}
        </div>
        <div>
          <label>Aadhar Number</label>
          <input
            type="text"
            name="aadharNo"
            value={formValues.aadharNo}
            onChange={handleChange}
            placeholder="Enter your Aadhar number"
          />
          {formErrors.aadharNo && <p className="error">{formErrors.aadharNo}</p>}
        </div>
        <button type="submit" disabled={Object.keys(formErrors).length > 0}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Form;
