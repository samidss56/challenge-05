import { CDBModalFooter, CDBBtn, CDBIcon, CDBBox } from "cdbreact";

export const Footer = () => {
  return (
    <CDBModalFooter className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ width: "80%", height: "72px" }}
      >
        <CDBBox display="flex" alignItems="center">
          <span className="ms-0 h5 mb-0 font-weight-bold text-danger mx-4">
            <strong>MovieList</strong>
          </span>
        </CDBBox>
        <CDBBox>
          <small className="ms-2">
            &copy; MovieList, 2023. All rights reserved.
          </small>
        </CDBBox>
        <CDBBox display="flex">
          <CDBBtn flat color="danger" className="p-2">
            <CDBIcon fab icon="facebook-f" />
          </CDBBtn>
          <CDBBtn flat color="danger" className="mx-3 p-2">
            <CDBIcon fab icon="twitter" />
          </CDBBtn>
          <CDBBtn flat color="danger" className="p-2">
            <CDBIcon fab icon="instagram" />
          </CDBBtn>
        </CDBBox>
      </CDBBox>
    </CDBModalFooter>
  );
};
