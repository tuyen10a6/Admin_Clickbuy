import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Button, TextField, Typography } from '@mui/material'

const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const API_URL = process.env.REACT_APP_API_URL
  const handleLogin = async () => {
    axios
      .post(`${API_URL}/api/auth/login`, {
        email: userName,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem('token', response.data.access_token)

        localStorage.setItem('user', response.data.user.name)

        alert('Đăng nhập thành công')
        navigate('/Dashboard')
      })
      .catch(function (error) {
        alert('Thông tin đăng nhập không chính xác')
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={7}>
            <CCardGroup>
              <CCard className="p-6">
                <CCardBody className="justify-content-center">
                  <CForm>
                    <Typography sx={{ mb: '15px', textAlign: 'center' }} variant="h4">
                      Đăng Nhập Admin ClickBuy
                    </Typography>
                    <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '10px' }}>
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <TextField
                        type="email"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        id="filled-basic"
                        label="Username"
                        variant="standard"
                        sx={{ width: '330px', ml: '10px' }}
                      />
                    </Typography>
                    <Typography sx={{ display: 'flex', justifyContent: 'center', mb: '10px' }}>
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <TextField
                        type="password"
                        label="Password"
                        variant="standard"
                        value={password}
                        sx={{ width: '330px', ml: '10px' }}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Typography>
                    <CRow sx={{ textAlign: 'center' }}>
                      <Typography sx={{ textAlign: 'center' }}>
                        <Button variant="contained" onClick={handleLogin}>
                          Đăng nhập
                        </Button>
                      </Typography>
                      <Typography xs={12} className="text-end">
                        <Button variant="text">Quên mật khẩu?</Button>
                      </Typography>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
