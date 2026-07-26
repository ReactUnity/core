import { css } from '@emotion/css';
import styled from '@emotion/styled';

const Button = styled.button`
  margin: 20px;
  padding: 32px;
  background-color: crimson;
  font-size: 24px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  &:hover {
    color: yellow;
  }
`;
const color = 'white';

export function EmotionPage() {
  // const [toggled, setToggled] = useState(false);

  return <>
    <div
      className={css`
      padding: 32px;
      background-color: hotpink;
      font-size: 24px;
      border-radius: 4px;
      &:hover {
        color: ${color};
      }
    `}
    >
      Hover to change color.
    </div>

    <Button>Emotion button</Button>
  </>;
}

export default EmotionPage;
