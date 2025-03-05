import { useState } from 'react'
import './App.css'
import CatInfo from './components/catInfo'

function App() {
  const [catData, setCatData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': import.meta.env.VITE_CAT_API_KEY
        }
      });
    const data = await response.json();
    const filteredData = data.filter((cat) => {
      return !bannedAttributes.some((attribute) => {
        return cat[attribute.attribute] === attribute.value;
      });
    });

    if (filteredData.length === 0) {
      alert('No more cats to show!');
      setCatData(null);
      setLoading(false);
      return;
    }

    const randomCat = filteredData[Math.floor(Math.random() * filteredData.length)];
    
    if (randomCat.reference_image_id) {
      const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/${randomCat.reference_image_id}`);
      const imageData = await imageResponse.json();
      setCatData({ ...randomCat, image: imageData });
      } else {
      setCatData(randomCat);
      }
    } catch (error) {
      console.error('Error fetching cat data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = (attribute, value) => {
    setBannedAttributes([...bannedAttributes, { attribute, value }]);
  }

  const resetBannedAttributes = () => {
    setBannedAttributes([]);
  }

  return (
    <div className="app-container">
      <h3>Find your Purrfect Cat</h3>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'New Cat'}
      </button>
      {catData && <CatInfo catData={catData} handleBan={handleBan}/>}
      <div className="banned-attributes">
        <h4>Banned Attributes</h4>
        <ul>
          {bannedAttributes.map((item, index) => (
            <li key={index}>
              {item.attribute}: {item.value}
            </li>
          ))}
        </ul>
        <button onClick={resetBannedAttributes}>Reset Banned Attributes</button>
      </div>
    </div>  
  );
}

export default App;
