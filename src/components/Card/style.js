import styled from "vue-styled-components";

export const CardWrapper = styled.div`
  width: 500px;
  padding: 20px;
  border-radius: 7px;
  margin: 0 auto;
  background-color: #eee;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

export const CardLine = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 5px;
  }
`;
