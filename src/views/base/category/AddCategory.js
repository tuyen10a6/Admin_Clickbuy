import React, { useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import imageDefault from './../../../../src/assets/images/default-product-img.jpg'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState('')
  const [name, setName] = useState('')
  const [priority, setPriority] = useState('1')

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const URL_APP = process.env.REACT_APP_API_IMAGE

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
    setName(event.target.value)
    console.log(event.target.value)
  }

  const onChangePriority = (event) => {
    event.preventDefault()
    setPriority(event.target.value)
  }

  const formData = new FormData()

  formData.append('CategoryName', name)
  formData.append('image', imageData)
  formData.append('Priority', priority)
  const handleAddCategory = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/category/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Thêm danh mục thành công!')
      navigate('/category')
    } catch (error) {
      alert('Vui lòng nhập đầy đủ dữ liệu!')
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
                Tạo danh mục
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
            label="Tên danh mục"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Độ ưu tiên</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangePriority} id="uncontrolled-native">
              <option value="1" selected>
                Cao
              </option>
              <option value="2">Trung bình</option>
              <option value="3">Thấp</option>
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
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleAddCategory} variant="contained" color="primary">
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddCategory
