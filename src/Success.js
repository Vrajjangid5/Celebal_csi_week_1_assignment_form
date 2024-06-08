
import React from 'react';
import './Form.css';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const { state } = location;
  const { firstName, lastName, username, email, phoneNo, country, city, panNo, aadharNo } = state || {};

  return (
    <div>
      <h1>Form Submitted Successfully</h1>
      <p><strong>First Name:</strong> {firstName}</p>
      <p><strong>Last Name:</strong> {lastName}</p>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Phone Number:</strong> {phoneNo}</p>
      <p><strong>Country:</strong> {country}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>Pan Number:</strong> {panNo}</p>
      <p><strong>Aadhar Number:</strong> {aadharNo}</p>
    </div>
  );
};

export default Success;
