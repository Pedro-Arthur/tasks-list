import styled from "vue-styled-components";

export const InputWrapper = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #000;
  border-radius: 7px;

  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;
