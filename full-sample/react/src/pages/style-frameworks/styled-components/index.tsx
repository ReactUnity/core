import { useState } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: yellow;
  color: black;
  border: 2px solid black;

  ${props => props.toggled && css`
    background: white;
    color: black;
  `}
`;


export function StyledComponentsPage() {
  const [toggled, setToggled] = useState(false);

  return <>
    <div>
      <Button toggled={toggled} onClick={() => setToggled(x => !x)}>Styled Button</Button>
    </div>
  </>;
}

export default StyledComponentsPage;
