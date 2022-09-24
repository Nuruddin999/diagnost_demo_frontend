import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { changeCheckupPlan, saveCheckupPlan, deleteCheckupPlan } from "../../../reducers/applicationItemSlice";
import './style.checkupplans.scss'
import NoResult from "../../no-result/no-result";
import CloseIcon from '@mui/icons-material/Close';
import { changeIsDeletedPlaceAction } from "../../../actions/user";
import { selectApplicationUserRights } from "../../../common/selectors/user";
import { localization } from "../../../constants";


const CheckupPlanForm = (): React.ReactElement => {
  const dispatch = useDispatch()
  const checkupPlansProp = useSelector((state: RootState) => state.applicationItem.checkupPlans)
  const {  email, isDeletedPlace } = useSelector((state: RootState) => state.user.user)
  const { applications, checkupPlanPlace } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  const { language  } = useSelector((state: RootState) => state.ui )
  const [kind, setKind] = useState('')
  const [place, setPlace] = useState('')
  const [target, setTarget] = useState('')
  const bc = useMemo(() => new BroadcastChannel('pdf_channel'), []);
  const addConsliliumDoctor = () => {
    dispatch(saveCheckupPlan({ kind, place, target }))
  }
  const deletePlan = (index: number) => {
    dispatch(deleteCheckupPlan(index))
  }
  const sendBroadcastMessage = () => {
    dispatch(changeIsDeletedPlaceAction(email))
    bc.postMessage(isDeletedPlace);
  }
  useEffect(() => {
    return () => {
      bc.close();
    };
  }, [bc]);
  return <div>
    {checkupPlansProp.length > 0 ? <table>
      <tr>
        <th>
          <span>
            №
          </span>
        </th>
        <th>
          <span>
           {localization.examinationType[language as keyof typeof localization.examinationType]}
          </span>
        </th>
        {!isDeletedPlace && <th>
          <span>
          {localization.place[language as keyof typeof localization.place]}
          </span>
        </th>}
        <th>{localization.medicalQuestion[language as keyof typeof localization.medicalQuestion]}</th>
        <th>
        </th>
      </tr>
      <tbody>
        {checkupPlansProp.length > 0 && checkupPlansProp.map((checkupPlan, index) => <tr>
          <td>{index + 1}</td>
          <td>    <TextField
            value={checkupPlan.kind}
            variant='standard'
            size='small'
            fullWidth
            placeholder={localization.examinationType[language as keyof typeof localization.examinationType]}
            onChange={(e) => applications?.update && dispatch(changeCheckupPlan({ index, checkupPlan: { kind: e.target.value, place: checkupPlan.place, target: checkupPlan.target } }))}
          /></td>
          {!isDeletedPlace && <td>
            <TextField
              value={checkupPlan.place}
              variant='standard'
              size='small'
              fullWidth
              placeholder={localization.place[language as keyof typeof localization.place]}
              onChange={(e) =>  applications?.update && dispatch(changeCheckupPlan({ index, checkupPlan: { kind: checkupPlan.kind, place: e.target.value, target: checkupPlan.target } }))}
            />
          </td>}
          <td>    <TextField
            value={checkupPlan.target}
            variant='standard'
            size='small'
            fullWidth
            placeholder={localization.medicalQuestion[language as keyof typeof localization.medicalQuestion]}
            onChange={(e) => applications?.update && dispatch(changeCheckupPlan({ index, checkupPlan: { kind: checkupPlan.kind, place: checkupPlan.place, target: e.target.value } }))}
          /></td>
          <td><IconButton disabled={!applications?.update} className='delete-button' onClick={() => deletePlan(index)}>
            <DeleteOutlineIcon />
          </IconButton></td>
        </tr>)}
      </tbody>
    </table> : <NoResult />}
    <Typography>{localization.examinationPlan[language as keyof typeof localization.examinationPlan]}</Typography>
    <div className="add-in-table-section">
      <TextField
        value={kind}
        variant='outlined'
        size='small'
        fullWidth
        placeholder={localization.examinationType[language as keyof typeof localization.examinationType]}
        onChange={(e) => setKind(e.target.value)}
      />
      <div className='place'>
        {checkupPlanPlace?.delete  &&
          <div>
            {!isDeletedPlace && <IconButton size='small' className='hide-place' onClick={sendBroadcastMessage}>
              <CloseIcon />
            </IconButton>}
          </div>
        }
        {!isDeletedPlace ? <TextField
          value={place}
          variant='outlined'
          size='small'
          fullWidth
          placeholder={localization.place[language as keyof typeof localization.place]}
          onChange={(e) => setPlace(e.target.value)}
        /> : <Button onClick={sendBroadcastMessage}>{localization.show[language as keyof typeof localization.show ]}</Button>}
      </div>
      <TextField
        value={target}
        variant='outlined'
        size='small'
        fullWidth
        placeholder={localization.medicalQuestion[language as keyof typeof localization.medicalQuestion]}
        onChange={(e) => setTarget(e.target.value)}
      /> <IconButton disabled={!applications?.update} onClick={addConsliliumDoctor} >
        <AddCircleIcon className='add-in-table-svg ' />
      </IconButton>
    </div>

  </div>
}
export default CheckupPlanForm