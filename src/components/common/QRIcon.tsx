import React, { ReactElement } from 'react';
import classes from './QRIcon.module.css'

interface Props {
  flippedColor?: boolean;
}

export const QRIcon = ({ flippedColor = false }: Props): ReactElement => {

  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512' className={classes.iconSize}>
      <title>ionicons-v5-k</title>
      <rect x='336' y='336' width='80' height='80' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='272' y='272' width='64' height='64' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='416' y='416' width='64' height='64' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='432' y='272' width='48' height='48' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='272' y='432' width='48' height='48' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='336' y='96' width='80' height='80' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='288' y='48' width='176' height='176' rx='16' ry='16'
        className={`${classes.QRIcon} ${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='96' y='96' width='80' height='80' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='48' y='48' width='176' height='176' rx='16' ry='16'
        className={`${classes.QRIcon} ${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='96' y='336' width='80' height='80' rx='8' ry='8' 
        className={`${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
      <rect x='48' y='288' width='176' height='176' rx='16' ry='16'
        className={`${classes.QRIcon} ${flippedColor ? classes.flippedColor : classes.iconColor}`}/>
    </svg>
  )
}

export default QRIcon