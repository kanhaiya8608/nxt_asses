import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  padding: 0 10px; /* Add padding */
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px; /* Add padding */
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Ensure padding is included in the width */
`;

const ErrorText = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px; /* Add margin */
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #0B69FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Note = styled.p`
  font-size: 14px;
  color: #666;
  margin-top: 10px;
`;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    mobileNumber: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    mobileNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!formData.mobileNumber.trim()) {
      setErrors({ ...errors, mobileNumber: 'Mobile number is required' });
    }
    if (!formData.password.trim()) {
      setErrors({ ...errors, password: 'Password is required' });
    }
    if (formData.mobileNumber.trim() && formData.password.trim()) {
      // Mock login functionality
      if (formData.mobileNumber === '1234567890' && formData.password === 'password') {
        toast.success('Login successful', { position: 'bottom-center' });
        // Redirect to filter page
        navigate('/home');
      } else {
        toast.error('Invalid mobile number or password', { position: 'bottom-center' });
      }
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <h2>Login</h2>
        <Note>Note: Use phone number 1234567890 and password is password.</Note>
        <LoginForm onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor="mobileNumber">Mobile Number:</Label>
            <Input type="text" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
            {errors.mobileNumber && <ErrorText>{errors.mobileNumber}</ErrorText>}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="password">Password:</Label>
            <Input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </InputContainer>
          <SubmitButton type="submit">Login</SubmitButton>
        </LoginForm>
        <ToastContainer />
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginPage;
