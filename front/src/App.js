import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderList from './OrderList';
// import OrderForm from './OrderForm';
import OrderForm from './OrderForm copy';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<OrderList />} />
        <Route path="/orders/" element={<OrderForm />} />
        <Route path="/orders/:orderNumber" element={<OrderForm />} />
      </Routes>
    </Router>
  );
};

export default App;
