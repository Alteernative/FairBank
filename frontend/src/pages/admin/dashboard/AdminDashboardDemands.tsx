import React, { useEffect, useState } from "react";
import axiosInstance from "@/components/AxiosInstance.tsx";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashBoardDemands() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("dashboard_admin/list_all_requests/")
      .then((res) => {
        console.log("Fetched data:", res.data);
        setRequests(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  const handleApprove = (id) => {
    console.log(`dashboard_admin/${id}/approve-update/`);
    axiosInstance
      .post(`dashboard_admin/${id}/approve-update/`)
      .then((res) => {
        console.log("Approved:", res.data);
        setRequests(requests.filter((request) => request.id !== id));
      })
      .catch((error) => {
        console.error("Error approving request:", error);
      });
  };

  const handleDecline = (id) => {
    console.log(`dashboard_admin/${id}/approve-update`);
    axiosInstance
      .post(`dashboard_admin/${id}/decline-update/`)
      .then((res) => {
        console.log("Declined:", res.data);
        setRequests(requests.filter((request) => request.id !== id));
      })
      .catch((error) => {
        console.error("Error declining request:", error);
      });
  };

  return (
    <div className="admin-dashboard grid min-h-screen grid-cols-12">
      <aside className="sidebar col-span-2 bg-gray-800 p-4 text-white">
        <AdminSidebar />
      </aside>
      <main className="content col-span-10 p-4">
        <div className="requests">
          <h2 className="mb-4 text-xl font-bold">Pending User Updates</h2>
          {requests.length > 0 ? (
            <ul className="space-y-4">
              {requests.map((request) => (
                <li key={request.user} className="rounded border p-4 shadow">
                  <p>
                    <strong>User ID:</strong> {request.user}
                  </p>
                  <p>
                    <strong>Email:</strong> {request.email}
                  </p>
                  <p>
                    <strong>Current Name:</strong> {request.current_nom}{" "}
                    {request.current_prenom}
                  </p>
                  <p>
                    <strong>Requested Name:</strong> {request.tmp_nom}{" "}
                    {request.tmp_prenom}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleApprove(request.user)}
                      className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDecline(request.user)}
                      className="rounded bg-red-500 px-4 py-2 text-white"
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending updates</p>
          )}
        </div>
      </main>
    </div>
  );
}
