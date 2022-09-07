import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { organization } from "../../types/types";
import { api } from "../../utils/api";
import { ActiveEventList } from "../components/activeEventList";
import { AddMemberModal } from "../components/addMember";
import { SubHeading } from "../components/Heading";
import { ListComponent } from "../components/ListComponent";
import { Loader } from "../components/Loader";
import { DeleteModal } from "../components/modalBox";
import { Navbar } from "../components/navbar";
import { SettingBtn } from "../components/SettingBtn";
import { getAccessToken } from "../utils/accesstoken";

export const OrgDetail: React.FC = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [Data, setData] = useState<organization>();
  const [Loading, setLoading] = useState<boolean>(true);
  const [isMemberModalOpen, setMemberModalOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const accessToken = getAccessToken();
    api
      .get(`/org/${orgId}`, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((result) => {
        const { result: data, isAdmin } = result.data;
        setIsAdmin(isAdmin);
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex">
        <Navbar />
        {Loading && <Loader />}
        <div
          className={`${
            Loading && "hidden"
          } px-5 py-3 w-screen flex flex-col gap-y-14 relative max-h-screen overflow-auto pb-32`}
        >
          <div id="head" className="relative">
            <DeleteModal
              type="org"
              reqCloseBtn={(arg) => setShowDeleteModal(arg)}
              showDeleteModal={showDeleteModal}
              deletedItem={Data?.organization || ""}
              URI={`/org/${orgId}`}
            >
              <p>
                Yakin ingin menghapus <strong>{Data?.organization}</strong>?{" "}
                <br /> aksi ini akan{" "}
                <strong> menghapus organisasi dan riwayat acara</strong> secara
                permanen
              </p>
            </DeleteModal>
            {isAdmin && (
              <SettingBtn
                showDeleteModal={() => null}
                type=""
                showModal={(arg) => setShowDeleteModal(arg)}
              />
            )}
            <h1 className="text-xl font-bold">{Data?.organization}</h1>
            <p className="leading-loose">{Data?.description}</p>
          </div>

          <div id="activeEvents" className="flex flex-col gap-6">
            <div id="header2" className="flex justify-between">
              <SubHeading>Events</SubHeading>
              {isAdmin && (
                <Link
                  to={`/org/${orgId}/create_event`}
                  className="px-2 py-1 bg-blue-700 text-white rounded-xl text-md font-semibold"
                >
                  &#43; Event
                </Link>
              )}
            </div>
            <ActiveEventList orgId={orgId} activeList={Data?.voteEvents} />
          </div>

          <div id="members" className="flex flex-col gap-6">
            <div id="header2" className="flex justify-between">
              <div className="wrap flex items-center gap-3">
                <SubHeading>members</SubHeading>
                &#40;{Data?.members.length} anggota &#41;
              </div>
              {isAdmin && (
                <button
                  className="px-2 py-1 bg-blue-700 text-white rounded-xl text-md font-semibold"
                  onClick={() =>
                    isMemberModalOpen
                      ? setMemberModalOpen(false)
                      : setMemberModalOpen(true)
                  }
                >
                  {isMemberModalOpen ? "✖ close" : <p>&#43; member</p>}
                </button>
              )}
            </div>
            <AddMemberModal
              updateData={(data) => setData(data)}
              isAdmin={isAdmin}
              isOpen={isMemberModalOpen}
              orgId={orgId}
            />
            <ul className="border-b-2 border-slate-400 pb-5">
              {Data?.members.map((v, i) => (
                <ListComponent key={i}>
                  <div className="flex justify-between items-center">
                    <p>{v.name} </p>
                    {v.isAdmin && (
                      <p className="p-1 px-2 bg-yellow-500 rounded-xl text-gray-700">
                        {" "}
                        admin
                      </p>
                    )}
                  </div>
                </ListComponent>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
