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
import { format } from 'date-fns'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'

const columns = [
  { id: 'id', label: 'ID đơn hàng', minWidth: 30, align: 'center' },
  { id: 'name', label: 'Tên khách hàng', minWidth: 150, align: 'center' },
  { id: 'phone', label: 'SĐT', minWidth: 100, align: 'center' },
  { id: 'date-buy', label: 'Ngày mua', minWidth: 110, align: 'center' },
  { id: 'status', label: 'Trạng thái', minWidth: 130, align: 'center' },
  { id: 'note', label: 'Ghi chú', minWidth: 100, align: 'center' },
  { id: 'update', label: 'Cập nhật trạng thái', minWidth: 120, align: 'center' },
]

export default function OrderList() {
  const API_URL = process.env.REACT_APP_API_URL
  const navigate = useNavigate()

  const [order, setOrder] = useState([])
  const [orderDetail, setOrderDetail] = useState({})
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/order/getAll`)
        setOrder(response.data.data)
        console.log('response customer:', response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData().finally(() => {
      setLoading(true)
    })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClick = async ($id) => {
    try {
      const response = await axios.get(`${API_URL}/api/order/detail?id=${$id}`)
      setOrderDetail(response.data.data)
      console.log('data detail order: ', response.data.data)
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết đơn hàng:', error)
    }
  }

  return (
    <Container>
      {loading ? (
        <Paper style={{ width: '100%', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              style={{ margin: '20px', fontSize: '24px', fontWeight: 'bold', color: '#3f51b5' }}
            >
              DANH SÁCH ĐƠN HÀNG
            </Typography>
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
                {order.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.OrderID}>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.OrderID}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.customer.CustomerName}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.customer.CustomerPhone}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {format(new Date(row.created_at), 'dd/MM/yyyy HH:mm:ss')}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.order_status.OrderStatusName}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      {row.note}
                    </TableCell>
                    <TableCell style={{ textAlign: 'center', backgroundColor: '#e0f7fa' }}>
                      <Link style={{ marginRight: '10px' }} to={`/order/update/${row.OrderID}`}>
                        <EditIcon />
                      </Link>

                      <LocalPrintshopIcon onClick={() => handleClick(row.OrderID)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={order.length}
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
