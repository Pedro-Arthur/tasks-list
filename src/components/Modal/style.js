import styled from "vue-styled-components";

export const ModalMask = styled.div`
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
`;

export const ModalWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
`;

export const ModalContainer = styled.div`
  max-width: 800px;
  margin: 0px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  border-radius: 7px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 20px;

  h3 {
    margin: 0px;
  }
`;

export const ModalClose = styled.div`
  cursor: pointer;
`;
