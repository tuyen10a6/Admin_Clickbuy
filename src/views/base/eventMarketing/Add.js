import React, { useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddEventMarketing = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')
  const [campaignType, setCampaignType] = useState('')
  const [date, setDate] = useState('')
  const [expectedRevenue, setExpectedRevenue] = useState('')
  const [status, setStatus] = useState('1')
  const [id, setId] = useState('')

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  const onChangeExpectedRevenue = (event) => {
    event.preventDefault()
    setExpectedRevenue(event.target.value)
  }
  const onChangeName = (event) => {
    event.preventDefault()
    setName(event.target.value)
    console.log(event.target.value)
  }

  const onChangePurpose = (event) => {
    event.preventDefault()
    setPurpose(event.target.value)
    console.log(event.target.value)
  }

  const onChangeCampaignType = (event) => {
    event.preventDefault()
    setCampaignType(event.target.value)
    console.log(event.target.value)
  }

  const onChangeDate = (event) => {
    event.preventDefault()
    setDate(event.target.value)
    console.log('date event:', event.target.value)
  }

  const onChangeStatus = (event) => {
    event.preventDefault()
    setStatus(event.target.value)
  }

  const onChangeID = (event) => {
    event.preventDefault()
    setId(event.target.value)
    console.log(event.target.value)
  }

  const formData = new FormData()

  formData.append('id', id)
  formData.append('name', name)
  formData.append('campaign_type', campaignType)
  formData.append('date_end', date)
  formData.append('expected_revenue', expectedRevenue)
  formData.append('purpose', purpose)
  formData.append('status', status)
  const handleAddEventMarketing = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/eventMarketing/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      toast.success('Thêm chiến dịch thành công', {
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
        navigate('/eventMarketing')
      }, 2200)
    } catch (error) {
      toast.error('Vui lòng nhập đầy đủ dữ liệu', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
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
                Tạo thêm chiến dịch
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeID}
            id="id"
            label="ID chiến dịch"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeName}
            id="campaign"
            label="Tên chiến dịch"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangePurpose}
            id="purpose"
            label="Mục đích"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeCampaignType}
            id="campaign-type"
            label="Loại chiến dịch"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeDate}
            id="date-end"
            type="date"
            variant="outlined"
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeExpectedRevenue}
            id="expected-revenue"
            type="number"
            label="Doanh thu dự kiến"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Trạng thái</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeStatus} id="uncontrolled-native">
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
          <Button onClick={handleAddEventMarketing} variant="contained" color="primary">
            Lưu
          </Button>
          <ToastContainer />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddEventMarketing
