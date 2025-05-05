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
import { SectionContainer } from '../common/StyledComponents';

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
            scale: 1.05,
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
              <ModalContainer>
                <BigImage src={image.link} />
              </ModalContainer>
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
   if(externallink.includes("https"))   
      return <a href={externallink} style={{textDecoration: 'none', color: "white"}}>
        {gridpart}
      </a>
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

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100vh; */
`;

const BigImage = styled.img`
  width: 90vw;
  height: 80vh;
  object-fit: contain;
`;

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

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
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
  padding:1rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const ListItem = styled.li`
  text-decoration: none;
  font-size: 1.2rem;
  word-break: break-all;
`;


export default MyStaggeredTiles;