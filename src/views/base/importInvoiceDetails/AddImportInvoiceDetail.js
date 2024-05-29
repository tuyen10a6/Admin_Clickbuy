import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button, InputLabel } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const AddImportInvoiceDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [variant, setVariant] = useState('')
  const [wareHouse, setWareHouse] = useState('')
  const [quantity, setQuantity] = useState('')
  const [discount, setDiscount] = useState('')
  const [price, setPrice] = useState('')
  const [dataVariant, setDataVariant] = useState([])
  const [dataWareHouse, setDataWareHouse] = useState([])

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  const onChangeVariant = (event) => {
    setVariant(event.target.value)
    console.log(event.target.value)
  }

  const onChangeWareHouse = (event) => {
    setWareHouse(event.target.value)
    console.log(event.target.value)
  }

  const onChangeQuantity = (event) => {
    event.preventDefault()
    setQuantity(event.target.value)
    console.log(event.target.value)
  }

  const onChangeDiscount = (event) => {
    event.preventDefault()
    setDiscount(event.target.value)
    console.log(event.target.value)
  }

  const onChangePriceVariant = (event) => {
    event.preventDefault()
    setPrice(event.target.value)
    console.log(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/variant/all`)
        setDataVariant(response.data.data)
        console.log('response data variant', response.data.data)
      } catch (error) {}
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouse/getAllWareHouse`)
        setDataWareHouse(response.data.data)
      } catch (error) {}
    }
    fetchData()
  }, [])

  const formData = new FormData()

  formData.append('quantity', quantity)
  formData.append('import_invoice_id', id)
  formData.append('variant_id', variant)
  formData.append('discount', discount)
  formData.append('price', price)
  formData.append('warehouse_id', wareHouse)
  formData.append('status', 1)
  const handleAddImportInvoiceDetail = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/importInvoiceDetail/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Thêm dữ liệu thành công!')
      navigate(`/importInvoiceDetail/${id}`)
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
                Thêm chi tiết hoá đơn nhập
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Biến thể</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeVariant} id="uncontrolled-native">
              <option selected disabled>
                Chọn biến thể
              </option>
              {dataVariant.map((item) =>
                item.VARRIANTID ? (
                  <option key={item.VARRIANTID} value={item.VARRIANTID}>
                    {item.VARRIANNAME}
                  </option>
                ) : null,
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangePriceVariant}
            id="quantity"
            label="Giá tiền"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeQuantity}
            id="quantity"
            label="Số lượng"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeDiscount}
            id="discount"
            label="Giảm giá"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Chọn kho nhập</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeWareHouse} id="uncontrolled-native">
              <option selected disabled>
                Chọn kho nhập
              </option>
              {dataWareHouse.map((item) =>
                item.id ? (
                  <option key={item.id} value={item.id}>
                    {item.ten_kho}
                  </option>
                ) : null,
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleAddImportInvoiceDetail} variant="contained" color="primary">
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddImportInvoiceDetail
