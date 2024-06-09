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
import { Button, Container, Typography } from '@mui/material'
import ButtonCreate from '@mui/icons-material/AddCircle'
import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop'
import DoneIcon from '@mui/icons-material/Done'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const columns = [
  // { id: 'id', label: 'ID', minWidth: 100, align: 'center' },
  { id: 'id', label: 'ID', minWidth: 50, align: 'center' },
  { id: 'staff', label: 'Nhân viên', minWidth: 130, align: 'center' },
  { id: 'supplier', label: 'Nhà cung cấp', minWidth: 210, align: 'center' },
  { id: 'date', label: 'Ngày tạo', minWidth: 120, align: 'center' },
  { id: 'total-amount', label: 'Tổng tiền', minWidth: 120, align: 'center' },
  { id: 'note', label: 'Ghi chú', minWidth: 180, align: 'center' },
  {
    id: 'status',
    label: 'Trạng thái',
    minWidth: 160,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'update',
    label: 'Chức năng',
    minWidth: 170,
    align: 'center',
    format: (value) => value.toFixed(2),
  },
]

export default function ImportInvoiceList() {
  const API_URL = process.env.REACT_APP_API_URL

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [importInvoice, setImportInvoice] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/importInvoice/getAllImportInvoice`)
        setImportInvoice(response.data.data)

        console.log('response import invoice:', response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData().finally(() => {
      setLoading(true)
    })
  }, [])

  const handleUpdateStatus = async (id) => {
    try {
      const formData = new FormData()
      formData.append('id', id)

      const response = await axios.post(`${API_URL}/api/importInvoice/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success('Cập nhật trạng thái hoá đơn thành công', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (error) {
      console.error(error)
      toast.error('Lỗi khi cập nhật trạng thái', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    }
  }

  // const onChangeSearchWareHouse = async (param) => {
  //   try {
  //     const response = await axios.get(
  //       `${API_URL}/api/warehouseDetails/allWareHouseDetailByID?id=${param}`,
  //     )

  //     console.log('search data:', response.data.data)
  //     setWareHouseDetail(response.data.data)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   } finally {
  //     setLoading(true)
  //   }
  // }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleAddImportInvoice = () => {
    navigate('add')
  }

  function formatDate(dateString) {
    const dateParts = dateString.split(' ')[0].split('-')
    const day = dateParts[2]
    const month = dateParts[1]
    const year = dateParts[0]

    return `${day}/${month}/${year}`
  }

  const formatNumber = (number) => {
    var nf = new Intl.NumberFormat()
    return nf.format(number)
  }

  const handlePrintInvoice = (id) => {
    const invoice = importInvoice.find((invoice) => invoice.id === id)

    const invoiceDetailsRows = invoice.import_invoice_details
      .map(
        (detail, index) => `
      <tr>
       <td>${index + 1}</td>
      <td>${detail.product_variant.VARRIANNAME}</td>
      <td>${detail.quantity}</td>
      <td>${formatNumber(detail.price)} VNĐ</td>
      </tr>
    `,
      )
      .join('')

    const printContents = `
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          text-align: center;
          font-size: 24px;
        }
        p {
          font-size: 18px;
          margin: 5px 0;
        }
        .invoice-container {
          border: 1px solid #ccc;
          padding: 20px;
          border-radius: 10px;
        }
        .invoice-container div {
          margin-bottom: 10px;
        }
        .invoice-header, .invoice-footer {
          text-align: center;
          margin-bottom: 20px;
        }
        .header-title {
          text-align: center;
          font-size: 32px;
          font-weight: bold;
          color: red;
          margin-bottom: 20px;
        }
        .info-row {
          display: flex;
          justify-content: space-between;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        table, th, td {
          border: 1px solid black;
        }
        th, td {
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
      <div class="invoice-container">
        <div class="header-title">
          CLICKBUY
        </div>
        <div class="invoice-header">
          <h1>Mã hoá đơn: ${invoice.id}</h1>
        </div>
        <div>
          <div class="info-row">
            <p>Nhân viên: ${invoice.staff}</p>
            <p>Nhà cung cấp: ${invoice.supplier.name}</p>
          </div>
          <div class="info-row">
            <p>Ngày nhập: ${formatDate(invoice.date_create)}</p>
            <p>Số tiền: ${formatNumber(invoice.total_amount)} VNĐ</p>
          </div>
          <div class="info-row">
            <p>Ghi chú: ${invoice.notes || ''}</p>
            <p>Trạng thái: ${invoice.status === '1' ? 'Đã hoàn thành' : 'Đang nhập'}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên biến thể</th>
               <th>Số lượng</th>
              <th>Giá tiền</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceDetailsRows}
          </tbody>
        </table>
        <div class="invoice-footer">
          <p>Hệ thống bán hàng công nghệ uy tín hàng đầu Việt Nam</p>
        </div>
      </div>
    `
    const printWindow = window.open('', '', 'width=800,height=600')
    printWindow.document.write('<html><head><title>Print Invoice</title></head><body>')
    printWindow.document.write(printContents)
    printWindow.document.write('</body></html>')
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <Container>
      {loading ? (
        <Paper style={{ width: '100%', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Button
              onClick={handleAddImportInvoice}
              sx={{ m: 2 }}
              variant="contained"
              endIcon={<ButtonCreate />}
            >
              Thêm mới
            </Button>
            {/* <Select
              sx={{ mr: 3, mt: 2, width: '200px', height: '40px' }}
              defaultValue="all"
              displayEmpty
              onChange={(e) => onChangeSearchWareHouse(e.target.value)}
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
            </Select> */}
          </Box>

          <TableContainer style={{ maxHeight: 1000 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 0, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {importInvoice
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <Link
                        to={`/importInvoiceDetail/${row.id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <TableCell style={{ textAlign: 'center' }}>{row.id}</TableCell>
                      </Link>
                      <TableCell style={{ textAlign: 'center' }}>{row.staff}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{row.supplier.name}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {formatDate(row.date_create)}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {formatNumber(row.total_amount)} VNĐ
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{row.notes}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {row.status == 1 ? (
                          <Typography
                            style={{
                              background: 'rgb(114, 225, 40)',
                              padding: '6px',
                              borderRadius: '7px',
                              color: 'white',
                            }}
                          >
                            Đã hoàn thành
                          </Typography>
                        ) : (
                          <Typography
                            style={{
                              background: 'rgb(224, 224, 224)',
                              padding: '6px',
                              borderRadius: '7px',
                            }}
                          >
                            Đang nhập
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell style={{ textAlign: 'center' }}>
                        {row.status == 0 ? (
                          <DoneIcon onClick={() => handleUpdateStatus(row.id)} />
                        ) : null}
                        <ToastContainer />
                        <LocalPrintshopIcon
                          onClick={() => handlePrintInvoice(row.id)}
                          style={{ marginLeft: '10px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={importInvoice.length}
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
                      style={{ top: 0, minWidth: column.minWidth }}
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
