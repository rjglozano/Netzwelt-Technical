import React, { useState, useEffect } from 'react';

interface YourDataType {
  id: string;
  name: string;
  parent: string | null;
}

const YourComponent: React.FC = () => {
  const [data, setData] = useState<YourDataType[] | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

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

  const toggleItem = (itemId: string) => {
    setExpandedItems((prevItems) =>
      prevItems.includes(itemId)
        ? prevItems.filter((id) => id !== itemId)
        : [...prevItems, itemId]
    );
  };

  const hasChildren = (itemId: string) => {
    return data?.some((item) => item.parent === itemId);
  };

  const renderTerritories = (parentId: string | null, level: number = 0) => {
    return (
      <ul>
        {data
          ?.filter((item) => item.parent === parentId)
          .map((item: YourDataType) => (
            <li key={item.id}>
              <div
                style={{
                  marginLeft: `${level * 20}px`,
                  cursor: hasChildren(item.id) ? 'pointer' : 'default',
                }}
                onClick={() => hasChildren(item.id) && toggleItem(item.id)}
              >
                {hasChildren(item.id) && (
                  <span>
                    {expandedItems.includes(item.id) ? '[-]' : '[+]'}
                  </span>
                )}
                {item.name}
              </div>
              {expandedItems.includes(item.id) && (
                <div style={{ marginLeft: '20px' }}>
                  {renderTerritories(item.id, level + 1)}
                </div>
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Your Component</h1>
      {data ? (
        <div>
          {renderTerritories(null)}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default YourComponent;
