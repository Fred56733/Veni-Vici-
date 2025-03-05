import { useState } from 'react'
import './App.css'
import CatInfo from './components/catInfo'

function App() {
  const [catData, setCatData] = useState(null);
  const [bannedCats, setBannedCats] = useState([]);
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
    const filteredData = data.filter((cat) => !bannedCats.includes(cat.attribute));
    const randomCat = filteredData[Math.floor(Math.random() * filteredData.length)];
    setCatData(randomCat);
    } catch (error) {
      console.error('Error fetching cat data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBan = (attribute) => {
    setBannedCats([...bannedCats, attribute]);
  }

  return (
    <div className="app-container">
      <h3>Veni Venci</h3>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'New Cat'}
      </button>
      {catData && <CatInfo catData={catData} handleBan={handleBan}/>}
    </div>  
  );
}

export default App;
