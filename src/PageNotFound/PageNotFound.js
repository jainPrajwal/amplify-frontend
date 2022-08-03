import { useNavigate } from "react-router";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex jc-center ai-center f-direction-col mt-lg">
      <div
        className="header header-secondary text-black"
        style={{ maxWidth: "100%" }}
      >
        Ooops..! Maybe you landed some where else..!
      </div>
      <div>
        <button className="btn btn-danger" onClick={() => navigate(`/store`)}>
          Lets go back
        </button>
      </div>
      <img
        src="https://assets.materialup.com/uploads/26541cce-49c6-4e35-a055-e11b90ffad68/preview.gif"
        alt="404 Page Not Found!"
      />
    </div>
  );
};
export { PageNotFound };
