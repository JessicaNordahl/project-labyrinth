import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLabyrinth } from '../reducers/labyrinth';
import EndPage from './EndPage';

// styling of components, with mobile-first responsiveness:
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: 0.8;
  background-color: #3c4f34;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  color: white;
`;
const LabyrinthCard = styled.section`
  width: 275px;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 10px;
  @media (min-width: 768px) {
    width: 500px;
  }
`;
const Description = styled.p`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: yellow;
`;
const ItemDescription = styled.p`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
`;
const Button = styled.button`
  width: 150px;
  background: #3c4f34;
  border-radius: 5px;
  padding: 8px;
  color: rgb(236, 236, 126);
  font-family: 'Courgette', cursive;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1.5px;
`;

const Labyrinth = () => {
  const labyrinth = useSelector((store) => store.labyrinth.destination);
  // this comes from the Loading-component
  const loading = useSelector((store) => store.animation.loading);
  const dispatch = useDispatch();
  //this gives different background images depending on what question the user is on, in the labyrinth:
  const setBgImage = (coordinates) => {
    let bg = 'black';
    switch (
      coordinates //switch: needs a case that ends with a break, -then more cases can be added
    ) {
      case '0,0':
        bg =
          'url(https://images.unsplash.com/photo-1471045220822-f3f0ad3a5416?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80) ';
        break;
      case '1,0':
        bg =
          'url(https://images.unsplash.com/photo-1467745870897-1f66443c8c04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=354&q=80) ';
        break;
      case '1,1':
        bg =
          'url(https://images.unsplash.com/photo-1428737289360-ca73c271d197?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80)';
        break;
      case '0,1':
        bg =
          'url(https://images.unsplash.com/photo-1611643892561-9759a32e0c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)';
        break;
      case '0,2':
        bg =
          'url(https://images.unsplash.com/photo-1533693637260-257bd3834be2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80)';
        break;
      case '0,3':
        bg =
          'url(https://images.unsplash.com/photo-1540979730456-da51523895df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)';
        break;
      case '1,3':
        bg =
          'url(https://images.unsplash.com/photo-1541429222367-285a893182f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)';
        break;
      default:
        bg = 'black';
    }
    return bg;
  };
  return (
    loading === false && ( //to make the loading-spinner show in-between fetch
      <Wrapper
        style={{
          background: setBgImage(labyrinth.coordinates),
          backgroundSize: 'cover',
        }}
      >
        <LabyrinthCard>
          <Description>{labyrinth.description}</Description>
          <div>
            {labyrinth.actions !== undefined && //this is required because the labyrinth is mounted, and username needs to me written and button clicked first, before it should appear
              labyrinth.actions.map((item) => (
                <div key={item.description}>
                  {' '}
                  {/*key to make .map work*/}
                  <ItemDescription>{item.description}</ItemDescription>
                  <Button
                    onClick={() => {
                      dispatch(
                        fetchLabyrinth({
                          //second fetch
                          url: 'https://wk16-backend.herokuapp.com/action',
                          type: 'move',
                          direction: item.direction,
                        })
                      );
                    }}
                  >
                    Go {item.direction}
                  </Button>
                </div>
              ))}
            {labyrinth.actions.length === 0 && ( //when the labyrinth is ended, the EndPage is mounted
              <EndPage />
            )}
          </div>
        </LabyrinthCard>
      </Wrapper>
    )
  );
};

export default Labyrinth;
