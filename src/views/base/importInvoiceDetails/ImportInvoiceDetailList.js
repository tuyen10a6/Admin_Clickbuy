import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Card from '@mui/material/Card'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import SyncAltIcon from '@mui/icons-material/SyncAlt'
import { Typography } from '@mui/material'

export default function ImportInvoiceDetail() {
  const { id } = useParams()
  const [importInvoiceDetails, setImportInvoiceDetails] = useState([])
  const API_URL = process.env.REACT_APP_API_URL
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${API_URL}/api/importInvoice/getDetails?id=${id}`).then(async (response) => {
      setImportInvoiceDetails(response.data.data)
      console.log('response data import invoice details', response.data.data)
    })
  }, [])

  const formatNumber = (number) => {
    var nf = new Intl.NumberFormat()
    return nf.format(number)
  }

  const handleAddImportInvoiceDetail = () => {
    navigate(`/importInvoiceDetail/add/${id}`)
  }
  // const handleUpdateVariant = (id) => {
  //   navigate(`/product/variant/update/${id}`)
  // }

  // const handleDelete = async (id) => {
  //   try {
  //     axios
  //       .delete(`${API_URL}/api/variant/delete?id=${id}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.status === 200) {
  //           const del = variant.filter((item) => id !== item.id)
  //           setVariant(del)
  //           alert('Xoá biến thể sản phẩm thành công')
  //           window.location.reload()
  //           console.log(res)
  //         } else {
  //           console.error('error:', res)
  //         }
  //       })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <Card>
      <Button
        onClick={handleAddImportInvoiceDetail}
        sx={{ m: '15px' }}
        variant="contained"
        endIcon={<AddCircleIcon />}
      >
        Thêm mới
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Tên biến thể</TableCell>
              <TableCell align="center">Giá tiền</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Giảm giá</TableCell>

              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {importInvoiceDetails.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell sx={{ maxWidth: '400px' }} align="center">
                  {row.product_variant.VARRIANNAME}
                </TableCell>
                <TableCell align="center"> {formatNumber(row.price)} VNĐ</TableCell>

                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center"> {formatNumber(row.discount)} VNĐ</TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  {row.status === 0 ? (
                    <Typography
                      style={{
                        background: 'rgb(114, 225, 40)',
                        padding: '6px',
                        borderRadius: '7px',
                        color: 'white',
                      }}
                    >
                      Đang xử lý
                    </Typography>
                  ) : (
                    <Typography
                      style={{
                        background: 'rgb(114, 225, 40)',
                        padding: '6px',
                        borderRadius: '7px',
                        color: 'white',
                      }}
                    >
                      Xử lý thành công
                    </Typography>
                  )}
                </TableCell>
                {/* <TableCell align="center">
                  <Button
                    onClick={() => handleUpdateVariant(row.VARRIANTID)}
                    variant="contained"
                    startIcon={<SyncAltIcon />}
                  >
                    Sửa
                  </Button>
                  <hr />
                  <Button
                    onClick={() => handleDeleteProductVariant(row.VARRIANTID)}
                    variant="contained"
                    startIcon={<DeleteOutlineIcon />}
                  >
                    Xoá
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}
