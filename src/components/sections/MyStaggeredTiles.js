import { StaggeredGridItem } from "react-staggered-grid";
import { useState, useEffect } from "react";
import lodash from "lodash-es";
import styled from "styled-components";
import { SectionContainer } from "../common/StyledComponents";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";

const MyStaggeredTiles = ({ section, iter }) => {
  const { title, subtitle, image, list, video, span, externallink, tweet } = section;
  const [open, setOpen] = useState(false);

  // Close modal on any key press and disable scroll
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key) setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Modal rendered outside DOM flow to avoid layout shift
  const modal = open && image ? ReactDOM.createPortal(
    <ModalOverlay onClick={() => setOpen(false)}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={() => setOpen(false)}>×</CloseButton>
        <BigImage src={image.link} />
      </ModalContent>
    </ModalOverlay>,
    document.body
  ) : null;

  const gridpart = (
    <StaggeredGridItem
      index={iter}
      spans={span}
      style={{ transition: "left 0.3s ease, top 0.3s ease" }}
    >
      <SectionContainer
        whileHover={{
          ...(!lodash.isEmpty(image) || !lodash.isEmpty(video) || !lodash.isEmpty(externallink)) && {
            scale: 1.05,
            zIndex: 60,
          },
        }}
      >
        {!lodash.isEmpty(title) && (
          <CommonSectionDiv>
            <Text>{title}</Text>
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(subtitle) && (
          <CommonSectionDiv>
            <Subtitle>{subtitle}</Subtitle>
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(list) && (
          <CommonSectionDiv>
            <List>
              {list.map((listitem, index) => (
                <ListItem key={index}>{listitem.label}</ListItem>
              ))}
            </List>
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(video) && (
          <CommonSectionDiv>
            <Video title={video.title} allowFullScreen src={video.link} />
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(image) && (
          <CommonSectionDiv>
            <Image
              onClick={() => setOpen(true)}
              src={image.link}
              alt="image"
            />
          </CommonSectionDiv>
        )}

        {!lodash.isEmpty(tweet) && (
          <CommonSectionDiv>
            <TwitterTweetEmbed tweetId={tweet} />
          </CommonSectionDiv>
        )}
      </SectionContainer>
      {modal}
    </StaggeredGridItem>
  );

  if (lodash.isEmpty(externallink)) {
    return gridpart;
  }
  if (externallink.includes("https")) {
    return (
      <a href={externallink} style={{ textDecoration: "none", color: "white" }} target="_blank" rel="noopener noreferrer">
        {gridpart}
      </a>
    );
  }
  return (
    <Link
      key={section.id}
      to={externallink}
      style={{ textDecoration: "none", color: "white" }}
    >
      {gridpart}
    </Link>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: relative;
  background: #111;
  padding: 1rem;
  border-radius: 10px;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 40vh;
  object-fit: scale-down;
  cursor: pointer;
`;

const BigImage = styled.img`
  max-height: 80vh;
  max-width: 100%;
  object-fit: contain;
`;
const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin-top: 0.5rem;
`;

const Text = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
`;

const CommonSectionDiv = styled.div``;

const List = styled.ul`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const ListItem = styled.li`
  text-decoration: none;
  font-size: 1.2rem;
  word-break: break-word;
`;

const Video = styled.iframe.attrs({
  allowFullScreen: true,
})`
  width: 100%;
  height: ${(props) => (props.big ? "80vh" : "30vh")};
  border: none;
  overflow: hidden;
`;

export default MyStaggeredTiles;
