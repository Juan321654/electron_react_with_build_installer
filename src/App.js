import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3007/api/v1/users")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! server not found</p>;

  return (
    <div className="App">
      {data.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} {item.lastName}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
