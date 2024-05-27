import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from "react-icons/fa";
import NavBar from '../components/NavBar'

const Container = styled.div`
  padding: 20px;

  @media (min-width: 768px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  max-width: 1000px;
  margin: 0 auto; 
`;

const Tabs = styled.div`
 display: flex;
 justify-content: center; 
  margin-bottom: 20px;
  border-radius: 5px;
  overflow: hidden;
`;

const TabGroup = styled.div`
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;

  & > button:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  > button:second-child {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }

  & > button:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`;

const TabButton = styled.button`
  background-color: ${props => (props.active ? '#0B69FF' : '#D7DFE9')};
  color: ${props => (props.active ? 'white' : 'black')};
  border: none;
  width: 200px;
  font-weight: 600;
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;

  border-right: 1px solid #ccc;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#ccc')};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 40vw; /* Default width */
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding-left: 35px; /* Space for the search icon */

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 10px;
  top: 10px;
  color: #ccc;
`;

const TabContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  // Add styling for the no matched values message
  .no-matched-values {
    flex-basis: 100%;
    text-align: center;
    font-weight: bold;
  }
`;
const ResourceCard = styled.div`
  flex: 1 0 26%; /* Adjust width based on the number of columns */
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-basis: 100%; /* Set full width on mobile */
  }
`;

const ResourceImage = styled.img`
  width: 100%;
  max-height: 200px; /* Adjust the max height as needed */
  object-fit: cover; /* Ensure the image covers the entire container */
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const PageButton = styled.button`
  background-color: ${props => (props.active ? '#0B69FF' : '#D7DFE9')};
  color: ${props => (props.active ? 'white' : 'black')};
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#ccc')};
  }
`;

function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 6;

  useEffect(() => {
    // Simulate fetching resources from an API
    fetch('https://media-content.ccbp.in/website/react-assignment/resources.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        return response.json();
      })
      .then(data => {
        setResources(data);
      })
      .catch(error => {
        console.error('Error fetching resources:', error);
      });
  }, []);

  useEffect(() => {
    // Filter resources based on searchQuery and activeTab
    const filtered = resources.filter(resource => {
      const titleMatch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch = activeTab === 'all' || resource.tag === activeTab;
      return titleMatch && tagMatch;
    });
    setFilteredResources(filtered);
  }, [searchQuery, activeTab, resources]);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(indexOfFirstResource, indexOfLastResource);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <NavBar/>
    <Container>
      <Tabs>
        <TabGroup>       
            <TabButton active={activeTab === 'all'} onClick={() => handleTabChange('all')}>Resources</TabButton>
        <TabButton active={activeTab === 'request'} onClick={() => handleTabChange('request')}>Requests</TabButton>
        <TabButton active={activeTab === 'user'} onClick={() => handleTabChange('user')}>Users</TabButton>
        </TabGroup>
      </Tabs>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </SearchContainer>
      <TabContent>
        {currentResources.length > 0 ? (
          currentResources.map(resource => (
            <ResourceCard key={resource.id}>
              <ResourceImage src={resource.icon_url} alt={resource.title} />
              <h3>{resource.title}</h3>
              <p>{resource.link}</p>
              <p>{resource.description}</p>
            </ResourceCard>
          ))
        ) : (
          <div className="no-matched-values">No matched values. Please try again.</div>
        )}
      </TabContent>
      <Pagination>
        {Array.from({ length: Math.ceil(filteredResources.length / resourcesPerPage) }).map((_, index) => (
          <PageButton key={index} active={currentPage === index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
    </>
  );
}

export default Home;
