import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import OrderList from './OrderList';
import OrderForm from './OrderForm';
import OrderFormLoaded from './OrderFormLoaded';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/orders/new" element={<OrderForm />} />
        <Route path="/orders/:orderNumber" element={<OrderFormLoaded />} />
      </Routes>
    </Router>
  );
};

export default App;
