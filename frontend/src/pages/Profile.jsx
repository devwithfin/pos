import { useEffect, useState } from "react";

function Profile() {
  // const [id_user, setIdUser] = useState("");
  const [username, setUsername] = useState("");
  const [role_name, setRoleName] = useState("");

  useEffect(() => {
    // setIdUser(localStorage.getItem("id_user") || "");
    setUsername(localStorage.getItem("username") || "");
    setRoleName(localStorage.getItem("role_name") || "");
  }, []);

  return (
    <div className="bg-light p-4">
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0">
            <div
              className="card-header py-3 px-3"
              style={{ backgroundColor: "#F8F9FC" }}
            >
              <h6 className="mb-0 fw-semibold text-primary">Account Picture</h6>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4">
              <div>
                <img
                  src="/images/profile.svg"
                  alt="User Profile"
                  style={{ width: "13em", borderRadius: "50%" }}
                />
              </div>
              <button
                type="button"
                className="btn w-100 fw-medium mt-3"
                style={{ backgroundColor: "#4369D7", color: "#fff" }}
              >
                Change Picture
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-8 mb-3">
          <div className="card shadow border-0">
            <div
              className="card-header py-3 px-3"
              style={{ backgroundColor: "#F8F9FC" }}
            >
              <h6 className="mb-0 fw-semibold text-primary">Account Details</h6>
            </div>
            <div className="card-body p-3">
              <form className="mt-2">
                <div className="mb-3">
                  <label htmlFor="username" className="mb-2 text-secondary">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control py-2"
                    autoComplete="off"
                    placeholder="Username"
                    disabled
                    style={{ border: "1px solid #D1D3E2" }}
                    value={username}
                  />
                </div>

                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label htmlFor="fullname" className="mb-2 text-secondary">
                      Role Name
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      className="form-control py-2"
                      autoComplete="off"
                      placeholder="Full Name"
                      required
                      style={{ border: "1px solid #D1D3E2" }}
                      value={role_name}
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
