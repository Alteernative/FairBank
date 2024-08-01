import React, { useEffect, useState } from "react";
import axiosInstance from "@/components/AxiosInstance.tsx";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashBoardDemands() {
  const [updateRequests, setUpdateRequests] = useState([]);
  const [deleteRequests, setDeleteRequests] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("dashboard_admin/list_all_requests/")
      .then((res) => {
        console.log("Fetched update requests:", res.data);
        setUpdateRequests(res.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the update requests!",
          error
        );
      });

    axiosInstance
      .get("dashboard_admin/pending-deletes/")
      .then((res) => {
        console.log("Fetched delete requests:", res.data);
        setDeleteRequests(res.data);
      })
      .catch((error) => {
        console.error(
          "There was an error fetching the delete requests!",
          error
        );
      });
  }, []);

  const handleApproveUpdate = (id) => {
    axiosInstance
      .post(`dashboard_admin/${id}/approve-update/`)
      .then((res) => {
        console.log("Approved update request:", res.data);
        setUpdateRequests(
          updateRequests.filter((request) => request.user !== id)
        );
      })
      .catch((error) => {
        console.error("Error approving update request:", error);
      });
  };

  const handleDeclineUpdate = (id) => {
    axiosInstance
      .post(`dashboard_admin/${id}/decline-update/`)
      .then((res) => {
        console.log("Declined update request:", res.data);
        setUpdateRequests(
          updateRequests.filter((request) => request.user !== id)
        );
      })
      .catch((error) => {
        console.error("Error declining update request:", error);
      });
  };

  const handleApproveDelete = (id) => {
    console.log("the id to delete is : ", id);
    axiosInstance
      .post(`dashboard_admin/${id}/approve-delete/`)
      .then((res) => {
        console.log("Approved delete request:", res.data);
        setDeleteRequests(
          deleteRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error approving delete request:", error);
      });
  };

  const handleDeclineDelete = (id) => {
    axiosInstance
      .post(`dashboard_admin/${id}/deny-delete/`)
      .then((res) => {
        console.log("Declined delete request:", res.data);
        setDeleteRequests(
          deleteRequests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => {
        console.error("Error declining delete request:", error);
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
          {updateRequests.length > 0 ? (
            <ul className="space-y-4">
              {updateRequests.map((request) => (
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
                      onClick={() => handleApproveUpdate(request.user)}
                      className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeclineUpdate(request.user)}
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

        <div className="delete-requests mt-8">
          <h2 className="mb-4 text-xl font-bold">Pending Delete Requests</h2>
          {deleteRequests.length > 0 ? (
            <ul className="space-y-4">
              {deleteRequests.map((request) => (
                <li key={request.id} className="rounded border p-4 shadow">
                  <p>
                    <strong>User ID:</strong> {request.id}
                  </p>
                  <p>
                    <strong>Email:</strong> {request.user_email}
                  </p>
                  <p>
                    <strong>Name:</strong> {request.user_first_name}{" "}
                    {request.user_last_name}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleApproveDelete(request.id)}
                      className="mr-2 rounded bg-green-500 px-4 py-2 text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleDeclineDelete(request.id)}
                      className="rounded bg-red-500 px-4 py-2 text-white"
                    >
                      Decline
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No pending delete requests</p>
          )}
        </div>
      </main>
    </div>
  );
}
