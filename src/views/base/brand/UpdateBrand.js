import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

const UpdateBrand = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [brand, setBrand] = useState({
    BrandName: '',
    Country: '',
    Website: '',
    ContactPhone: '',
  })

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const URL_APP = process.env.REACT_APP_API_IMAGE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/brand/getBrandByID?id=${id}`)
        console.log(response.data.data)
        setBrand(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const onChangeBrandName = (event) => {
    event.preventDefault()
    setBrand({
      ...brand,
      BrandName: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeCountry = (event) => {
    event.preventDefault()
    setBrand({
      ...brand,
      Country: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeWebsite = (event) => {
    event.preventDefault()
    setBrand({
      ...brand,
      Website: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeContactPhone = (event) => {
    event.preventDefault()
    setBrand({
      ...brand,
      ContactPhone: event.target.value,
    })
  }

  const formData = new FormData()

  formData.append('id', id)
  formData.append('BrandName', brand.BrandName)
  formData.append('Country', brand.Country)
  formData.append('Website', brand.Website)
  formData.append('ContactPhone', brand.ContactPhone)

  const handleUpdateBrand = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/brand/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Cập nhật dữ liệu thành công')
      navigate(`/brand`)
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
                Cập nhật nhãn hiệu
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeBrandName}
            placeholder="Tên nhãn hiệu"
            id="brandName"
            variant="outlined"
            fullWidth
            value={brand.BrandName}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Địa chỉ"
            onChange={onChangeCountry}
            id="country"
            variant="outlined"
            fullWidth
            value={brand.Country}
          />
        </Grid>
      </Grid>

      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Website"
            onChange={onChangeWebsite}
            id="website"
            variant="outlined"
            fullWidth
            value={brand.Website}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            placeholder="Số điện thoại"
            onChange={onChangeContactPhone}
            id="contactPhone"
            variant="outlined"
            fullWidth
            value={brand.ContactPhone}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button
            onClick={() => handleUpdateBrand(brand.BrandID)}
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

export default UpdateBrand
