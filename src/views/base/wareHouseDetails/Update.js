import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button, Select, MenuItem } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'

const UpdateWareHouseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [wareHouse, setWareHouse] = useState([])
  const [variant, setVariant] = useState([])
  const [wareHouseDetail, setWareHouseDetail] = useState({
    warehouse_id: '',
    variant_id: '',
    status: '',
  })

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/warehouseDetail/getWareHouseDetailByID?id=${id}`,
        )
        console.log('wareHouse Details:', response.data.data)
        setWareHouseDetail(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouse/getAllWareHouse`)
        setWareHouse(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/variant/all`)
        setVariant(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const onChangeWareHouseName = (event) => {
    event.preventDefault()
    setWareHouseDetail({
      ...wareHouseDetail,
      warehouse_id: event.target.value,
    })
    console.log(event.target.value)
  }

  const onChangeWareHouseVariant = (event) => {
    event.preventDefault()
    setWareHouseDetail({
      ...wareHouseDetail,
      variant_id: event.target.value,
    })
  }

  const onChangeWareHouseStatus = (event) => {
    event.preventDefault()
    setWareHouseDetail({
      ...wareHouseDetail,
      status: event.target.value,
    })
  }

  const formData = new FormData()

  formData.append('id', id)
  formData.append('warehouse_id', wareHouseDetail.warehouse_id)
  formData.append('variant_id', wareHouseDetail.variant_id)
  formData.append('status', wareHouseDetail.status)

  const handleUpdateWareHouse = async (id) => {
    try {
      const response = await axios.post(`${API_URL}/api/wareHouseDetails/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Cập nhật dữ liệu thành công')
      navigate(`/warehouseDetails`)
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
                Cập nhật danh mục chi tiết kho
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Select
          sx={{ mr: 3, ml: 3, mt: 2, width: '550px', height: '40px' }}
          displayEmpty
          onChange={onChangeWareHouseName}
          inputProps={{ 'aria-label': 'Without label' }}
          value={wareHouseDetail.warehouse_id}
        >
          {wareHouse.map((item, i) => (
            <MenuItem key={item.id} value={item.id}>
              {item.ten_kho}
            </MenuItem>
          ))}
        </Select>
        <Select
          sx={{ mr: 3, ml: 3, mt: 2, width: '550px', height: '40px' }}
          displayEmpty
          onChange={onChangeWareHouseVariant}
          inputProps={{ 'aria-label': 'Without label' }}
          value={wareHouseDetail.variant_id}
        >
          {variant.map((item, i) => (
            <MenuItem key={item.VARRIANTID} value={item.VARRIANTID}>
              {item.VARRIANNAME}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <FormControl fullWidth>
            <NativeSelect
              placeholder="Trạng thái"
              value={wareHouseDetail.status}
              onChange={onChangeWareHouseStatus}
              inputProps={{
                name: 'Trạng thái',
                id: 'uncontrolled-native',
              }}
            >
              <option value="1">Hoạt động</option>
              <option value="0">Không hoạt động</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button
            onClick={() => handleUpdateWareHouse(wareHouse.id)}
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

export default UpdateWareHouseDetails
