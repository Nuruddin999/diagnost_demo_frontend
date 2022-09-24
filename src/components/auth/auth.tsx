import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { RootState } from "../../app/store";
import { Loader } from "../loader/loader";
import '../../common/components/registration/style.auth.scss'
import { login } from "../../actions/user";
import { setError } from "../../reducers/ui";

export const Auth = (): React.ReactElement => {
  const [email, setEmail] = useState('admin@gmail.com')
  const [password, setPassword] = useState('admin')
  const { user } = useSelector((state: RootState) => state.user)
  const { isCircular, errorMessage } = useSelector((state: RootState) => state.ui)
  const dispatch = useDispatch()
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => dispatch(setError('')), 1500)
    }
  }, [errorMessage])

  return <div className={'auth-wrapper'}>
      <Typography variant='h2'>
      Medical report service - demo version
    </Typography>
    <div className={"auth-container"}>
    <Typography>
     login: <strong>admin@gmail.com</strong>
    </Typography>
    <Typography>
     password: <strong>admin</strong>
    </Typography>
    <Typography>
     After login with these crecentials you may also create your own users and login with them
    </Typography>
      <form onSubmit={(event) => onSubmit(event)} data-testid='loginform'>
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

        { errorMessage && <Typography className='error-reg' align='center'>
          {errorMessage}
        </Typography>}
        <Button className='login-button' fullWidth variant='contained' disableElevation type='submit'>
          <Loader title='Sign in' isLoading={isCircular} />
        </Button>
      </form>
      {user.role !== '' && <Redirect to='/main/table' />}
    </div>
  </div>
}