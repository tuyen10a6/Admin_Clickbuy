import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

const UpdateCategory = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState('')

  const [category, setCategory] = useState({
    CategoryName: '',
    Priority: '',
  })

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const URL_APP = process.env.REACT_APP_API_IMAGE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/getCategoryByID?id=${id}`)
        console.log(response.data.data)
        setCategory(response.data.data)
      } catch (error) {
        console.log(error)
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

  const onChangeCategoryName = (event) => {
    event.preventDefault()
    setCategory({
      ...category,
      CategoryName: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangePriority = (event) => {
    event.preventDefault()
    setCategory({
      ...category,
      Priority: event.target.value,
    })
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('CategoryID', id)
  formData.append('CategoryName', category.CategoryName)
  formData.append('image', imageData)
  formData.append('Priority', category.Priority)

  const handleUpdateCategory = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/category/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Cập nhật dữ liệu thành công')
      navigate(`/category`)
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
                Cập nhật danh mục
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeCategoryName}
            id="variantName"
            variant="outlined"
            fullWidth
            value={category.CategoryName}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography sx={{ marginTop: '-5px' }} htmlFor="uncontrolled-native">
            Độ ưu tiên
          </Typography>
          <FormControl fullWidth>
            <NativeSelect
              value={category.Priority}
              onChange={onChangePriority}
              inputProps={{
                name: 'Độ ưu tiên',
                id: 'uncontrolled-native',
              }}
            >
              <option value="1">Cao</option>
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
            <img style={{ borderRadius: '8px' }} alt="ok" width="130px" src={image} />
          ) : (
            <img width="140px" src={`${URL_APP}${category.CategoryImage}`} />
          )}
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button
            onClick={() => handleUpdateCategory(category.CategoryID)}
            variant="contained"
            color="primary"
          >
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UpdateCategory
