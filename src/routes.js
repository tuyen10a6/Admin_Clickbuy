import { Update } from '@mui/icons-material'
import { element } from 'prop-types'
import React from 'react'
import { Navigate } from 'react-router-dom'

const token = localStorage.getItem('token')

const isAuthenticated = token ? true : false

const Dashboard = isAuthenticated
  ? React.lazy(() => import('./views/dashboard/Dashboard'))
  : () => <Navigate to="/" />

const Product = isAuthenticated
  ? React.lazy(() => import('./views/base/product/ProductList'))
  : () => <Navigate to="/" />

const Category = isAuthenticated
  ? React.lazy(() => import('./views/base/category/CategoryList'))
  : () => <Navigate to="/" />

const Brand = isAuthenticated
  ? React.lazy(() => import('./views/base/brand/BrandList'))
  : () => <Navigate to="/" />

const AddWareHouse = isAuthenticated
  ? React.lazy(() => import('./views/base/warehouse/Add'))
  : () => <Navigate to="/" />

const WareHouse = isAuthenticated
  ? React.lazy(() => import('./views/base/warehouse/WareHouseList'))
  : () => <Navigate to="/" />

const Supplier = isAuthenticated
  ? React.lazy(() => import('./views/base/supplier/SupplierList'))
  : () => <Navigate to="/" />

const AddSupplier = isAuthenticated
  ? React.lazy(() => import('./views/base/supplier/SupplierAdd'))
  : () => <Navigate to="/" />

const SupplierUpdate = isAuthenticated
  ? React.lazy(() => import('./views/base/supplier/SupplierUpdate'))
  : () => <Navigate to="/" />

const WareHouseUpdate = isAuthenticated
  ? React.lazy(() => import('./views/base/warehouse/Update'))
  : () => <Navigate to="/" />

const WareHouseDetails = isAuthenticated
  ? React.lazy(() => import('./views/base/wareHouseDetails/WareHouseDetailsList'))
  : () => <Navigate to="/" />

const WareHouseDetailsAdd = isAuthenticated
  ? React.lazy(() => import('./views/base/wareHouseDetails/Add'))
  : () => <Navigate to="/" />

const WareHouseDetailsUpdate = isAuthenticated
  ? React.lazy(() => import('./views/base/wareHouseDetails/Update'))
  : () => <Navigate to="/" />

const UpdateBrand = isAuthenticated
  ? React.lazy(() => import('./views/base/brand/UpdateBrand'))
  : () => <Navigate to="/" />

const AddProduct = isAuthenticated
  ? React.lazy(() => import('./views/base/product/Addproduct'))
  : () => <Navigate to="/" />

const AddCategory = isAuthenticated
  ? React.lazy(() => import('./views/base/category/AddCategory'))
  : () => <Navigate to="/" />

const UpdateProduct = isAuthenticated
  ? React.lazy(() => import('./views/base/product/UpdateProduct'))
  : () => <Navigate to="/" />

const UpdateCategory = isAuthenticated
  ? React.lazy(() => import('./views/base/category/UpdateCategory'))
  : () => <Navigate to="/" />

const ProductVariant = React.lazy(() => import('./views/base/variant/Variants'))

const ProductVariantUpdate = React.lazy(() => import('./views/base/variant/Update'))

const ProductVariantAdd = isAuthenticated
  ? React.lazy(() => import('./views/base/variant/Add'))
  : () => <Navigate to="/" />

//Forms
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/product', name: 'Product', element: Product },
  { path: '/product/add', name: 'Product', element: AddProduct },
  { path: '/product/update/:id', name: 'Product', element: UpdateProduct },
  { path: '/product/variant/:id', name: 'ProductVariant', element: ProductVariant },
  { path: 'product/variant/update/:id', name: 'ProductVariant', element: ProductVariantUpdate },
  { path: 'product/variant/add/:id', name: 'ProductVariant', element: ProductVariantAdd },
  { path: '/category', name: 'Category', element: Category },
  { path: '/category/add', name: 'Category', element: AddCategory },
  { path: '/category/update/:id', name: 'Category', element: UpdateCategory },
  { path: '/brand', name: 'Brand', element: Brand },
  { path: '/brand/update/:id', name: 'Brand', element: UpdateBrand },
  { path: '/warehouse', name: 'WareHouse', element: WareHouse },
  { path: '/warehouse/add', name: 'WareHouse', element: AddWareHouse },
  { path: '/warehouse/update/:id', name: 'WareHouse', element: WareHouseUpdate },
  { path: '/warehouseDetails', name: 'WareHouseDetails', element: WareHouseDetails },
  { path: '/warehouseDetails/add', name: 'WareHouseDetails', element: WareHouseDetailsAdd },
  { path: '/warehouseDetail/update/:id', name: 'WareHouseDetail', element: WareHouseDetailsUpdate },
  { path: '/supplier', name: 'Supplier', element: Supplier },
  { path: '/supplier/add', name: 'Supplier', element: AddSupplier },
  { path: '/supplier/update/:id', name: 'Supplier', element: SupplierUpdate },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
]

export default routes
