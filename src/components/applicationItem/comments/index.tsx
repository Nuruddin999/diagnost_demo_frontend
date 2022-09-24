import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Typography } from "@mui/material";
import { RootState } from "../../../app/store";
import './style.comments.scss'
import { changeComment } from "../../../reducers/applicationItemSlice";
import { selectApplicationUserRights } from "../../../common/selectors/user";
import { localization } from "../../../constants";


/**
 * Компонент пояснений.
 * @returns {React.ReactElement}
 */
const Comments = (): React.ReactElement => {
  const comments = useSelector((state: RootState) => state.applicationItem.comments.reduce((prev,current)=>({...prev, [current.title as string]:current.comment}),{}))
  const {language} = useSelector((state: RootState) => state.ui)
  const { processedRights } = useSelector((state: RootState) => selectApplicationUserRights(state))
  const dispatch = useDispatch()

  return <>
    <h4>{localization.explanations[language as keyof typeof localization.explanations]}</h4>
    <div className="comments-section">
      {localization.comments.map((commentEl, index) => <div className='comments-section-wrapper' key={index + 1}>
        <Typography>{index + 1}</Typography>
        <TextField
          fullWidth
          className="text"
          placeholder={commentEl[language as keyof typeof commentEl]}
          size='small'
          multiline
          maxRows={4}
          value={comments[commentEl.ru as keyof typeof comments]}
          onChange={(e) => processedRights.applications?.update &&  dispatch(changeComment({ title:commentEl.ru, comment: e.target.value }))}
          margin='normal'
        />
      </div>)}
    </div>
  </>
}
export default Comments