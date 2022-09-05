import styled from "vue-styled-components";

export const CardWrapper = styled.div`
  width: 500px;
  padding: 20px;
  border-radius: 7px;
  margin: 0 auto;
  background-color: #f0f0f0;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const CardLine = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 5px;
  }
`;

export const CardTitle = styled.h3`
  margin: 5px;
  text-align: center;
`;
