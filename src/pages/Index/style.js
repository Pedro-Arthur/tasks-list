import styled from "vue-styled-components";

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  button {
    width: 200px;
  }

  h1 {
    margin: 0px;
  }
`;

export const TaskContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Container = styled.div`
  padding: 20px;
`;
