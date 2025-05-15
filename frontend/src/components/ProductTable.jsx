import React, { useState, useEffect } from "react";
import { Table, Button, Container } from "react-bootstrap";
import ProductService from "../services/ProductServices";
import DeleteConfirmation from "./DeleteConfirmation";
import ProductForm from "./ProductForm";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            }
        };

        fetchProducts();
    }, [refresh]);

    const handleAddClick = () => {
        setSelectedProduct(null);
        setShowForm(true);
    };

    const handleUpdateClick = (product) => {
        setSelectedProduct(product);
        setShowForm(true);
    };

    const handleDeleteClick = (productId) => {
        setProductToDelete(productId);
        setShowDeleteModal(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Productos</h2>
                <Button variant="primary" onClick={handleAddClick}>
                Agregar Producto
                </Button>
            </div>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                        <Button 
                        variant="info" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleUpdateClick(product)}
                        >
                        Actualizar
                        </Button>
                        <Button 
                        variant="danger" 
                        size="sm"
                        onClick={() => handleDeleteClick(product.id)}
                        >
                        Eliminar
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <ProductForm 
                show={showForm} 
                handleClose={handleCloseForm} 
                product={selectedProduct}
                setRefresh={setRefresh}
            />

            <DeleteConfirmation 
                show={showDeleteModal} 
                handleClose={handleCloseDeleteModal} 
                productId={productToDelete}
                setRefresh={setRefresh}
            />
        </Container>
    );

};

export default ProductTable;