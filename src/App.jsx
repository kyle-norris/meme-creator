import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Stage, Layer, Rect, Circle, Text, Image } from 'react-konva';
import { useEffect } from 'react'
import { useRef } from 'react';
import TextBox from './components/TextBox';
import defaultImg from "./assets/images/one-does-not-simply.png"
import URLImage from './components/URLImage';

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


function getPixelRatio(width, height, origWidth, origHeight) {
  if (origWidth < width || origHeight < height) {
    return 1;
  }

  var w = Math.trunc(origWidth / width);
  var h = Math.trunc(origHeight / height);

  return Math.min(w, h);
}



function App() {
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [pixelRatio, setPixelRatio] = useState(1);
  const stageRef = useRef(null);
  const baseLayerRef = useRef(null);

  const handleExport = () => {
    console.log(pixelRatio);
    const uri = stageRef.current.toDataURL({ pixelRatio: pixelRatio});
    downloadURI(uri, 'meme.png');
  };

  const handleImageSizeChange = (width, height, origWidth, origHeight) => {
    setWidth(width);
    setHeight(height);

    setPixelRatio(getPixelRatio(width, height, origWidth, origHeight))
  }


  return (
    <>
      <div className='stage-container'>
        <Stage ref={stageRef} width={width} height={height}>
          <Layer ref={baseLayerRef}>
            <URLImage src={defaultImg} handleSizeChange={handleImageSizeChange}/>
          </Layer>
          <Layer>
            
            <TextBox />
          </Layer>
        </Stage>
      </div>

      <button onClick={handleExport}>Download</button>
    </>
  )
}

export default App
