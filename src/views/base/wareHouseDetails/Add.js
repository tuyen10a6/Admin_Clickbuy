import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, Button, Select, MenuItem } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddWareHouseDetails = () => {
  const navigate = useNavigate()

  const [wareHouse, setWareHouse] = useState([])
  const [variant, setVariant] = useState([])
  const [dataVariant, setDataVariant] = useState('')
  const [dataWareHouse, setDataWareHouse] = useState('')
  const [status, setStatus] = useState('1')

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/warehouse/getAllWareHouse`)
        setWareHouse(response.data.data)
        console.log('data wareHouse:', response.data.data)
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
        console.log('data variant:', response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const onChangeWareHouse = (event) => {
    event.preventDefault()
    setDataWareHouse(event.target.value)
    console.log(event.target.value)
  }

  const onChangeVariant = (event) => {
    event.preventDefault()
    setDataVariant(event.target.value)
  }

  const onChangeWareHouseDetailStatus = (event) => {
    event.preventDefault()
    setStatus(event.target.value)
  }

  const formData = new FormData()

  formData.append('warehouse_id', dataWareHouse)
  formData.append('variant_id', dataVariant)
  formData.append('status', status)
  const handleAddWareHouse = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/wareHouseDetails/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Thêm chi tiết kho thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setTimeout(() => {
        navigate('/warehouseDetails')
      }, 2200)
    } catch (error) {
      toast.error('Sản phẩm này đã có trong kho! Vui lòng check lại kho', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
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
      {}
      <Grid container>
        <Grid item xs={12} sx={{ mb: { xl: 0, xs: 4 } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                Thêm chi tiết kho hàng
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Select
          sx={{ mr: 3, ml: 3, mt: 2, width: '550px', height: '40px' }}
          defaultValue="all"
          displayEmpty
          onChange={onChangeWareHouse}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem selected value="all">
            <em>Tất cả</em>
          </MenuItem>
          {wareHouse.map((item, i) => (
            <MenuItem key={item.id} value={item.id}>
              {item.ten_kho}
            </MenuItem>
          ))}
        </Select>
        <Select
          sx={{ mr: 3, ml: 3, mt: 2, width: '550px', height: '40px' }}
          defaultValue="all"
          displayEmpty
          onChange={onChangeVariant}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem selected value="all">
            <em>Tất cả</em>
          </MenuItem>
          {variant.map((item, i) => (
            <MenuItem key={item.VARRIANTID} value={item.VARRIANTID}>
              {item.VARRIANNAME}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Trạng thái</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeWareHouseDetailStatus} id="uncontrolled-native">
              <option value="1" selected>
                Hoạt động
              </option>
              <option value="0">Không hoạt động</option>
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleAddWareHouse} variant="contained" color="primary">
            Lưu
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddWareHouseDetails
