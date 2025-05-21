import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/patient/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("patientToken")}`
          }
        });
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
  
    fetchProfile();
  }, []);
  

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-primary">My Profile</h2>

      {profile ? (
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title mb-3">{profile.name}</h4>
            <div className="row">
              <div className="col-md-6 mb-3">
                <strong>Email:</strong> <br />
                {profile.email}
              </div>
              <div className="col-md-6 mb-3">
                <strong>Phone:</strong> <br />
                {profile.phone}
              </div>
              <div className="col-md-6 mb-3">
                <strong>Gender:</strong> <br />
                {profile.gender}
              </div>
              <div className="col-md-6 mb-3">
                <strong>Date of Birth:</strong> <br />
                {new Date(profile.dateOfBirth).toLocaleDateString("en-GB")}
              </div>
              <div className="col-md-6 mb-3">
                <strong>Blood Group:</strong> <br />
                {profile.bloodGroup}
              </div>
              <div className="col-md-12 mb-3">
                <strong>Address:</strong> <br />
                {profile.address}
              </div>
            </div>

            <button className="btn btn-outline-primary mt-3" disabled>
              Edit Profile (Coming Soon)
            </button>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
