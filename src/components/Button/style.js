import styled from "vue-styled-components";

const btnProps = { color: String };

export const ButtonWrapper = styled("button", btnProps)`
  background-color: ${({ theme, color }) => theme.colors[color]};
`;
