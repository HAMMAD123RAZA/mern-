import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';

const GetItem = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/get');
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item._id !== id));
  };

  const handleUpdateItem = (id, newTodo) => {
    setItems(items.map(item => item._id === id ? { ...item, todo: newTodo } : item));
  };

  return (
    <>
      {items.map((item) => (
        <Card
          key={item._id}
          todo={item}
          onRemove={handleRemoveItem}
          onUpdate={handleUpdateItem}
        />
      ))}
    </>
  );
};

export default GetItem;
