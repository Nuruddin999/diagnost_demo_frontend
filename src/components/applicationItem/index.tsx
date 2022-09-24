import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateApplication } from "../../actions/application";
import ConsiliumDoctorsForm from "./consilium_doctors/consiliumDoctors";
import { Button, Typography, IconButton } from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { RootState } from "../../app/store";
import './style.applicationitem.scss'
import DiagnosticForm from "./diagnostic/consiliumDoctors";
import { initialState, saveApplicationItem } from "../../reducers/applicationItemSlice";
import CheckupPlanForm from "./checkup_plans/checkupPlans";
import Anamnesis from "./anamnesis";
import PatientInfo from "./patientinfo";
import MostProbDiagnosis from "./probable_diagnosis";
import Comments from "./comments";
import { getListItemAction } from "../../common/actions/common";
import { setUserItemStatus } from "../../reducers/ui";
import { RoundLoader } from "../../common/components/roundloader";

const ApplicationItem = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>()
  const { userItemStatus, errorMessage } = useSelector((state: RootState) => state.ui)

  const dispatch = useDispatch()
  /**
   * Обновляем заключение.
   */
  const handleClick = () => {
    dispatch(updateApplication())
  }
  useEffect(() => {
    dispatch(getListItemAction(id, 'applications', saveApplicationItem))
    return () => { dispatch(saveApplicationItem({ ...initialState, fundRequest: '', managerId: '', updatedAt: '', createdAt: '', ConsiliumDoctors:[], Comments:[{ title: 'Куда обратился пациент и с какой помощью', comment: '' }, { title: 'Что было им предоставлено, или наоборот, ничего не было предоставлено, только жалоюы и просьбы', comment: '' }, { title: 'Какая работа была проделана', comment: '' }, { title: 'Почему быоо рекомендовано то, или иное, на основании чего', comment: '' }, { title: 'Заключение: "По результатам проделанной работы считаю просьбу подопечного (ой) обоснованной (или нет) и возможной для одобрения (или нет)"', comment: '' }], Diagnostics:[], CheckupPlans:[] })) }
  }, [])
  useEffect(() => {
    if (userItemStatus === 'no') {
      setTimeout(() => dispatch(setUserItemStatus('')), 500)
    }
  }, [userItemStatus])

  return userItemStatus === 'pending' ? <RoundLoader /> : <div className="application-item">
    {userItemStatus === 'updated' && <div className='upload-snakebar'>
      <Typography variant='h6' alignContent='center'>
        saved
      </Typography>
    </div>}
    {userItemStatus === 'no' && <div className='upload-snakebar'>
      <Typography variant='h6' alignContent='center'>
        {errorMessage}
      </Typography>
    </div>}
    <h2>DOCTOR'S RECOMMENDATIONS</h2>
    <h4 className='only-for-inner-warning'>(WARNING! THIS DOCUMNET IS FOR INNER USAGE ONLY)
    </h4>
    <PatientInfo />
    <h3> On the ground of: </h3>
    <h5> (indicate the reasons: complaints, symptoms, syndromes, doctor's suspicion  and so on) </h5>
    <Anamnesis />
    <ConsiliumDoctorsForm />
    <DiagnosticForm />
    <MostProbDiagnosis />
    <h4>On the basis of helded consilium is recommended survey plan:</h4>
    <CheckupPlanForm />
    <Comments />
    <Button onClick={handleClick} size='medium' variant='contained' className='save-button'>
      Save
    </Button>
    <a href={`/flpdf/${id}`} target='_blank' rel="noreferrer"><IconButton size='medium'>
      <PictureAsPdfIcon className='only-for-inner-warning' />
    </IconButton></a>
  </div>
}
export default ApplicationItem