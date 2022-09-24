import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { IconButton, TextField, Typography} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {  saveConsiliumDoctors, deleteConsiliumDoctors } from "../../../reducers/applicationItemSlice";
import './style.consiliumdoctors.scss'
import NoResult from "../../no-result/no-result";
import { selectApplicationUserRights } from "../../../common/selectors/user";
import Specialities from "../../../common/components/specialities/specialities";
import { localization } from "../../../constants";

const ConsiliumDoctorsForm = (): React.ReactElement => {
  const dispatch = useDispatch()
  const consiliumDoctorsProp = useSelector((state: RootState) => state.applicationItem.consiliumDoctors)
  const {language} = useSelector((state: RootState) => state.ui)
  const { processedRights } = useSelector((state: RootState) => selectApplicationUserRights(state))
  const { applications } = processedRights
  const [fio, setFio] = useState('')
  const [speciality, setSpeciality] = useState('')
  const addConsliliumDoctor = () => {
    dispatch(saveConsiliumDoctors({ name: fio, speciality }))
  }
  const deleteDoctor = (index: number) => {
    dispatch(deleteConsiliumDoctors(index))
  }
  return <div>
    <h3>{localization.consiliumIncluding[language as keyof typeof localization.consiliumIncluding]}</h3>
    <h5>{localization.writeNameWhoTakePart[language as keyof typeof localization.writeNameWhoTakePart]}</h5>
    {consiliumDoctorsProp.length > 0 ? <table>
      <thead>
        <tr>
          <th>
            <span>
              №
            </span>
          </th>
          <th>
            <span>
             Name
            </span>
          </th>
          <th>
            <span>
              Specialization
            </span>
          </th>
          <th>
          </th>
        </tr>
      </thead>
      <tbody>
        {consiliumDoctorsProp.length > 0 && consiliumDoctorsProp.map((consDoctor, index) => <tr key={consDoctor.name}>
          <td>{index + 1}</td>
          <td>    <TextField
            value={consDoctor.name}
            variant='standard'
            size='small'
            fullWidth
            placeholder='Name'
          /></td>
          <td>    <TextField
            value={consDoctor.speciality}
            variant='standard'
            size='small'
            fullWidth
            placeholder='Specialization'
          /></td>
          <td><IconButton disabled={!applications?.update} className='delete-button' onClick={() => deleteDoctor(index)}>
            <DeleteOutlineIcon />
          </IconButton></td>
        </tr>)}
      </tbody>
    </table> : <NoResult />}
    <Typography>Add doctor in table</Typography>
    <div className="add-in-table-section">
      <div className='speciality-fio'>
        <TextField
          value={fio}
          variant='outlined'
          fullWidth
          size='small'
          placeholder='Name'
          onChange={(e) => setFio(e.target.value)}
        />
      </div>

      <div className='speciality-dropdown'>
        <Specialities speciality={speciality} setSpeciality={setSpeciality} />
      </div>
      <IconButton disabled={!applications?.update} onClick={addConsliliumDoctor} >
        <AddCircleIcon className='add-in-table-svg' />
      </IconButton>
    </div>
  </div>
}
export default ConsiliumDoctorsForm