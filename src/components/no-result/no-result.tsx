import { Typography} from "@mui/material";
import React from "react";
import './style.noresult.scss'
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';


const NoResult = (): React.ReactElement => {

    return <div className='no-result'>
        <DoNotDisturbAltIcon fontSize='large'/>
        <div>
            <Typography>
                empty please add data
            </Typography>
        </div>
    </div>

}
export default NoResult