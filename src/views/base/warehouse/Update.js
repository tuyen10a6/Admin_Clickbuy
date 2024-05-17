import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

const UpdateProductVariant = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [imageData, setImageData] = useState('')

  const [wareHouse, setWareHouse] = useState({
    ten_kho: '',
    ten_kho2: '',
    dia_chi: '',
    status: '',
  })

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  const URL_APP = process.env.REACT_APP_API_IMAGE
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouse/getWareHouseByID?id=${id}`)
        console.log(response.data.data)
        setWareHouse(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const onChangeWareHouseName = (event) => {
    event.preventDefault()
    setWareHouse({
      ...wareHouse,
      ten_kho: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeWareAnother = (event) => {
    event.preventDefault()
    setWareHouse({
      ...wareHouse,
      ten_kho2: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeWareHouseStatus = (event) => {
    setWareHouse({
      ...wareHouse,
      status: event.target.value,
    })
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('id', id)
  formData.append('ten_kho', wareHouse.ten_kho)
  formData.append('ten_kho2', wareHouse.ten_kho2)
  formData.append('status', wareHouse.status)

  const handleUpdateProduct = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/variant/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Cập nhật dữ liệu thành công')
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
                Cập nhật biến thể sản phẩm
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeVariantName}
            id="variantName"
            variant="outlined"
            fullWidth
            value={productVariant.VARRIANNAME}
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography sx={{ marginTop: '-5px' }} htmlFor="uncontrolled-native">
            Dung lượng
          </Typography>
          <FormControl fullWidth>
            <NativeSelect
              value={productVariant.Capacity}
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
        <Grid item xs={3} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField type="file" id="image" onChange={onChangeImage} />
        </Grid>
        <Grid item xs={3} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          {image ? (
            <img style={{ borderRadius: '8px' }} alt="ok" width="130px" src={image} />
          ) : (
            <img width="140px" src={`${URL_APP}${productVariant.ImageVariant}`} />
          )}
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Màu sắc</Typography>
          <FormControl fullWidth>
            <NativeSelect
              value={productVariant.COLOR}
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
              <option value="Natural">Titan tự nhiên (Natural)</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangePriceVariant}
            id="note"
            placeholder="Giá tiền"
            variant="outlined"
            fullWidth
            value={productVariant.PRICE}
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button
            onClick={() => handleUpdateProduct(productVariant.ProductID)}
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

export default UpdateProductVariant
