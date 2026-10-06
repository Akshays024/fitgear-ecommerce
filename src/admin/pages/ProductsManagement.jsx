import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, addProduct, deleteProduct, updateProduct } from '../services/adminProductService'
import DataTable from '../components/DataTable'
import Pagination from '../components/Pagination'


const ProductsManagement = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.adminProducts.products)

  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [brand, setBrand] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [stock, setStock] = useState("")
  const [editId, setEditId] = useState(null)
  const [sort,setSort] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1)
  const productPerPage = 4
  const totalProducts = products.length
  const totalPages = Math.ceil(totalProducts / productPerPage) || 1
  const startIndex = (currentPage - 1) * productPerPage
  const sortedProducts = [...products].sort((a,b)=>{
    if(sort === "newest"){
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    if(sort === "oldest"){
      return new Date(a.createdAt) - new Date(b.createdAt)
    }
    if(sort === "price-low"){
      return a.price - b.price
    }
    if(sort === "price-high"){
      return b.price - a.price
    }
    return 0
  })
  const currentProduct = sortedProducts.slice(startIndex, startIndex + productPerPage)

  const columns = [
    {
      header: "Product",
      accessor: "title"
    },
    {
      header: "Category",
      accessor: "category"
    },
    {
      header: "Price",
      accessor: "price"
    },
    {
      header: "Stock",
      accessor: "stock"
    },
    {
      header: "Actions",
      render: (product) => {
        return (
          
          <div className='flex gap-5'>
            
          <button onClick={()=>{
             handleEditProduct(product)
          }} className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 text-xs font-medium">Edit</button>

          <button onClick={()=>{
            dispatch(deleteProduct(product.id))
          }} className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 text-xs font-medium">Delete</button>
          </div>
    
        )
      }
    }
  ]
  useEffect(() => {
    dispatch(getAllProducts())
  }, [dispatch])

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  function handleAddProduct(e) {
    e.preventDefault()
    const productData = { title, price, category, brand, image, description, stock }

    if (editId !== null) {
      dispatch(updateProduct({ id: editId, updatedProduct: productData }))
    } else {
      dispatch(addProduct({ ...productData, rating: 0, createdAt: new Date().toISOString() }))
    }
    resetForm()
  }

  function handleEditProduct(product) {
    setEditId(product.id)
    setTitle(product.title)
    setCategory(product.category)
    setDescription(product.description)
    setImage(product.image)
    setPrice(product.price)
    setStock(product.stock)
    setBrand(product.brand)
    setShowForm(true)
  }

  function resetForm() {
    setTitle("")
    setPrice("")
    setCategory("")
    setBrand("")
    setImage("")
    setDescription("")
    setStock("")
    setEditId(null)
    setShowForm(false)
  }

  return (
    <div className="p-4 sm:p-6 max-w-[1200px] mx-auto">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Product Management</h1>

        <select value={sort} onChange={(e)=>{
          setSort(e.target.value)
          setCurrentPage(1)
        }} className='rounded-lg border border-gray-300 px-3 py-2 text-sm'>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price:High to Low</option>
        </select>

        <button
          className="w-full sm:w-auto rounded bg-green-500 px-4 py-2 text-white text-sm hover:bg-green-600 transition font-medium"
          onClick={() => {
            if (showForm) resetForm()
            else setShowForm(true)
          }}
        >
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 text-left shadow-md">
          <h4 className="mb-4 text-base font-bold text-gray-800">
            {editId === null ? "Add New Product" : "Edit Product"}
          </h4>
          <form onSubmit={handleAddProduct} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Product Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
              />
              <input
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
              />
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
              />
            </div>

            <textarea
              rows={2}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
              >
                {editId === null ? "Add Product" : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="block md:hidden space-y-3">
        {currentProduct.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-sm text-gray-800">{product.title}</h3>
              <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 rounded text-gray-600">{product.category}</span>
            </div>

            <div className="flex justify-between text-xs text-gray-600 pt-1">
              <span>Price: <strong className="text-gray-900">₹{product.price}</strong></span>
              <span>Stock: <strong className="text-gray-900">{product.stock}</strong></span>
            </div>

            <div className="flex gap-2 pt-2 border-t border-gray-100 justify-end">
              <button
                className="rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                onClick={() => handleEditProduct(product)}
              >
                Edit
              </button>
              <button
                className="rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600"
                onClick={() => dispatch(deleteProduct(product.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <DataTable 
        data={currentProduct}
        columns={columns} />
      </div>

      {totalPages > 1 && (
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default ProductsManagement