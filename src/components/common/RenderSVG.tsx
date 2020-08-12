import React, { ReactElement } from 'react';

interface Path {
  path: string;
  color: string;
  circle?: Circle;
}

interface Icon {
  viewBox: string;
  paths: Path[];
}

interface Circle {
  // <circle cx="20.4" cy="84.42" r="3.15" transform="translate(-65.97 75.33) rotate(-70.41)"/>
  cx: number;
  cy: number;
  r: number;
  translate: number[];
  rotate: number;
}

interface Props {
  icon: Icon;
  className?: string;
  width?: string;
  height?: string;
}

const RenderSVG = ({icon, width, height, className = ""}: Props): ReactElement => {

  const renderPath = (path: Path): ReactElement => {
    return <path d={path.path} key={ '_' + Math.random().toString(36).substr(2, 9)} fill={path.color}>
      {path.circle && <circle cx={path.circle.cx} cy={path.circle.cy} r={path.circle.r}
       transform={`translate(${path.circle.translate[0]} ${path.circle.translate[1]}) rotate(${path.circle.rotate})`}/> }
    </path>;
  };

  return (
    <svg width={width} height={height} viewBox={icon.viewBox} xmlns="http://www.w3.org/2000/svg" className={className}>
      {icon.paths.map((path): ReactElement => renderPath(path))}
    </svg>
  );
};

export default RenderSVG;