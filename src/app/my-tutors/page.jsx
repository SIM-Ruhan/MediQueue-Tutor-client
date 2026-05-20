import { Delete } from "@/components/Delete";
import EditModal from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const TablePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const token = session?.session?.token;

  let tutors = [];

  // FIX 1: Prevent requesting /user/undefined if the email hasn't loaded yet
  if (user?.email) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/destination/user/${user.email}`,
      {
        cache: "no-store",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    // FIX 2: Safely check if response headers contain valid JSON
    const contentType = res.headers.get("content-type");
    if (res.ok && contentType && contentType.includes("application/json")) {
      tutors = await res.json();
    } else {
      // This prints the raw HTML error response directly to your terminal console for easy debugging
      const errorText = await res.text();
      console.error(`Backend returned non-JSON response (${res.status}):`, errorText);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f6f0 0%, #fefcf8 50%, #f0f4f8 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@600;700&display=swap');
        .page-wrapper { width: 90%; max-width: 1400px; margin: 0 auto; padding: 48px 0 80px; }
        .page-header { margin-bottom: 36px; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .page-title { font-family: 'Playfair Display', Georgia, serif; font-size: 2.6rem; font-weight: 700; color: #1a1a2e; letter-spacing: -0.5px; line-height: 1.1; margin: 0 0 6px; }
        .page-subtitle { color: #7a7a8c; font-size: 0.95rem; font-weight: 400; margin: 0; letter-spacing: 0.01em; }
        .tutor-count-badge { background: #1a1a2e; color: #f5e6c8; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 6px 16px; border-radius: 20px; white-space: nowrap; }
        .table-card { background: #ffffff; border-radius: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(26,26,46,0.08), 0 0 0 1px rgba(26,26,46,0.06); overflow: hidden; }
        .table-scroll { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        thead { background: linear-gradient(90deg, #1a1a2e 0%, #2d2d4e 100%); }
        thead th { color: #c8c8e0; font-family: 'DM Sans', sans-serif; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 16px 18px; text-align: left; white-space: nowrap; border: none; }
        thead th:first-child { color: #7070a0; width: 48px; text-align: center; }
        thead th:last-child { text-align: center; }
        tbody tr { border-bottom: 1px solid #f0eee8; transition: background 0.15s ease; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #faf8f4; }
        tbody td { padding: 15px 18px; color: #2e2e3e; vertical-align: middle; white-space: nowrap; }
        tbody tr th { padding: 15px 18px; color: #b0aec0; font-size: 0.78rem; font-weight: 500; text-align: center; vertical-align: middle; border-bottom: 1px solid #f0eee8; }
        tbody tr:last-child th { border-bottom: none; }
        .tutor-name { font-weight: 600; color: #1a1a2e; font-size: 0.9rem; }
        .subject-pill { display: inline-block; background: #eef2ff; color: #4355b5; font-size: 0.75rem; font-weight: 600; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.02em; }
        .mode-pill { display: inline-flex; align-items: center; gap: 5px; font-size: 0.78rem; font-weight: 500; padding: 3px 10px; border-radius: 20px; }
        .mode-online { background: #e8f8f2; color: #1a8a5a; }
        .mode-offline { background: #fff4e8; color: #b86a10; }
        .mode-both { background: #f0eaff; color: #6a3fbf; }
        .fee-text { font-weight: 600; color: #1a5c3a; font-size: 0.88rem; }
        .days-text { color: #5a5a7a; font-size: 0.82rem; }
        .time-text { color: #5a5a7a; font-size: 0.82rem; }
        .location-text { display: flex; align-items: center; gap: 5px; color: #5a5a7a; font-size: 0.82rem; }
        .institution-text { color: #5a5a7a; font-size: 0.82rem; max-width: 150px; overflow: hidden; text-overflow: ellipsis; display: inline-block; }
        .actions-cell { display: flex; gap: 8px; justify-content: center; align-items: center; }
        .empty-state { background: #ffffff; border-radius: 20px; box-shadow: 0 8px 32px rgba(26,26,46,0.08), 0 0 0 1px rgba(26,26,46,0.06); padding: 72px 40px; text-align: center; }
        .empty-icon { font-size: 3rem; margin-bottom: 16px; opacity: 0.4; }
        .empty-title { font-family: 'Playfair Display', serif; font-size: 1.6rem; font-weight: 600; color: #1a1a2e; margin: 0 0 8px; }
        .empty-subtitle { color: #9090a8; font-size: 0.92rem; margin: 0; }
        .table-footer { padding: 12px 20px; border-top: 1px solid #f0eee8; background: #faf8f4; display: flex; align-items: center; justify-content: flex-end; }
        .footer-note { font-size: 0.75rem; color: #b0aec0; font-style: italic; }
      `}</style>

      <div className="page-wrapper">
        <div className="page-header">
          <div>
            <h1 className="page-title">My Tutors</h1>
            <p className="page-subtitle">Manage all tutor sessions created by you.</p>
          </div>
          {tutors.length > 0 && (
            <span className="tutor-count-badge">{tutors.length} Sessions</span>
          )}
        </div>

        {tutors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h2 className="empty-title">No Tutors Found</h2>
            <p className="empty-subtitle">You have not added any tutor sessions yet or authentication failed.</p>
          </div>
        ) : (
          <div className="table-card">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tutor Name</th>
                    <th>Subject</th>
                    <th>Mode</th>
                    <th>Days</th>
                    <th>Time</th>
                    <th>Fee</th>
                    <th>Location</th>
                    <th>Institution</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tutors.map((tutor, index) => {
                    const mode = tutor.teachingMode?.toLowerCase();
                    const modeClass =
                      mode === "online" ? "mode-pill mode-online"
                      : mode === "offline" ? "mode-pill mode-offline"
                      : "mode-pill mode-both";

                    return (
                      <tr key={tutor._id}>
                        <th>{index + 1}</th>
                        <td><span className="tutor-name">{tutor.tutorName}</span></td>
                        <td><span className="subject-pill">{tutor.subject}</span></td>
                        <td><span className={modeClass}>{tutor.teachingMode}</span></td>
                        <td><span className="days-text">{tutor.availableDays}</span></td>
                        <td><span className="time-text">{tutor.availableTime}</span></td>
                        <td><span className="fee-text">৳ {tutor.hourlyFee}</span></td>
                        <td>
                          <span className="location-text">
                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none">
                              <path d="M5.5 0C3.01 0 1 2.01 1 4.5c0 3.37 4.5 8.5 4.5 8.5S10 7.87 10 4.5C10 2.01 7.99 0 5.5 0zm0 6.25A1.75 1.75 0 1 1 5.5 2.75a1.75 1.75 0 0 1 0 3.5z" fill="#b0aec0" />
                            </svg>
                            {tutor.location}
                          </span>
                        </td>
                        <td>
                          <span className="institution-text" title={tutor.institution}>
                            {tutor.institution}
                          </span>
                        </td>
                        <td>
                          <div className="actions-cell">
                            <div><EditModal tutor={tutor} /></div>
                            <div><Delete tutor={tutor} /></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span className="footer-note">Showing all {tutors.length} tutor sessions</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TablePage;