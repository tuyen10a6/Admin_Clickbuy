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

const AddProduct = isAuthenticated
  ? React.lazy(() => import('./views/base/product/Addproduct'))
  : () => <Navigate to="/" />

const UpdateProduct = isAuthenticated
  ? React.lazy(() => import('./views/base/product/UpdateProduct'))
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
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
]

export default routes
