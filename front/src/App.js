import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import OrderList from './OrderList';
import OrderFormLoaded from './OrderFormLoaded';
import NewOrderForm from './NewOrderForm';
import NewOrderFormLoaded from './NewOrderFormLoaded'
import NewOrderFormMarried from './NewOrderFormMarried'
import NewOrderFormMarriedLoaded from './NewOrderFormMarriedLoaded'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/orders/new" element={<NewOrderForm />} />
        <Route path="/orders/married" element={<NewOrderFormMarried />} />
        <Route path="/orders/:orderNumber" element={<OrderFormLoaded />} />
        <Route path="/orders/newform/:orderNumber" element={<NewOrderFormLoaded />} />
        <Route path="/orders/married/:orderNumber" element={<NewOrderFormMarriedLoaded />} />
      </Routes>
    </Router>
  );
};

export default App;
