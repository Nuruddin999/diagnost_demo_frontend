import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem, Typography, FormControl, InputLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../actions/user";
import { RootState } from "../../../app/store";
import { Loader } from "../../../components/loader/loader";
import './style.auth.scss'
import { specialities } from "../../../constants";
import { FileUpload } from "../fileupload/fileUpload";
import { setAddUserStatus, setError} from "../../../reducers/ui";
import { isEmpty } from "lodash";
import Specialities from "../specialities/specialities";

export const Registration = ({ notHaveSuperUser }: { notHaveSuperUser?: boolean }): React.ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState('')
  const [files, setFiles] = useState<Array<File>>([])
  const { addUserStatus, errorMessage } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch()
  const errorDispatching =(error: string )=>{
    dispatch(setAddUserStatus('no'))
    dispatch(setError(error))
  }
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!speciality) {
      errorDispatching('Type speciality')
      return
    }
    else if (isEmpty(files)) {
      errorDispatching('Upload signature image')
      return
    }
    dispatch(registerUser({ email, password, name, speciality, phone, role: notHaveSuperUser ? 'superadmin' : role, files }))
  }
  /**
   * Действия после успешной регистрации.
   * @param {boolean} isSuccess Является ли запрос на регистрацию успешным.
   */
  const fillRegistrationForm = () => {
    setEmail('')
    setPassword('')
    setName('')
    setSpeciality('')
    setPhone('')
    setRole('')
    dispatch(setAddUserStatus('none'))
  }
  const renderRegisterButton = () => {
    if (addUserStatus === 'ok') {
      return <Typography className='success-reg' align='center'>
        User successfully created
      </Typography>
    }
    else if (addUserStatus === 'no') {
      return <Typography className='error-reg' align='center'>
      {errorMessage}
    </Typography>
    }
    else {
      return <Button className='login-button' fullWidth variant='contained' disableElevation type='submit'>
      <Loader title='Register' isLoading={addUserStatus === 'pending'} />
    </Button>
    }

  }
  useEffect(() => {
    if (addUserStatus === 'ok') {
      setTimeout(() => fillRegistrationForm(), 1500)
    }
    else if (addUserStatus === 'no') {
      setTimeout(() => dispatch(setAddUserStatus('')), 2000)
    }
  }, [addUserStatus])
  return <div className={'registration-main'}>
    <div className={'auth-wrapper'}>
      {
        notHaveSuperUser && <div className={'nosuperuser-title'}>
          <Typography variant='h4' >
          Wellcome to service
          </Typography>
          <Typography>
            Create new main administrator
          </Typography></div>
      }
      <div className={"auth-container"}>
        <form onSubmit={(event) => onSubmit(event)}>
          <TextField value={email}
            type='email'
            required
            size='small'
            fullWidth
            placeholder='Email'
            margin='normal'
            onChange={(event) => setEmail(event.target.value)} />
          <TextField
            value={password}
            type='password'
            required
            size='small'
            fullWidth
            placeholder='Password'
            margin='normal'
            onChange={(event) => setPassword(event?.target.value)} />
          <div>
            <TextField
              value={name}
              type='text'
              required
              size='small'
              fullWidth
              placeholder='Name'
              margin='normal'
              onChange={(event) => setName(event?.target.value)} />
      <Specialities  speciality={speciality} setSpeciality={setSpeciality}/>
            <TextField
              value={phone}
              type='text'
              required
              size='small'
              fullWidth
              placeholder='Phone'
              margin='normal'
              onChange={(event) => setPhone(event?.target.value)} />
            <Typography align='left' >Role</Typography>
            {notHaveSuperUser ? <Typography align='left' >Main administrator </Typography> : <Select
              onChange={(event) => setRole(event.target.value)}
              autoWidth
              required
              value={notHaveSuperUser ? 'admin' : role}
              variant='standard'
              className={'select'}
            >
              <MenuItem value={'admin'}>Administrator</MenuItem>
              <MenuItem value={'doctor'}>Doctor</MenuItem>
            </Select>}
            <Typography align='left' >Signature image</Typography>
     <FileUpload files={files} setFiles={setFiles} />
            {renderRegisterButton()}
          </div>
        </form>
      </div>
    </div>
  </div >
}