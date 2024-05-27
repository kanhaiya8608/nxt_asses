// src/Resources.js
import { useState, useEffect } from 'react';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://media-content.ccbp.in/website/react-assignment/resources.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch resources');
        }
        return response.json();
      })
      .then(data => {
        setResources(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Resources</h2>
      <ul>
        {resources.map(resource => (
          <li key={resource.id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <p>Tag: {resource.tag}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
