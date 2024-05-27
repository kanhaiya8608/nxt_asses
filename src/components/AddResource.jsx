import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import bgImage from '../assets/bgImage.png';
import NavBar from './NavBar';
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 90vh;
  gap: 0px 0px;
  grid-template-areas: 
    "form background";
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    grid-template-areas: 
      "form"
      "background";
  }
`;

const FormContainer = styled.div`
  grid-area: form;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BackgroundImageContainer = styled.div`
  grid-area: background;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`;

const Form = styled.form`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #0B69FF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const AddResource = () => {
  const [formData, setFormData] = useState({
    title: '',
    icon_url: '',
    link: '',
    description: '',
    category: '',
    tag: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.title || !formData.icon_url || !formData.link || !formData.description || !formData.category || !formData.tag) {
      toast.error('Please fill in all fields.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (!isValidUrl(formData.icon_url) || !isValidUrl(formData.link)) {
      toast.error('Invalid URL format.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (formData.description.length < 10) {
      toast.error('Description must be at least 10 characters long.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (formData.description.length > 100) {
      toast.error('Description must be less than 100 characters.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (formData.title.length < 5 || formData.icon_url.length < 10 || formData.link.length < 10 || formData.category.length < 5) {
      toast.error('Minimum length required for one or more fields.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (formData.title.length > 50 || formData.category.length > 50) {
      toast.error('Length limit exceeded for one or more fields.', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // Mock API call
      simulateResourceCreation();
    }
  };

  const isValidUrl = (url) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(url);
  };

  const simulateResourceCreation = () => {
    // Simulating API request
    toast.success('Resource created successfully.', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setFormData({
      title: '',
      icon_url: '',
      link: '',
      description: '',
      category: '',
      tag: '',
    });
  };

  return (
    <><NavBar/>    <Container>
      <FormContainer>
        <h2>Add Resource</h2>
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <StyledInput type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="icon_url">Icon URL:</label>
            <StyledInput type="text" id="icon_url" name="icon_url" value={formData.icon_url} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="link">Link:</label>
            <StyledInput type="text" id="link" name="link" value={formData.link} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <StyledTextarea id="description" name="description" value={formData.description} onChange={handleChange}></StyledTextarea>
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <StyledInput type="text" id="category" name="category" value={formData.category} onChange={handleChange
            } />
            </div>
            <div>
              <label htmlFor="tag">Tag:</label>
              <StyledSelect id="tag" name="tag" value={formData.tag} onChange={handleChange}>
                <option value="">Select Tag</option>
                <option value="user">User</option>
                <option value="request">Request</option>
              </StyledSelect>
            </div>
            <StyledButton type="submit">Add Resource</StyledButton>
          </Form>
          <ToastContainer />
        </FormContainer>
        <BackgroundImageContainer>
          {/* Background image */}
        </BackgroundImageContainer>
      </Container>
      </>

    );
  };
  
  export default AddResource;
  