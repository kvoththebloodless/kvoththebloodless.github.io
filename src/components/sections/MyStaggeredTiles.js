import {
  StaggeredGridItem,
} from "react-staggered-grid";
import { useRef, useEffect, useState } from 'react';
import lodash from 'lodash-es';
import styled from 'styled-components';
import ModalImage from "react-modal-image";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

import { TwitterTweetEmbed } from 'react-twitter-embed';

const MyStaggeredTiles = ({ section, iter }) => {
  const { title, image, list, video, span, externallink,tweet } = section;
  let [height, setHeight] = useState("px");

  const [open, setOpen] = useState(false);

  const ref = useRef(null)
  const gridpart = (
    <StaggeredGridItem
      index={iter}
      spans={span}
      style={{ transition: "left 0.3s ease,top 0.3s ease" }}
      ref={ref}
    >
      <SectionContainer 
        whileHover={{
          ...(!lodash.isEmpty(image) || !lodash.isEmpty(video) || !lodash.isEmpty(externallink)) &&
          {
            scale: 1.2,
            zIndex: 60
          }
        }}
      >
        {!lodash.isEmpty(title) && (
          <CommonSectionDiv >
            <Text>{title}</Text>
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(list) && (
          <CommonSectionDiv >
            <List>
              {list.map(listitem => (
                <ListItem>{listitem.label}</ListItem>
              ))}
            </List>
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(video) && (
          <CommonSectionDiv >
            <Video title={video.title} allowfullscreen="allowfullscreen" src={video.link} />
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(image) && (
          <CommonSectionDiv >
            <Image
              onClick={() => setOpen(true)}
              src={image.link}
              alt="image"
            />
             <Modal
                open={open}
                onClose={() => setOpen(false)}
              >
                <Box sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 'fit-content',
                  bgcolor: 'background.paper',
                  border: '2px solid #fff',
                  boxShadow: 24,
                  p: 1,
                }}>
                  <img src={image.link}/>

                </Box>
              </Modal>
          </CommonSectionDiv>
        )}
        {!lodash.isEmpty(tweet)&&
            (<TwitterTweetEmbed
          tweetId={tweet}/>)
        }
        
      </SectionContainer>
     
    </StaggeredGridItem >
  )
    
  useEffect(() => {
    setHeight(ref.current.clientHeight + "px")
  }, [])


 
   if(lodash.isEmpty(externallink))
      return gridpart
      
  return (
    <Link
      key={section.id}
      to={externallink}
      style={{textDecoration: 'none', color: "white"}}
    >
      {gridpart}
    </Link>
  )
}

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: scale-down;;
`;

const Video = styled.iframe.attrs({
  allowFullScreen: true
})`
  width: 100%;
  height: ${props => props.big ? '80vh' : '30vh'};
  border: none;
  overflow:hidden;
`;

const SectionContainer = styled(motion.div)`
  background: linear-gradient(85deg,#434343,#262626);
  /* border: 2px solid white; */
  border-radius: 1rem;
  padding: 1rem;
  z-index:2;
  box-shadow: -2rem 0 3rem -2rem #000;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CommonSectionDiv = styled.div`
  /* width: 100%; */
  /* height: ${props => props.height + "px"}; */
  /* text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const ListItem = styled.li`
  text-decoration: none;
`;


export default MyStaggeredTiles;