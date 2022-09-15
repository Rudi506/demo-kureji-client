import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { members, organization } from "../../types/types";
import { api } from "../../utils/api";
import { ActiveEventList } from "../components/activeEventList";
import { SetMembers } from "../components/SetMembers";
import { AddMemberModal } from "../components/addMember";
import { SubHeading } from "../components/Heading";
import { ListComponent } from "../components/ListComponent";
import { Loader } from "../components/Loader";
import {
  DeleteModal,
  SetMembersModalsBox,
  SuccessModal,
} from "../components/modalBox";
import { Navbar } from "../components/navbar";
import { SettingBtn } from "../components/SettingBtn";
import { getAccessToken } from "../utils/accesstoken";

export const dataContext = createContext({} as organization | undefined);

export const OrgDetail: React.FC = () => {
  const { orgId } = useParams<{ orgId: string }>();
  const [Data, setData] = useState<organization>();
  const [Loading, setLoading] = useState<boolean>(true);
  const [isMemberModalOpen, setMemberModalOpen] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState<number | null>();
  const [showSetMemberModal, setShowSetMemberModal] = useState<string | null>(
    null
  );
  const [member, setMember] = useState<{
    name: string | null;
    id: string | null;
  }>({
    name: "",
    id: "",
  });
  const [Msg, setMsg] = useState("");
  const [Anim, setAnim] = useState<boolean>(false);
  const accessToken = getAccessToken();

  useEffect(() => {
    api
      .get(`/org/${orgId}`, {
        headers: {
          "auth-token": accessToken ? `Bearer ${accessToken}` : "",
        },
      })
      .then((result) => {
        const { result: data, isAdmin, userId } = result.data;
        setUserId(userId);
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
      <dataContext.Provider value={Data}>
        <div className="flex">
          <Navbar />
          {Loading && <Loader />}
          <div
            className={`${
              Loading && "hidden"
            } px-5 py-3 w-screen flex flex-col gap-y-14 relative max-h-screen overflow-auto pb-32`}
          >
            <SuccessModal
              anim={Anim}
              msg={{ msg: Msg }}
              setAnim={(anim) => setAnim(anim)}
            />
            {
              // !=============== HEAD COMPONENT =======================
              // ! ===== Modals are put bellow
            }
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
                  <strong> menghapus organisasi dan riwayat acara</strong>{" "}
                  secara permanen
                </p>
              </DeleteModal>
              <SetMembersModalsBox
                type={showSetMemberModal}
                showModal={showSetMemberModal !== null}
                reqCloseBtn={(arg) => setShowSetMemberModal(arg)}
                memberData={member}
                URI={
                  showSetMemberModal === "setAdmin"
                    ? `/org/${orgId}/add_admin`
                    : showSetMemberModal === "removeAdmin"
                    ? `/org/${orgId}/remove_admin`
                    : showSetMemberModal === "removeMember"
                    ? `/org/${orgId}/remove_member`
                    : ""
                }
                updateData={(data) => setData(data)}
                setAnim={(boolean) => setAnim(boolean)}
                setMsg={(msg) => setMsg(msg)}
              >
                {showSetMemberModal === "setAdmin" && (
                  <p>jadikan {member.name} sebagi Admin?</p>
                )}
                {showSetMemberModal === "removeAdmin" && (
                  <p>hapus {member.name} dari Admin?</p>
                )}
                {showSetMemberModal === "removeMember" && (
                  <p>hapus {member.name} dari Organisasi?</p>
                )}
              </SetMembersModalsBox>
              {isAdmin && (
                <SettingBtn
                  showDeleteModal={() => null}
                  type="orgDetailBtn"
                  showModal={(arg) => setShowDeleteModal(arg)}
                />
              )}
              <h1 className="text-xl font-bold">{Data?.organization}</h1>
              <p className="leading-loose">{Data?.description}</p>
            </div>
            {
              // !========= ACTIVE EVENT COMPONENT ===========
            }
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
              <ActiveEventList orgId={orgId} />
            </div>
            {
              // !================= MEMBER COMPONENT ==============
            }
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
              <>
                <AddMemberModal
                  updateData={(data) => setData(data)}
                  isAdmin={isAdmin}
                  isOpen={isMemberModalOpen}
                  orgId={orgId}
                />
              </>
              <ul className="border-b-2 border-slate-400 pb-5">
                {Data?.members.map((v: members, i) => (
                  <ListComponent index={i}>
                    <div className="flex justify-between items-center grow py-1">
                      <p className="grow py-1">{v.name} </p>
                      {v.isAdmin && (
                        <p className="p-1 font-semibold bg-yellow-500 rounded-xl text-gray-700 flex justify-center ">
                          admin
                        </p>
                      )}
                    </div>
                    <div className={`max-h-full ${isAdmin && "w-10"}`}>
                      {
                        // !============= MEMBER OPTION Button ===============
                      }
                      {isExpanded === i && (
                        <SetMembers
                          memberData={v}
                          openModal={(arg) => {
                            setShowSetMemberModal(arg);
                            setIsExpanded(null);
                          }}
                          memberToBeSet={(id, name) => setMember({ id, name })}
                        />
                      )}
                      {
                        // !============== Setting Button ===================
                      }
                      {v._id !== userId && isAdmin && (
                        <>
                          <button
                            onClick={() =>
                              isExpanded === i
                                ? setIsExpanded(null)
                                : setIsExpanded(i)
                            }
                            id="settingbtn"
                            className="right-0 top-0 w-10 h-full flex justify-center items-center rounded-full "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 512"
                              className="h-5 w-1 fill-gray-600"
                            >
                              {/* <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
                              <path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </ListComponent>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dataContext.Provider>
    </>
  );
};
