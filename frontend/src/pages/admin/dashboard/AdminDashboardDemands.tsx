import { useEffect, useState } from "react";
import axiosInstance from "@/components/AxiosInstance.tsx";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
<<<<<<< Updated upstream
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
=======
>>>>>>> Stashed changes

type ContactUs = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  message: string;
};

type UpdateRequest = {
  user: number;
  email: string;
  current_nom: string;
  current_prenom: string;
  tmp_nom: string;
  tmp_prenom: string;
  tmp_email: string;
};

type DeleteRequest = {
  id: number;
  user_email: string;
};
export default function AdminDashBoardDemands() {
  const [updateRequests, setUpdateRequests] = useState<UpdateRequest[]>([]);
  const [deleteRequests, setDeleteRequests] = useState<DeleteRequest[]>([]);
  const [, setUser] = useState<ContactUs | null>(null);

  useEffect(() => {
    axiosInstance
      .get("dashboard_admin/list_all_contactUs/")
      .then((res) => {
        setUser(res.data);
        console.log("The Contact Us messages are ", res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("dashboard_admin/list_all_requests/")
      .then((res) => {
        console.log("Fetched update requests:", res.data);
        setUpdateRequests(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the update requests!", error);
      });

    axiosInstance
      .get("dashboard_admin/pending-deletes/")
      .then((res) => {
        console.log("Fetched delete requests:", res.data);
        setDeleteRequests(res.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the delete requests!", error);
      });
  }, []);

  const handleApproveUpdate = (id: number) => {
    axiosInstance
      .post(`dashboard_admin/${id}/approve-update/`)
      .then((res) => {
        console.log("Approved update request:", res.data);
        setUpdateRequests(updateRequests.filter((request) => request.user !== id));
      })
      .catch((error) => {
        console.error("Error approving update request:", error);
      });
  };

  const handleDeclineUpdate = (id: number) => {
    axiosInstance
      .post(`dashboard_admin/${id}/decline-update/`)
      .then((res) => {
        console.log("Declined update request:", res.data);
        setUpdateRequests(updateRequests.filter((request) => request.user !== id));
      })
      .catch((error) => {
        console.error("Error declining update request:", error);
      });
  };

  const handleApproveDelete = (id: number) => {
    axiosInstance
      .post(`dashboard_admin/${id}/approve-delete/`)
      .then((res) => {
        console.log("Approved delete request:", res.data);
        setDeleteRequests(deleteRequests.filter((request) => request.id !== id));
      })
      .catch((error) => {
        console.error("Error approving delete request:", error);
      });
  };

  const handleDeclineDelete = (id: number) => {
    axiosInstance
      .post(`dashboard_admin/${id}/deny-delete/`)
      .then((res) => {
        console.log("Declined delete request:", res.data);
        setDeleteRequests(deleteRequests.filter((request) => request.id !== id));
      })
      .catch((error) => {
        console.error("Error declining delete request:", error);
      });
  };

  return (
    <section className="ml-14 min-h-screen w-full bg-muted/20 px-3 py-5 sm:px-10 lg:ml-52 lg:px-5">
      <h1 className="mb-10 font-jomhuria text-6xl">Requests</h1>
      <main className="flex flex-col gap-10">
        <div className="mb-5 w-full">
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Profile Updates</h2>
          <div className="space-y-2 rounded-lg border px-5 py-3 shadow bg-background">
            {updateRequests.length > 0 ? (
              updateRequests.map((request: UpdateRequest) => (
                <div key={request.user} className="flex flex-wrap items-center justify-between gap-4">
                  {request.email !== request.tmp_email ? (
                    <>
                      <div className="flex flex-col">
                        <p className="text-base "><strong>Current Email :</strong> {request.email}</p>
                        <p className="text-base "><strong>Requested Email :</strong> {request.tmp_email}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col">
                        <p className="text-base"><strong>Current Name :</strong> {request.current_nom} {request.current_prenom}</p>
                        <p className="text-base"><strong>Requested Name :</strong> {request.tmp_nom} {request.tmp_prenom}</p>
                      </div>
                    </>
                  )}
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => handleApproveUpdate(request.user)}
                      className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
                    >
                      <Check />
                    </Button>
                    <Button
                      type="button"
                      size={"icon"}
                      onClick={() => handleDeclineUpdate(request.user)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      <X />
                    </Button>
                  </div>
                  <Separator />
                </div>
              ))
            ) : (
              <p>No Profile Update Requests</p>
            )}
          </div>
        </div>

        <div className="mb-5 w-full">
          <h2 className="mb-3 text-lg font-semibold tracking-tight">Deletions</h2>
          <div className="space-y-2 rounded-lg border px-5 py-3 shadow bg-background">
            {deleteRequests.length > 0 ? (
              deleteRequests.map((request: DeleteRequest) => (
                <div key={request.id} className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-base"><strong>User Id :</strong> {request.id}</p>
                    <p className="text-base "><strong>Current user email :</strong> {request.user_email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      size={"icon"}
                      variant={"outline"}
                      onClick={() => handleApproveDelete(request.id)}
                      className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
                    >
                      <Check />
                    </Button>
                    <Button
                      type="button"
                      size={"icon"}
                      onClick={() => handleDeclineDelete(request.id)}
                      className="bg-red-500 text-white hover:bg-red-600"
                    >
                      <X />
                    </Button>
                  </div>
                  <Separator />
                </div>
              ))
            ) : (
              <p>No Deletion Requests</p>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}
