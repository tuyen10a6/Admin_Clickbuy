import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { Button, Container, Typography, Box, CircularProgress, TextField } from '@mui/material'
import ButtonCreate from '@mui/icons-material/AddCircle'
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'

const columns = [
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'name', label: 'Tên khách hàng', minWidth: 180, align: 'center' },
  { id: 'address', label: 'Địa chỉ', minWidth: 210, align: 'center' },
  { id: 'phone', label: 'SĐT', minWidth: 120, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 120, align: 'center' },
]

export default function CustomerList() {
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()

  const [customer, setCustomer] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/customer/getAll`)
        setCustomer(response.data.data)
        console.log('response customer:', response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData().finally(() => {
      setLoading(true)
    })
  }, [])

  const handleSearchChange = async (event) => {
    const value = event.target.value
    setSearchKey(value)
    if (value) {
      try {
        const response = await axios.get(`${API_URL}/api/customer/search?key=${value}`)
        setCustomer(response.data.data)
      } catch (error) {
        console.error('Error fetching search data:', error)
      }
    } else {
      try {
        const response = await axios.get(`${API_URL}/api/customer/getAll`)
        setCustomer(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Container>
      {loading ? (
        <Paper style={{ width: '100%', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              style={{ margin: '20px', fontSize: '24px', fontWeight: 'bold', color: '#3f51b5' }}
            >
              DANH SÁCH KHÁCH HÀNG
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Tìm kiếm khách hàng"
              value={searchKey}
              onChange={handleSearchChange}
              style={{ marginRight: '20px', height: '50px', padding: '0px !important' }}
            />
          </Box>
          <TableContainer style={{ maxHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        top: 0,
                        minWidth: column.minWidth,
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {customer.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.CustomerID}>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.CustomerID}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.CustomerName}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.CustomerPhone}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.CustomerAddress}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.CustomerEmail}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={customer.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Paper>
          <Box>
            <Button sx={{ m: 2 }} variant="contained" endIcon={<ButtonCreate />}>
              Thêm mới
            </Button>
          </Box>
          <TableContainer style={{ minHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{
                        top: 0,
                        minWidth: column.minWidth,
                        backgroundColor: '#f5f5f5',
                        fontWeight: 'bold',
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress size={60} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Container>
  )
}
