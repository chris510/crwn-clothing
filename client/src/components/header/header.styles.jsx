import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  @media screen and (max-width: 800px) {
      height: 6rem;
      padding: 1rem;
      margin-bottom: 0;
    }
`

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 7rem;
  padding: 2.5rem;

  @media screen and (max-width: 800px) {
    width: 5rem;
    padding: 0;
  }
`

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: .5s all ease-in;

  @media screen and (max-width: 800px) {
    width: 80%;
  }
`

export const OptionLink = styled(Link)`
  padding: 1rem 1.5rem;
  font-size: 2rem;
  font-weight: 300;
`

