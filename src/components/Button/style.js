import styled from "vue-styled-components";

const btnProps = { color: String };

export const ButtonWrapper = styled("button", btnProps)`
  background-color: ${({ theme, color }) => theme.colors[color]};
  padding: 12px 17px;
  border: none;
  color: white;
  border-radius: 7px;
  font-size: 16px;
  width: 100%;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme, color }) => theme.colors[`dark_${color}`]};
  }
`;
