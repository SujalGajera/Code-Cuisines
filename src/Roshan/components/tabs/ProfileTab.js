import React from "react";

export default function ProfileTab({
  profile,
  profileDraft,
  setProfileDraft,
  newSkill,
  setNewSkill,
  addSkill,
  removeSkill,
  saveProfile,
  resetProfileDraft,
  handleAvatarChange,
  handleProfileFieldChange,
}) {
  return (
    <div
      className="cb-tablecard"
      style={{ maxWidth: 960, margin: "32px auto" }}
    >
      <div
        style={{
          display: "flex",
          gap: "32px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* Avatar */}
        <div style={{ minWidth: 180, textAlign: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              overflow: "hidden",
              background: "#ffe8d9",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#9b4a0f",
              margin: "0 auto 12px",
            }}
          >
            {profileDraft.avatar ? (
              <img
                src={profileDraft.avatar}
                alt="Avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              (profileDraft.name || "R").charAt(0).toUpperCase()
            )}
          </div>

          <label
            className="cb-add"
            style={{
              display: "inline-block",
              padding: "0.45rem 0.9rem",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Change Photo
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        {/* Profile form */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <h2
            style={{
              marginTop: 0,
              marginBottom: 16,
              fontSize: 22,
              color: "#2f1f1f",
            }}
          >
            Profile Details
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px 24px",
            }}
          >
            <div>
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#3c2c2c",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                value={profileDraft.name}
                onChange={(e) =>
                  handleProfileFieldChange("name", e.target.value)
                }
                className="input-clean"
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#3c2c2c",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Role
              </label>
              <input
                type="text"
                value={profileDraft.role}
                onChange={(e) =>
                  handleProfileFieldChange("role", e.target.value)
                }
                className="input-clean"
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#3c2c2c",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Work Email
              </label>
              <input
                type="email"
                value={profileDraft.email}
                onChange={(e) =>
                  handleProfileFieldChange("email", e.target.value)
                }
                className="input-clean"
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#3c2c2c",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Phone Number
              </label>
              <input
                type="text"
                value={profileDraft.phone}
                onChange={(e) =>
                  handleProfileFieldChange("phone", e.target.value)
                }
                className="input-clean"
              />
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginTop: 24 }}>
            <label
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#3c2c2c",
                display: "block",
                marginBottom: 6,
              }}
            >
              Responsibilities / Skills
            </label>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {(profileDraft.skills || []).map((skill) => (
                <span
                  key={skill}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 10px",
                    borderRadius: 999,
                    background: "#fff3e0",
                    fontSize: 13,
                    color: "#8a4510",
                    border: "1px solid #f3d2a3",
                  }}
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    style={{
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: 14,
                      lineHeight: 1,
                      color: "#c35a0c",
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
              {(!profileDraft.skills || profileDraft.skills.length === 0) && (
                <span style={{ fontSize: 13, color: "#7a6e6e" }}>
                  No skills added yet.
                </span>
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: 8,
                maxWidth: 360,
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Add new skill (e.g. Walk-ins)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                className="input-clean"
              />
              <button
                type="button"
                className="cb-add"
                style={{ padding: "0.55rem 0.9rem", whiteSpace: "nowrap" }}
                onClick={addSkill}
              >
                + Add
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div
            className="cb-modal-actions"
            style={{ marginTop: 28, justifyContent: "flex-end" }}
          >
            <button
              type="button"
              className="cancel-btn"
              onClick={resetProfileDraft}
            >
              Reset
            </button>
            <button type="button" className="save-btn" onClick={saveProfile}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
