import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button, InputLabel } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import imageDefault from './../../../../src/assets/images/default-product-img.jpg'
import { useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const AddProductVariant = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState('')
  const [name, setName] = useState('')
  const [color, setColor] = useState('Black')
  const [capacity, setCapacity] = useState('64GB')
  const [price, setPrice] = useState('')

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

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

  const onChangeVariantName = (event) => {
    event.preventDefault()
    setName(event.target.value)
    console.log(event.target.value)
  }

  const onChangeColorVariant = (event) => {
    event.preventDefault()
    setColor(event.target.value)
    console.log(event.target.value)
  }

  const onChangeCapacityVariant = (event) => {
    event.preventDefault()
    setCapacity(event.target.value)
    console.log(event.target.value)
  }

  const onChangePriceVariant = (event) => {
    event.preventDefault()
    setPrice(event.target.value)
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('VARRIANNAME', name)
  formData.append('image', imageData)
  formData.append('ProductID', id)
  formData.append('COLOR', color)
  formData.append('Capacity', capacity)
  formData.append('PRICE', price)
  formData.append('ProductVariantSL', 0)
  const handleAddProduct = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/variant/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Thêm dữ liệu thành công!')
      navigate(`/product/variant/${id}`)
    } catch (error) {
      console.log(error)
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
                Thêm biến thể sản phẩm
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeVariantName}
            id="productName"
            label="Tên biến thể"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Màu sắc
            </InputLabel>
            <NativeSelect
              onChange={onChangeColorVariant}
              inputProps={{
                name: 'Màu sắc',
                id: 'uncontrolled-native',
              }}
            >
              <option value="Black">Đen (Black)</option>
              <option value="White">Trắng (White)</option>
              <option value="Pink">Hồng (Pink)</option>
              <option value="Space Gray">Space Gray</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
              <option value="Midnight Green">Midnight Green</option>
              <option value="Blue">Xanh (Blue)</option>
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
            <img width="120px" src={imageDefault} />
          )}
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Dung lượng
            </InputLabel>
            <NativeSelect
              onChange={onChangeCapacityVariant}
              inputProps={{
                name: 'Dung lượng',
                id: 'uncontrolled-native',
              }}
            >
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangePriceVariant}
            id="variantName"
            label="Giá tiền"
            type="number"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleAddProduct} variant="contained" color="primary">
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddProductVariant
