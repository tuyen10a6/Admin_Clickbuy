import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import imageDefault from './../../../../src/assets/images/default-product-img.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const UpdateProduct = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const [categories, setcategories] = useState([])
  const [brand, setBrand] = useState([])
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [brandChange, setBrandChange] = useState('')
  const [description, setDescription] = useState('')
  const [editorData, setEditorData] = useState('')
  const [product, setProduct] = useState({
    ProductName: '',
    CategoryID: '',
    BrandID: '',
    Description: '',
    DetailProduct: '',
  })

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    console.log('data:', data)
    setEditorData(data)
  }

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const URL_APP = process.env.REACT_APP_API_IMAGE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/getProductByID?id=${id}`)
        console.log(response.data.data)
        setProduct(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/brand/getAll`)
        setBrand(response.data.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/category/getAll`)
        setcategories(response.data.response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const onChangeImage = (event) => {
    const file = event.target.files[0]
    setImageData(file)
    console.log(file)
    const reader = new FileReader()

    reader.onloadend = () => {
      setImage(reader.result)
    }
    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const onChangeProductName = (event) => {
    event.preventDefault()
    setProduct({
      ...product,
      ProductName: event.target.value,
    })
    console.log(event.target.value)
  }

  const handleSelectCategory = (event) => {
    setProduct({
      ...product,
      CategoryID: event.target.value,
    })
    console.log(event.target.value)
  }

  const handleDescription = (event) => {
    setProduct({
      ...product,
      Description: event.target.value,
    })
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('ProductName', name)
  formData.append('image', imageData)
  formData.append('CategoryID', category)
  formData.append('BrandID', brandChange)
  formData.append('Description', description)
  formData.append('DetailProduct', editorData)

  const handleChangeBrand = (event) => {
    setProduct({
      ...product,
      BrandID: event.target.value,
    })

    console.log(event.target.value)
  }

  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData()
          loader.file.then((file) => {
            body.append('image', file)
            axios
              .post(`${API_URL}/api/uploads`, body)
              .then((res) => {
                console.log('datas:', res.data.url)
                resolve({ default: `${URL_APP}${res.data.url}` })
              })
              .catch((err) => {
                reject(err)
              })
          })
        })
      },
    }
  }

  function uploadPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return uploadAdapter(loader)
    }
  }

  return (
    <Grid
      style={{
        background: '#fff',
        borderRadius: '10px',
        padding: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
      container
    >
      <Grid container>
        <Grid item xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Cập nhật đơn hàng
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeProductName}
            id="productName"
            variant="outlined"
            fullWidth
            value={product.ProductName}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography sx={{ marginTop: '-5px' }} htmlFor="uncontrolled-native">
            Danh mục
          </Typography>
          <FormControl fullWidth>
            <NativeSelect
              onChange={handleSelectCategory}
              id="uncontrolled-native"
              value={product.CategoryID}
            >
              <option disabled>Chọn danh mục</option>
              {categories.map((item) =>
                item.CategoryID ? (
                  <option key={item.CategoryID} value={item.CategoryID}>
                    {item.CategoryName}
                  </option>
                ) : null,
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={3} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField type="file" id="image" onChange={onChangeImage} />
        </Grid>
        <Grid item xs={3} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          {image ? (
            <img style={{ borderRadius: '8px' }} width="120px" src={image} />
          ) : (
            <img width="120px" src={`${URL_APP}${product.ImageURL}`} />
          )}
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Nhãn hiệu</Typography>
          <FormControl fullWidth>
            <NativeSelect
              value={product.BrandID}
              onChange={handleChangeBrand}
              id="uncontrolled-native"
            >
              <option selected disabled>
                Chọn nhãn hiệu
              </option>
              {brand.map((item) =>
                item.BrandID ? (
                  <option key={item.BrandID} value={item.BrandID}>
                    {item.BrandName}
                  </option>
                ) : null,
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={handleDescription}
            id="note"
            placeholder="Ghi chú"
            variant="outlined"
            fullWidth
            value={product.Description}
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <CKEditor
            config={{
              extraPlugins: [uploadPlugin],
            }}
            editor={ClassicEditor}
            data={product.DetailProduct ? product.DetailProduct : null}
            onChange={handleEditorChange}
          />
          {/* <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 0 } }}>
            <Typography sx={{ mt: 3 }}>Nội dung chi tiết hiển thị:</Typography>
            <div dangerouslySetInnerHTML={{ __html: editorData }} />
          </Grid> */}
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button variant="contained" color="primary">
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UpdateProduct
