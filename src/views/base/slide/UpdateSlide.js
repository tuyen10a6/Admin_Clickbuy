import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const UpdateSlideHome = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState('')
  const [slideHome, setSlideHome] = useState({
    ImageURL: '',
    NameSlide: '',
  })

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const URL_APP = process.env.REACT_APP_API_IMAGE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/slide/getDetail?id=${id}`)
        console.log(response.data.data)
        setSlideHome(response.data.data)
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

  const onChangeSlideName = (event) => {
    event.preventDefault()
    setSlideHome({
      ...slideHome,
      NameSlide: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeURLImage = (event) => {
    setSlideHome({
      ...slideHome,
      ImageURL: event.target.value,
    })
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('id', id)
  formData.append('ImageURL', slideHome.ImageURL)
  formData.append('Image', imageData)
  formData.append('NameSlide', slideHome.NameSlide)

  const handleUpdateSlideHome = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/slide/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      alert('Cập nhật dữ liệu thành công')
      navigate('/slide')
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
                Cập nhật SLIDEHOME
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <img style={{ width: '20px' }} />
          <TextField
            onChange={onChangeSlideName}
            id="slide-name"
            placeholder="Tên Slide"
            variant="outlined"
            fullWidth
            value={slideHome.NameSlide}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <img style={{ width: '20px' }} />
          <TextField
            onChange={onChangeURLImage}
            id="slide-url"
            placeholder="Đường dẫn ảnh"
            variant="outlined"
            fullWidth
            value={slideHome.ImageURL}
          />
        </Grid>
      </Grid>

      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={3} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField type="file" id="image" onChange={onChangeImage} />
        </Grid>
        <Grid item xs={3} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          {image ? (
            <img style={{ borderRadius: '8px' }} width="280px" src={image} />
          ) : (
            <img width="280px" src={`${URL_APP}${slideHome.Image}`} />
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleUpdateSlideHome} variant="contained" color="primary">
            Cập nhật
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UpdateSlideHome
