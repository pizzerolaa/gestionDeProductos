import React from 'react';
import { Container } from 'react-bootstrap';
import ProductTable from '../components/ProductTable';

const Home = () => {
  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Gestión de Productos</h1>
      <ProductTable />
    </Container>
  );
};

export default Home;