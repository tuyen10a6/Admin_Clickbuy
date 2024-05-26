import React, { useEffect, useState } from 'react'
import { Box, Typography, Grid, TextField, Button } from '@mui/material'
import { NativeSelect } from '@mui/material'
import { FormControl } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddImportInvoice = () => {
  const navigate = useNavigate()

  const [id, setId] = useState('')
  const [staff, setStaff] = useState('')
  const [supplier, setSupplier] = useState('')
  const [note, setNote] = useState('')
  const [listSupplier, setListSupplier] = useState([])

  const token = localStorage.getItem('token')
  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/supplier/getAll`)
        setListSupplier(response.data.data)
        console.log('response supplier list: ', response.data)
      } catch (error) {
        console.error('response supplier data:', error)
      }
    }
    fetchData()
  })

  const onChangeStaffName = (event) => {
    event.preventDefault()
    setStaff(event.target.value)
    console.log(event.target.value)
  }

  const onChangeSupplier = (event) => {
    event.preventDefault()
    setSupplier(event.target.value)
    console.log(event.target.value)
  }

  const onChangeNote = (event) => {
    event.preventDefault()
    setNote(event.target.value)
    console.log(event.target.value)
  }

  function layNgayGioHienTai() {
    const ngayHienTai = new Date()
    const nam = ngayHienTai.getFullYear()
    const thang = String(ngayHienTai.getMonth() + 1).padStart(2, '0') // Tháng tính từ 0
    const ngay = String(ngayHienTai.getDate()).padStart(2, '0')
    const gio = String(ngayHienTai.getHours()).padStart(2, '0')
    const phut = String(ngayHienTai.getMinutes()).padStart(2, '0')
    const giay = String(ngayHienTai.getSeconds()).padStart(2, '0')

    return `${nam}-${thang}-${ngay} ${gio}:${phut}:${giay}`
  }

  const ngayGioDinhDang = layNgayGioHienTai()

  const formData = new FormData()

  formData.append('id', Date.now())
  formData.append('staff', staff)
  formData.append('supplier_id', supplier)
  formData.append('date_create', ngayGioDinhDang)
  formData.append('notes', note)
  formData.append('status', 0)
  const handleAllImportInvoice = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/importInvoice/store`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      alert('Thêm hoá đơn nhập thành công!')
      navigate('/importInvoice')
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
                Tạo hoá đơn nhập
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        {/* <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChnageImportInvoiceID}
            id="id"
            label="Mã hoá đơn"
            variant="outlined"
            fullWidth
          />
        </Grid> */}
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField
            onChange={onChangeStaffName}
            id="staff"
            label="Tên nhân viên"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Typography htmlFor="uncontrolled-native">Nhà cung cấp</Typography>
          <FormControl fullWidth>
            <NativeSelect onChange={onChangeSupplier} id="uncontrolled-native">
              <option selected disabled>
                Chọn nhà cung cấp
              </option>
              {listSupplier.map((item) =>
                item.id ? (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ) : null,
              )}
            </NativeSelect>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container sx={{ width: '100%', mb: 5, pr: { lg: 0, xs: 4 } }}>
        <Grid item xs={6} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <TextField onChange={onChangeNote} id="note" label="Note" variant="outlined" fullWidth />
        </Grid>
      </Grid>

      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} sx={{ px: 4, my: { lg: 0, xs: 4 } }}>
          <Button onClick={handleAllImportInvoice} variant="contained" color="primary">
            Lưu
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddImportInvoice
