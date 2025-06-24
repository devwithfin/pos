import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [username, setUsername] = useState("");
  const [roleName, setRoleName] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userId = localStorage.getItem("id_user")
  const navigate = useNavigate();

  const handlePasswordChange = async (e) => {
  e.preventDefault();

  if (!oldPassword || !newPassword || !confirmPassword) {
    return Swal.fire("Warning", "Please fill in all fields.", "warning");
  }

  if (newPassword !== confirmPassword) {
    return Swal.fire("Warning", "New password and confirmation do not match.", "warning");
  }

  try {
    const res = await axios.put("http://localhost:4000/api/change-password", {
      user_id: userId,
      oldPassword,
      newPassword,
    });

    await Swal.fire("Success", res.data.message, "success");

    localStorage.clear();

    navigate("/login");

  } catch (error) {
    console.error(error);
    Swal.fire(
      "Error",
      error.response?.data?.message || "Failed to change password.",
      "error"
    );
  }
};

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsername(res.data.username);
        setRoleName(res.data.role_name);
        setLastUpdated(new Date(res.data.updated_at).toLocaleString());
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);



  return (
    <div className="bg-light p-4">
      <div className="row">
        <div className="col-md-4 mb-3 d-flex flex-column">
          <div className="card shadow border-0 h-100 d-flex flex-column">
            <div
              className="card-header py-3 px-3"
              style={{ backgroundColor: "#F8F9FC" }}
            >
              <h6 className="mb-0 fw-semibold text-primary">Account Picture</h6>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center p-4 flex-grow-1">
              <div>
                <img
                  src="/images/profile.svg"
                  alt="User Profile"
                  style={{ width: "13em", borderRadius: "50%" }}
                />
              </div>
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

                <div className="mb-3">
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
                    value={roleName}
                    disabled
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="card shadow border-0 mt-3">
            <div
              className="card-header py-3 px-3"
              style={{ backgroundColor: "#F8F9FC" }}
            >
              <h6 className="mb-0 fw-semibold text-primary">Change Password</h6>
            </div>
            <div className="card-body p-3">
             <form className="mt-2" onSubmit={handlePasswordChange}>
  <div className="mb-3">
    <input
      type="password"
      className="form-control py-2"
      placeholder="Old Password"
      value={oldPassword}
      onChange={(e) => setOldPassword(e.target.value)}
      style={{ border: "1px solid #D1D3E2" }}
    />
  </div>

  <div className="mb-3">
    <input
      type="password"
      className="form-control py-2"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      style={{ border: "1px solid #D1D3E2" }}
    />
  </div>

  <div className="mb-3">
    <input
      type="password"
      className="form-control py-2"
      placeholder="Confirm New Password"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      style={{ border: "1px solid #D1D3E2" }}
    />
  </div>

  <button
    type="submit"
    className="btn fw-medium w-100"
    style={{ backgroundColor: "#4369D7", color: "#fff" }}
  >
    Change Password
  </button>
</form>


              <div className="mt-3">
                <p className="small">Last Updated: {lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
