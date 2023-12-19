import React from 'react';
import { getRectOfNodes, getTransformForBounds, Panel, useReactFlow } from 'reactflow';
import { toPng } from 'html-to-image';
import { Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function downloadImage(dataUrl: string) {
  const a = document.createElement('a');

  a.setAttribute('download', 'reactflow.png');
  a.setAttribute('href', dataUrl);
  a.click();
}

const imageWidth = 1024;
const imageHeight = 768;

const DownloadImageButtonPanel = () => {
  const { getNodes } = useReactFlow();
  const onClick = () => {
    // we calculate a transform for the nodes so that all nodes are visible
    // we then overwrite the transform of the `.react-flow__viewport` element
    // with the style option of the html-to-image library
    const nodesBounds = getRectOfNodes(getNodes());
    const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);

    toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
      backgroundColor: '#1a365d',
      width: imageWidth,
      height: imageHeight,
      style: {
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
      },
    }).then(downloadImage);
  };

  return (
    <Panel position="top-right" style={{ marginRight: '17rem' }}>
      <Box
        onClick={onClick}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '0 10px 10px 0',
          bgcolor: 'background.paper',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        }}
      >
        <DownloadIcon
          sx={{
            fontSize: '33px',
            p: '0.4rem',
            bgcolor: 'background.default',
            color: '#fff',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        />
      </Box>
    </Panel>
  );
};

export default DownloadImageButtonPanel;
