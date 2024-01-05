import { useState, useEffect } from 'react';

interface YourDataType {
  id: string;
  name: string;
  parent: string | null;
}

const YourComponent = () => {
  const [data, setData] = useState<YourDataType[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/territories');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Territories</h1>
      {data ? (
        <div>
          {data.map((item: YourDataType) => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default YourComponent;
