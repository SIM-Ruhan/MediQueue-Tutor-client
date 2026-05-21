import { BookingDelete } from "@/components/BookingDelete";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const BookedSessionPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const token = session?.session?.token;

  let bookings = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/booking/${user?.email}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      const data = await res.json();
      bookings = Array.isArray(data) ? data : [];
      if (!Array.isArray(data)) {
        console.error("API did not return an array:", data);
      }
    } else {
      console.error("Fetch failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Fetch error:", err);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8f6f0 0%, #fefcf8 50%, #f0f4f8 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');

        .page-wrapper {
          width: 90%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 0 80px;
        }
        .page-header {
          margin-bottom: 36px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .page-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.4rem;
          font-weight: 700;
          color: #1a1a2e;
          letter-spacing: -0.5px;
          margin: 0 0 6px;
        }
        .page-subtitle {
          color: #7a7a8c;
          font-size: 0.95rem;
          margin: 0;
        }
        .count-badge {
          background: #1a1a2e;
          color: #f5e6c8;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 6px 16px;
          border-radius: 20px;
        }
        .table-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(26,26,46,0.08), 0 0 0 1px rgba(26,26,46,0.06);
          overflow: hidden;
        }
        .table-scroll { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        thead {
          background: linear-gradient(90deg, #1a1a2e 0%, #2d2d4e 100%);
        }
        thead th {
          color: #c8c8e0;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 16px 20px;
          text-align: left;
          white-space: nowrap;
        }
        thead th:last-child { text-align: center; }
        tbody tr {
          border-bottom: 1px solid #f0eee8;
          transition: background 0.15s ease;
        }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: #faf8f4; }
        tbody td {
          padding: 16px 20px;
          color: #2e2e3e;
          vertical-align: middle;
          white-space: nowrap;
        }
        .tutor-name {
          font-weight: 600;
          color: #1a1a2e;
          font-size: 0.9rem;
        }
        .student-name { color: #3a3a5a; font-weight: 500; }
        .email-text { color: #7a7a9a; font-size: 0.82rem; }
        .status-booked {
          display: inline-block;
          background: #e8f8f2;
          color: #1a8a5a;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.03em;
        }
        .status-cancelled {
          display: inline-block;
          background: #fff2f2;
          color: #c0392b;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 20px;
          letter-spacing: 0.03em;
        }
        .cancel-btn {
          display: block;
          margin: 0 auto;
          background: #fff2f2;
          color: #c0392b;
          border: 1.5px solid #f5c0bb;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 5px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .cancel-btn:hover {
          background: #c0392b;
          color: #fff;
          border-color: #c0392b;
        }
        .cancel-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .table-footer {
          padding: 12px 20px;
          border-top: 1px solid #f0eee8;
          background: #faf8f4;
          display: flex;
          justify-content: flex-end;
        }
        .footer-note { font-size: 0.75rem; color: #b0aec0; font-style: italic; }
        .empty-state {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 8px 32px rgba(26,26,46,0.08), 0 0 0 1px rgba(26,26,46,0.06);
          padding: 72px 40px;
          text-align: center;
        }
        .empty-icon { font-size: 3rem; margin-bottom: 16px; opacity: 0.35; }
        .empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 8px;
        }
        .empty-subtitle { color: #9090a8; font-size: 0.92rem; margin: 0; }
      `}</style>

      <div className="page-wrapper">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">My Booked Sessions</h1>
            <p className="page-subtitle">
              All tutoring sessions you have booked.
            </p>
          </div>
          {bookings.length > 0 && (
            <span className="count-badge">
              {bookings.length} Booking{bookings.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h2 className="empty-title">No Bookings Yet</h2>
            <p className="empty-subtitle">
              You have not booked any tutor sessions yet. Browse tutors to get
              started.
            </p>
          </div>
        ) : (
          <div className="table-card">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tutor Name</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking._id}>
                      <td
                        style={{
                          color: "#b0aec0",
                          fontSize: "0.78rem",
                          width: 48,
                        }}
                      >
                        {index + 1}
                      </td>
                      <td>
                        <span className="tutor-name">{booking.tutorName}</span>
                      </td>
                      <td>
                        <span className="student-name">
                          {booking.studentName}
                        </span>
                      </td>
                      <td>
                        <span className="email-text">
                          {booking.studentEmail}
                        </span>
                      </td>
                      <td>
                        <span
                          className={
                            booking.bookStatus === "Cancelled"
                              ? "status-cancelled"
                              : "status-booked"
                          }
                        >
                          {booking.bookStatus}
                        </span>
                      </td>
                      <td>
                        <div
                          className="cancel-btn"
                          disabled={booking.bookStatus === "Cancelled"}
                        >
                          <BookingDelete bookingId={booking._id}/>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <span className="footer-note">
                Showing all {bookings.length} booked session
                {bookings.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookedSessionPage;