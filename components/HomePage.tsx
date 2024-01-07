'client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { IoIosArrowDropdown, IoIosArrowDropright  } from "react-icons/io";




interface YourDataType {
  id: string;
  name: string;
  parent: string | null;
}

const HomePage: React.FC = () => {
  const [data, setData] = useState<YourDataType[] | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const {isAuthenticated } = useAuth();
  console.log(isAuthenticated)

  const router = useRouter();

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

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/account/login');
    }
  }, [isAuthenticated, router]);


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
      <ul className='text-white'>
        {data
          ?.filter((item) => item.parent === parentId)
          .map((item: YourDataType) => (
            <li key={item.id}>
              <div
                className='flex items-center'
                style={{
                  marginLeft: `${level * 20}px`,
                  cursor: hasChildren(item.id) ? 'pointer' : 'default',
                }}
                onClick={() => hasChildren(item.id) && toggleItem(item.id)}
              >
                {hasChildren(item.id) && (
                  <span>
                    {expandedItems.includes(item.id) ? <IoIosArrowDropright className='text-red-300' size={30} /> : <IoIosArrowDropdown className='text-green-300'  size={30} />}
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
    <div className='w-full min-h-screen bg-gradient-to-b from-slate-500 to-indigo-500 flex flex-col items-center py-10 font-Merriweather gap-2 sm:gap-4'>
      <h1 className='text-3xl sm:text-6xl text-white'>Territories </h1>
      <p className='text-white text-xl sm:text-2xl'>Here are the list of territories</p>
      {data ? (
        <div >
          {renderTerritories(null)}
        </div>
      ) : (
        <p className='text-white'>Loading...</p>
      )}
    </div>
  );
};

export default HomePage;
