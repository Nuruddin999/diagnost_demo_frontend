import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { TextField, Typography } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.anamnesis.scss'
import { changeComplaints, changeAnamnesis, changeDiagnosticData } from "../../../reducers/applicationItemSlice";
import { selectApplicationUserRights } from "../../../common/selectors/user";
import { localization } from "../../../constants";


const Anamnesis = (): React.ReactElement => {

  const complaints = useSelector((state: RootState) => state.applicationItem.complaint)
  const anamnesis = useSelector((state: RootState) => state.applicationItem.anamnesis)
  const diagnosticData = useSelector((state: RootState) => state.applicationItem.diagnosticData)
  const { applications } = useSelector((state: RootState) => selectApplicationUserRights(state)).processedRights
  const dispatch = useDispatch()
  return <div className="anamnesis">
    <div className='complaints'>
      <Typography fontWeight={700}>Patient complaints:</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        placeholder={localization.patientComplaintsPlaceholder.en}
        variant='standard'
        value={complaints}
        className='text-section'
        onChange={(e) => applications?.update && dispatch(changeComplaints(e.target.value))}
      />
    </div>
    <div className='complaints'>
      <Typography fontWeight={700}>{localization.anamnesis.en}</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        placeholder={localization.anamnesisPlaceholder.en}
        variant='standard'
        className='text-section'
        value={anamnesis}
        onChange={(e) => applications?.update &&  dispatch(changeAnamnesis(e.target.value))}
      />
    </div>
    <div className='complaints'>
      <Typography fontWeight={700}>{localization.diagnosticFindings.en}</Typography>
      <TextField
        multiline
        maxRows={8}
        size='small'
        placeholder={localization.diagnosticFindingsPlaceholder.en}
        variant='standard'
        className='text-section'
        value={diagnosticData}
        onChange={(e) => applications?.update &&  dispatch(changeDiagnosticData(e.target.value))} />
    </div>
  </div>
}
export default Anamnesis