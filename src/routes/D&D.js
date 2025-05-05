import styled from 'styled-components';
import portfolioData from '../portfolioData';
import MyStaggeredGrid from '../components/sections/MyStaggeredGrid';
import { Title } from './Home';
import lodash from 'lodash-es';
import Links, { Links as DLinks } from '../components/Links/Links';
import { Subtitle } from '../components/common/StyledComponents';

const DungeonsAndDragons = () => {
  const { dungeonsAndDragons } = portfolioData;

  // Extract the sections from the dungeonsAndDragons object
  const sections = dungeonsAndDragons[0]?.sections || [];
  const { title, description, links, images, videos, time, team } = dungeonsAndDragons[0];

  return (
    <DungeonsContainer>
      <DungeonsInnerContainer>
      {!lodash.isEmpty(title)&&
        <Title style={{

          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",

        }}>{title}</Title>
      }

{!lodash.isEmpty(links)&&
        <Links style={{

          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }} links={links} color='white' />
      }
       {!lodash.isEmpty(time)&&
        <Text style={{

          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>Time taken: {time}</Text>
      }

{!lodash.isEmpty(team)&&
        <Text style={{

          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>Team: {team}</Text>
      }
        <br></br>

        {!lodash.isEmpty(description)&&
        <Subtitle style={{

          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }} > <b>{description}</b></Subtitle>
      }

<div className='divider'><span></span><span>Gallery</span><span></span></div>
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

const Text = styled.p`
`;

export default DungeonsAndDragons;