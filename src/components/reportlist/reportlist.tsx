/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography, Pagination, TextField, CircularProgress } from "@mui/material";
import React, { useEffect, useCallback } from "react";
import './style.reportlist.scss'
import { useDispatch, useSelector } from "react-redux";
import { deleteOneApplication, getApplication } from "../../actions/application";
import { RootState } from "../../app/store";
import AddModal from "./add_modal";
import { IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from "react-router-dom";
import { openModal, setStatus } from "../../reducers/ui";
import isObject from "lodash/isObject";
import { debounce, isEmpty } from "lodash";
import { selectApplicationUserRights } from "../../common/selectors/user";
import BlockIcon from '@mui/icons-material/Block';
import { Preloader } from "../../common/components/preloader-skeleton/preloader";

const ReportList = (): React.ReactElement => {
  const dispatch = useDispatch()
  const history = useHistory()
  const applications = useSelector((state: RootState) => state.application.applications)
  const { isModalOpened, status, errorMessage } = useSelector((state: RootState) => state.ui)
  const count = useSelector((state: RootState) => state.application.count)
  const rights = useSelector((state: RootState) => selectApplicationUserRights(state))
  const [page, setPage] = React.useState(1);
  const [patientName, setPatientName] = React.useState('');
  const [patientRequest, setPatientRequest] = React.useState('');
  const [fundRequest, setFundRequest] = React.useState('');
  const [fundName, setFundName] = React.useState('');
  const [manager, setManager] = React.useState('');
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const deleteAppl = (value: number) => {
    dispatch(deleteOneApplication(value.toString()));
  };
  const tableData = ['№', { title: 'Patient name', field: patientName, onChange: setPatientName }, 'Birth date', { title: 'Patient request', field: patientRequest, onChange: setPatientRequest }, { title: 'Fund name', field: fundName, onChange: setFundName }, { title: 'Fund request', field: fundRequest, onChange: setFundRequest }, { title: 'manager', field: manager, onChange: setManager }, 'Created', 'Finished', 'Delete']

  const changeHandler = (e: any, field: string, callback: (title: string) => void) => {
    if (e.target.value.length > 2) {
      callback(e.target.value)
    }
    else if (field.length > 2 && e.target.value.length === 0) {
      callback('')
    }
  };
  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 300)
    , []);

  useEffect(() => {
    dispatch(getApplication(page, 10, manager, patientName, patientRequest, fundName, fundRequest))
  }, [page])

  useEffect(() => {
    dispatch(getApplication(page, 10, manager, patientName, patientRequest, fundName, fundRequest))
  }, [manager, patientName, patientRequest, fundName, fundRequest])

  useEffect(() => {
    if (status === 'no') {
      setTimeout(() => dispatch(setStatus('')), 1500)
    }
  }, [status])

  /**
   * Переход на отдельное заключение
   * @param {number} id Id заключения.
   */
  const goToApplItem = (id: number | undefined) => {
    history.push(`application/${id}`)
  }
  return <div className='add-appl-container'>
    {isModalOpened && <AddModal />}
    <div className='add-button-wrapper'>
      {rights.processedRights.applications?.create && <Button size='small' variant='contained' className='add-button' onClick={() => dispatch(openModal(true))}>
        <Typography>New report</Typography>
      </Button>}
    </div>
    <div className="appl-table">
      <table>
        <thead>
          <tr>
            {tableData.map(el => (el !== 'Удалить' || rights.processedRights.applications?.delete) && (<th key={isObject(el) ? el.title : el}>
              <div>
                <span>
                  {isObject(el) ? el.title : el}
                </span>
                {isObject(el) &&
                  <TextField
                    onChange={(e) => debouncedChangeHandler(e, el.field, el.onChange)}
                    type="text"
                    size="small"
                    placeholder="Search"
                  />
                }
              </div>
            </th>))}
          </tr>
        </thead>
        <tbody>
          {status === 'ok' && applications.length > 0 && applications.map((appl, index) => <tr onClick={() => goToApplItem(appl.id)} key={appl.patientName}>
            <td>{index + 1}</td>
            <td>{appl.patientName}</td>
            <td>{new Date(appl.patientBirthDate).toLocaleString()}</td>
            <td>{appl.patientRequest}</td>
            <td>{appl.fundName}</td>
            <td>{appl.fundRequest}</td>
            <td>{appl.manager}</td>
            <td>{new Date(appl.creationDate).toLocaleString()}</td>
            <td>{appl.execDate && new Date(appl.execDate).toLocaleString()}</td>
            {(rights.processedRights.applications?.delete) && <td><IconButton className='delete-button' onClick={(e: any) => {
              e.stopPropagation()
              appl.id && deleteAppl(appl.id)
            }}>
              <DeleteOutlineIcon />
            </IconButton></td>}
          </tr>)}
          {status === 'pending' && <Preloader tdNum={[1,2,3,4,5,6,7,8,9,10]} />}
        </tbody>
      </table>
    </div>
    {status === 'ok' && isEmpty(applications) && <div><BlockIcon sx={{ fontSize: '40px', marginTop: '20px' }} /> </div>}
    {status === 'no' && <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>}
    {count > 10 && <div className="pagination">
      <Pagination
        count={(count / 10) + 1}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        size='large'
        color="primary"
        boundaryCount={10}
      />
    </div>}
  </div>

}
export default ReportList