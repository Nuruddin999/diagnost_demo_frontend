import React from "react";
import './style.preloader.scss'

export const Preloader = ({ tdNum }: { tdNum: Array<number> }): React.ReactElement => {
  return <>
    {[1, 2, 3, 4, 5, 6, 7].map((el, index) => <tr className='preloader'>
      <td><span>1</span></td>
      {
        tdNum.map((el, index) => index !== 0 && <td><span>preloaderpreloader</span></td>)
      }
    </tr>)}
  </>
}