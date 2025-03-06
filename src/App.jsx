import { useState } from 'react'
import './App.css'
import CatInfo from './components/catInfo'

function App() {
  const [catData, setCatData] = useState(null);
  const [bannedAttributes, setBannedAttributes] = useState([]);
  const [bannedHistory, setBannedHistory] = useState([]);
  const [viewedCats, setViewedCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [interestedCats, setInterestedCats] = useState([]);
  const [firstFetch, setFirstFetch] = useState(false);

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
        return !bannedAttributes.some(attr => attr.attribute === 'breed' && attr.value === cat.name) && !viewedCats.includes(cat.id);
      });

      if (filteredData.length === 0) {
        alert('No more cats to show!');
        setCatData(null);
        setLoading(false);
        return;
      }

      const randomCat = filteredData[Math.floor(Math.random() * filteredData.length)];
      setViewedCats(prev => [...prev, randomCat.id]);

      if (randomCat.reference_image_id) {
        const imageResponse = await fetch(`https://api.thecatapi.com/v1/images/${randomCat.reference_image_id}`);
        const imageData = await imageResponse.json();
        setCatData({ ...randomCat, image: imageData });
      } else {
        setCatData(randomCat);
      }

      if (firstFetch) {
        setInterestedCats(prev => [...prev, randomCat]);
      } else {
        setFirstFetch(true);
      }
    } catch (error) {
      console.error('Error fetching cat data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = (attribute, value) => {
    setBannedAttributes([...bannedAttributes, { attribute, value }]);
    setBannedHistory([...bannedHistory, { attribute, value }]);
    setInterestedCats(prev => prev.filter(cat => cat.name !== value));
    fetchData();
  }

  const resetBannedAttributes = () => {
    setBannedAttributes([]);
    setBannedHistory([]);
  }

  const resetInterestedCats = () => {
    setInterestedCats([]);
  }

  return (
    <div className="app-container">
      <h4>Find your Purrfect Cat</h4>
      {catData ? (
        <CatInfo catData={catData} handleBan={handleBan} />
      ) : (
        <img src="src\assets\wink cat.png" alt="Winking Cat" className="Winking-Cat" /> 
      )}
      <div className="button-container">
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Loading...' : 'New Cat'}
        </button>
        <button onClick={() => handleBan('breed', catData?.name)} disabled={!catData}>
          Ban Cat
        </button>
      </div>
      <div className="lists-container">
        {bannedHistory.length > 0 && (
          <div className="ban-list">
            <h3>Banned Cats</h3>
            <ul>
              {bannedAttributes.map((item, index) => (
                <li key={index}>{item.value}</li>
              ))}
            </ul>
            <button onClick={resetBannedAttributes}>Reset Banned Breeds</button>
          </div>
        )}
        {interestedCats.length > 0 && (
          <div className="interested-list">
            <h3>Interested Cats</h3>
            <ul>
              {interestedCats.map((cat, index) => (
                <li key={index}>{cat.name}</li>
              ))}
            </ul>
            <button onClick={resetInterestedCats}>Reset Interested Cats</button>
          </div>
        )}
      </div>
    </div>  
  );
}

export default App;
