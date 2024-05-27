import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCaretDown } from 'react-icons/fa'; // Import the dropdown icon from react-icons
import logo from '../assets/logo.png';
import person from '../assets/person.png';

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
  height: 45px;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
`;

const AddResourceButton = styled(Link)`
  background-color: #0B69FF;
  color: white;
  padding: 10px 20px;
  margin-right: 20px;
  text-decoration: none;
  border-radius: 5px;
  &:hover {
    background-color: darkblue;
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const PersonImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const DropdownIcon = styled(FaCaretDown)`
  height: 20px;
  width: 20px;
  margin-left: 5px;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.show ? 'block' : 'none')};
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 10px;
  min-width: 100px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

function NavBar() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <NavBarContainer>
      <Link to='/home'>
        <Logo src={logo} alt="Logo" />
      </Link>
      <NavItems>
        <AddResourceButton to='/addresource'>+ Add</AddResourceButton>
        <UserContainer>
          <PersonImage src={person} alt="Person" />
          <DropdownIcon onClick={toggleDropdown} />
          <DropdownMenu show={dropdownVisible}>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </DropdownMenu>
        </UserContainer>
      </NavItems>
    </NavBarContainer>
  );
}

export default NavBar;
