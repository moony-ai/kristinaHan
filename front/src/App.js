import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import OrderList from './OrderList';
// import OrderForm from './OrderForm';
import OrderFormLoaded from './OrderFormLoaded';
import OrderFormNew from './OrderFormNew';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/orders/new" element={<OrderFormNew />} />
        <Route path="/orders/:orderNumber" element={<OrderFormLoaded />} />
      </Routes>
    </Router>
  );
};

export default App;
