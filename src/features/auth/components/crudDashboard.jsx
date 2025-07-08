import { useState } from 'react';
import { Container, Row, Col, Button, Alert, Modal, Card, Badge } from 'react-bootstrap';
import { useProducts } from '../hooks/useCrud';
import ProductList from './productList';
import ProductForm from './productForm';
import '../../../shared/styles/crudDashboard.css';

const ProductsPage = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Manejar creación de producto
  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  // Manejar edición de producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // Manejar envío del formulario
  const handleFormSubmit = (formData) => {
    const action = editingProduct 
      ? updateProduct(editingProduct.id, formData)
      : createProduct(formData);

    action
      .then(() => {
        setShowForm(false);
        setEditingProduct(null);
        setSuccessMessage(
          editingProduct 
            ? 'Producto actualizado exitosamente' 
            : 'Producto creado exitosamente'
        );
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        console.error('Error al guardar producto:', error);
      });
  };

  // Manejar solicitud de eliminación
  const handleDeleteRequest = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  // Confirmar eliminación
  const handleDeleteConfirm = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id)
        .then(() => {
          setSuccessMessage('Producto eliminado exitosamente');
          setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch(error => {
          console.error('Error al eliminar producto:', error);
        })
        .finally(() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        });
    }
  };

  // Manejar actualización de lista
  const handleRefresh = () => {
    fetchProducts();
  };

  // Calcular estadísticas
  const totalProducts = products.length;
  const averagePrice = products.length > 0 
    ? (products.reduce((sum, product) => sum + (product.price || 0), 0) / products.length).toFixed(2)
    : 0;

  const categoryCount = products.reduce((acc, product) => {
    const categoryName = product.category?.name || 'Others';
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <Container fluid>
          <Row className="align-items-center">
            <Col>
              <h1 className="dashboard-title">
                <i className="bi bi-speedometer2 me-2"></i>
                Dashboard de Productos
              </h1>
              <p className="dashboard-subtitle">
                Gestiona y administra el catálogo completo de productos
              </p>
            </Col>
            <Col xs="auto">
              <div className="d-flex gap-2">
                <Button
                  variant="outline-secondary"
                  onClick={handleRefresh}
                  disabled={loading}
                  className="btn-dashboard"
                >
                  <i className="bi bi-arrow-clockwise me-1"></i>
                  Actualizar
                </Button>
                <Button
                  variant="primary"
                  onClick={handleCreate}
                  disabled={loading}
                  className="btn-dashboard"
                >
                  <i className="bi bi-plus-circle me-1"></i>
                  Nuevo Producto
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid className="dashboard-content">

        {/* Mensaje de éxito */}
        {successMessage && (
          <Row className="mb-3">
            <Col>
              <Alert variant="success" dismissible onClose={() => setSuccessMessage('')} className="alert-dashboard">
                <i className="bi bi-check-circle me-2"></i>
                {successMessage}
              </Alert>
            </Col>
          </Row>
        )}
        {/* Lista de productos */}
        <Row className="mt-4">
          <Col xs={12}>
            <Card className="table-card border-0 shadow-sm">
              <Card.Header className="bg-white border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <i className="bi bi-list-ul me-2"></i>
                    Lista de Productos
                  </h5>
                  <Badge bg="secondary">{totalProducts} productos</Badge>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                <ProductList
                  products={products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)}
                  loading={loading}
                  error={error}
                  onEdit={handleEdit}
                  onDelete={handleDeleteRequest}
                />
              </Card.Body>
            </Card>
            <div className="pagination-controls d-flex justify-content-center mt-3">
              <Button 
                variant="outline-primary" 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="me-2"
              >
                Anterior
              </Button>
              <span className="align-self-center">Página {currentPage} de {Math.ceil(totalProducts / itemsPerPage)}</span>
              <Button 
                variant="outline-primary" 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(totalProducts / itemsPerPage)))}
                disabled={currentPage === Math.ceil(totalProducts / itemsPerPage)}
                className="ms-2"
              >
                Siguiente
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Formulario de producto */}
      <ProductForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        onSubmit={handleFormSubmit}
        product={editingProduct}
        loading={loading}
      />

      {/* Modal de confirmación de eliminación */}
      <Modal 
        show={showDeleteModal} 
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-exclamation-triangle text-warning me-2"></i>
            Confirmar Eliminación
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro de que deseas eliminar el producto{' '}
            <strong>"{productToDelete?.title}"</strong>?
          </p>
          <p className="text-muted small">
            <i className="bi bi-info-circle me-1"></i>
            Esta acción no se puede deshacer.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowDeleteModal(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDeleteConfirm}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Eliminando...
              </>
            ) : (
              <>
                <i className="bi bi-trash me-1"></i>
                Eliminar
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductsPage;
