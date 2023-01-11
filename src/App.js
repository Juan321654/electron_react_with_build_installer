import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ips, setIps] = useState([]);

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

  useEffect(() => {
    axios
      // this is from a separated server, not included in this repo
      // when i run that server (3002) you can fetch data correctly
      .get("http://localhost:3002/logger/get-all-instances")
      .then((res) => setIps(res.data));
  }, []);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error! server not found</p>;

  return (
    <div className="App">
      {data.map((item) => (
        <div key={item.id}>
          <p>
            {item.name} {item.lastName}
          </p>
        </div>
      ))}

      {ips.map((ip) => (
        <div key={ip}>
          <p>{ip}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
