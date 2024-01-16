import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderForm from './OrderForm.js'; // OrderForm 컴포넌트의 경로를 정확히 지정해야 합니다.

const App = () => {
  return (
    <Router>
      <OrderForm />
      <Routes>
        {/* <Route path="/order-form" element={<OrderForm />} /> */}
        {/* 여기에 추가적인 라우트들을 정의할 수 있습니다 */}
      </Routes>
    </Router>
  );
};

export default App;
