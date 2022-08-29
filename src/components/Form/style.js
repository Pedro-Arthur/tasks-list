import styled from "vue-styled-components";

export const FormWrapper = styled.form`
  width: 500px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 20px;
  border-radius: 7px;
  margin: 0 auto;
`;

export const InputWrapper = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 7px;
`;

export const FormTitle = styled.h5`
  font-size: 20px;
  margin: 0 0 20px;
`;
