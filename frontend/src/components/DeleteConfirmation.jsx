import React from "react";
import { Modal, Button } from "react-bootstrap";
import ProductService from "../services/ProductServices";

const DeleteConfirmation = ({ show, handleClose, productId, setRefresh }) => {
    const handleDelete = async () => {
        try {
            await ProductService.deleteProduct(productId);
            setRefresh(prev => !prev);
            handleClose();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Cancelar
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteConfirmation;