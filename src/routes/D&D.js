import styled from 'styled-components';
import portfolioData from '../portfolioData';
import MyStaggeredGrid from '../components/sections/MyStaggeredGrid';
import { Title } from './Home';

const DungeonsAndDragons = () => {
  const { dungeonsAndDragons } = portfolioData;

  // Extract the sections from the dungeonsAndDragons object
  const sections = dungeonsAndDragons[0]?.sections || [];

  return (
    <DungeonsContainer>
      <DungeonsInnerContainer>
        <Title style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}>
          Dungeons & Dragons
         
        </Title>

        {/* Pass the extracted sections to MyStaggeredGrid */}
        <MyStaggeredGrid sections={sections} />
      </DungeonsInnerContainer>
    </DungeonsContainer>
  );
};

const DungeonsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const DungeonsInnerContainer = styled.div`
  padding-left: 4rem;
  padding-right: 4rem;
  margin-top: 6rem;
  @media screen and (max-width: 500px){
    padding-left: 2rem;
    padding-right: 2rem;
    margin-top: 3rem;
  }
`;

export default DungeonsAndDragons;