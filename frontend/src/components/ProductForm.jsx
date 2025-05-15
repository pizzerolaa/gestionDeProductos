import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import ProductService from'../services/ProductServices';

const ProductForm = ({show, handleClose, product, setRefresh}) => {
    const [formData, setFormData] = useState({
        name: '',
        stock: 0,
        price: 0
    });

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name || '',
                stock: product.stock || 0,
                price: product.price || 0
            });
        } else {
            setFormData({
                name: '',
                stock: 0,
                price: 0
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'name' ? value : Number(value)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (product && product.id) {
            await ProductService.updateProduct(product.id, formData);
          } else {
            await ProductService.createProduct(formData);
          }
          setRefresh(prev => !prev);
          handleClose();
        } catch (error) {
          console.error('Error al guardar el producto:', error);
        }
      };
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{product ? 'Actualizar Producto' : 'Agregar Producto'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    step="0.01"
                    />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleClose} className="me-2">
                    Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                    Guardar
                    </Button>
                </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductForm;