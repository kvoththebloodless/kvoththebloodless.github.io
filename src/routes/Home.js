import styled from 'styled-components';
import Links from '../components/Links/Links';
import { motion } from 'framer-motion';
import profilepic from '../profile.jpg'
import portfolioData from '../portfolioData';
import MyStaggeredGrid from '../components/sections/MyStaggeredGrid';
import { SectionContainer, Subtitle } from '../components/common/StyledComponents';
import { Icon as BXIcon, Link } from '@mui/material';
import { FaBriefcase, FaBriefcaseMedical, FaEnvelope, FaEnvelopeOpen, FaMapMarker, FaMapMarkerAlt } from 'react-icons/fa';
// filepath: /Users/gourav/Documents/kvoththebloodless.github.io/src/routes/Home.js

const Home = (props) => {
  const { title, subtitle, links, projects, visastatus, location, email, blogs, jobs, dungeonsAndDragons,animations } = portfolioData;

  return (
    <PageContainer>
      <BackgroundSection>
        <ProfilePicComponent src={profilepic} />
        <Title>{title}</Title>
        <Row>
          <Quote style={{ marginTop: 20 }}>{subtitle}</Quote>
        </Row>
        <SectionContainer>
          <Row>
            <IconAndText>
              <Icon component={FaMapMarkerAlt} />
              <Subtitle>{location}</Subtitle>
            </IconAndText>

            <IconAndText>
              <Icon component={FaBriefcase} />
              <Subtitle>{visastatus}</Subtitle>
            </IconAndText>

            <IconAndText>
              <Icon component={FaEnvelope} />
              <Link color="#fff" href={`mailto:${email}`}>
                <Subtitle>{email}</Subtitle>
              </Link>
            </IconAndText>
          </Row>

          <Row>
            <Links links={links} color="white" />
          </Row>
        </SectionContainer>
      </BackgroundSection>



      <Divider>Jobs</Divider>
      <MyStaggeredGrid width="500" sections={jobs} />

      <Divider>Animation Work</Divider>
      <MyStaggeredGrid width="500" sections={animations} />

      {/* Add Dungeons and Dragons Section */}
      <Divider>Dungeons & Dragons</Divider>
      <MyStaggeredGrid width="500" sections={dungeonsAndDragons} />

      <Divider>Game Projects</Divider>
      <MyStaggeredGrid width="500" sections={projects} />

      <Divider>Dev Posts</Divider>
      <MyStaggeredGrid width="500" sections={blogs} />
    </PageContainer>
  );
};

const Divider = ({children}) => (
  <DividerContainer>
    <span />
    <b>
      {children}
    </b>
    <span />
  </DividerContainer>
)

const Quote = styled.p`
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 600;
  color: #999;
`;

const DividerContainer = styled.div.attrs({className: 'divider'})`
  display: table; 
  font-size: 24px; 
  text-align: center; 
  width: 75%;
  margin: 40px auto;
`;


const PageContainer = styled.div`
  color: white;
  padding-left: 5rem;
  padding-right: 5rem;
  height: 100vh;

  @media screen and (max-width: 500px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const BackgroundSection = styled(motion.div)`
  display: flex;
  flex-direction:column;
  margin:auto;
  width:100%;
  justify-content: center;
  align-items: center;
  row-gap: 24px;
`;
const ProfilePicComponent = styled(motion.img)`
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  margin-top: 10rem;

  @media screen and (max-width: 500px) {
    width: 20rem;
    height: 20rem;
  }
`;

export const Title = styled(motion.h1)`
  font-style: normal;
  font-weight: 700;
  font-size: 4em;

  @media screen and (max-width: 500px) {
    font-size: 2.5rem;
  }
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;

const Icon = styled(BXIcon)`
  justify-self: center;
  align-self: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
`;

const IconAndText = styled.div`
  display: flex;
  column-gap: 8px;
`;


export default Home;