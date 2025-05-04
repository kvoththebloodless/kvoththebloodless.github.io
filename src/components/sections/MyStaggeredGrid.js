import MyStaggeredTiles from "./MyStaggeredTiles";
import {
  StaggeredAlignment,
  StaggeredGrid,
} from "react-staggered-grid";
import { useRef, useEffect, useState } from 'react';
import useWindowSize from '../../utils/hooks/useWindowSize';



const MyStaggeredGrid = ({ sections, width="300"}) => {


  const { width: currentWidth } = useWindowSize()

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return(
  <StaggeredGrid
    columnWidth={currentWidth < 500 ? currentWidth - 20 : width} // width of each column , don't pass if you want it to be gridWidth / columns
    columns={0}
    alignment={StaggeredAlignment.Center}
    useElementWidth={true} // this would force css styled width (100%) , when false gridWidth = columnWidth * columnWidth
    fitHorizontalGap={true}
    calculateHeight={true}
    horizontalGap={24}
    verticalGap={24}
    repositionOnResize={true}

  >
    {sections.map((section, i) => (
      <MyStaggeredTiles key={i} section={section} iter={i} />
    ))}

  </StaggeredGrid>
  )
}

export default MyStaggeredGrid;