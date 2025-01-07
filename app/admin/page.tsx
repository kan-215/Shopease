"use client";

import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext"; // Ensure the path is correct

export default function AdminPage() {
  const { products, addProduct, removeProduct, updateProduct, updateStockStatus } =
    useContext(ProductContext);

  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    category: "",
    price: 0,
    image: "",
    description: "",
    discount: 0, // Discount percentage
  });

  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Convert uploaded image to Base64
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isNew = true) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        if (isNew) {
          setNewProduct((prev) => ({ ...prev, image: base64Image }));
        } else if (selectedProduct) {
          setSelectedProduct((prev: any) => ({ ...prev, image: base64Image }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    addProduct({
      ...newProduct,
      inStock: true, // Set initial stock status to 'in stock'
    });
    setNewProduct({
      id: 0,
      name: "",
      category: "",
      price: 0,
      image: "",
      description: "",
      discount: 0,
    });
  };

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, {
        ...selectedProduct,
        price: Number(selectedProduct.price),
        discount: Number(selectedProduct.discount),
      });
      setSelectedProductId(null); // Close the edit form
      setSelectedProduct(null);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId);
  };

  const handleStockStatusToggle = (productId: number) => {
    const product = products.find((p: any) => p.id === productId);
    if (product) {
      updateStockStatus(productId, !product.inStock);
    }
  };

  const handleSelectProduct = (product: any) => {
    setSelectedProductId(product.id);
    setSelectedProduct({ ...product });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Add Product Form */}
      <div>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
        />
        <input type="file" onChange={(e) => handleImageUpload(e, true)} />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Discount (%)"
          value={newProduct.discount}
          onChange={(e) => setNewProduct({ ...newProduct, discount: Number(e.target.value) })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Product List */}
      <div className="product-list">
        {products.map((product: any) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} style={{ width: "150px" }} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: Ksh {product.price}</p>
            {product.discount && <span>{product.discount}% Off</span>}
            <p>Status: {product.inStock ? "In Stock" : "Out of Stock"}</p>
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
            <button onClick={() => handleStockStatusToggle(product.id)}>
              {product.inStock ? "Mark as Out of Stock" : "Mark as Available"}
            </button>
            <button onClick={() => handleSelectProduct(product)}>Edit</button>

            {/* Edit Product Form - Appears Below Product */}
            {selectedProductId === product.id && selectedProduct && (
              <div>
                <h4>Edit Product: {selectedProduct.name}</h4>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, name: e.target.value })
                  }
                />
                <textarea
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })
                  }
                />
                <input
                  type="number"
                  value={selectedProduct.discount}
                  onChange={(e) =>
                    setSelectedProduct({ ...selectedProduct, discount: Number(e.target.value) })
                  }
                />
                <input
                  type="file"
                  onChange={(e) => handleImageUpload(e, false)}
                />
                <input
                  type="checkbox"
                  checked={selectedProduct.inStock}
                  onChange={() =>
                    setSelectedProduct((prev: any) => ({
                      ...prev,
                      inStock: !prev.inStock,
                    }))
                  }
                />
                <button onClick={handleUpdateProduct}>Save Changes</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
