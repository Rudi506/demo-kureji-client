import { SetStateAction, useCallback, useEffect, useState } from "react";
import { api } from "../../utils/api";
import { Navbar } from "../components/navbar";
import { getAccessToken } from "../utils/accesstoken";
import { organization } from "../../types/types";
import { CreateOrgModal } from "../components/createOrg";
import { CardLoader } from "../components/Loader";
import { SuccessModal } from "../components/modalBox";
import { ListCard } from "../components/ListCard";
import { MainHeading } from "../components/Heading";

export const Organization: React.FC = () => {
  const accessToken = getAccessToken();
  const [data, setData] = useState<organization[]>();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsOpen] = useState(false);
  const callback = useCallback((handle: SetStateAction<boolean>) => {
    setIsOpen(handle);
  }, []);
  const [anim, setAnim] = useState(false);
  const [Msg, setMsg] = useState({ msg: "" });

  useEffect(() => {
    api
      .get("/org", {
        headers: { "auth-token": accessToken ? `Bearer ${accessToken}` : "" },
      })
      .then((result) => {
        const { data } = result.data;
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex grow-1 ">
        <Navbar />
        <div className="px-5 pb-32 py-3 w-screen flex flex-col gap-5 relative min-h-screen max-h-screen overflow-auto">
          <SuccessModal
            anim={anim}
            setAnim={(param) => setAnim(param)}
            msg={Msg}
          />
          <CreateOrgModal
            isOpen={isModalOpen}
            closeBtn={callback}
            setData={(data) => setData(data)}
            setMsg={(data) => setMsg({ msg: data })}
            setAnim={(bool) => setAnim(bool)}
          />
          <div id="header" className="flex justify-between">
            <MainHeading>My Organization</MainHeading>
            <button
              onClick={() => setIsOpen(true)}
              id="addBtn"
              className={` rounded-xl bg-blue-500 text-white p-2 font-semibold hover:bg-blue-700 ${
                isModalOpen ? "hidden" : "flex"
              }`}
            >
              Create Organization
            </button>
          </div>
          <ul className="flex flex-col gap-3">
            {loading && <CardLoader />}
            {!loading &&
              data?.map((v, i) => (
                <ListCard
                  children={null}
                  key={i}
                  href={`/org/${v._id}`}
                  headingOne={v.organization}
                  subHeadingTitle={`admin`}
                  subHeading={v.admin.name}
                  description={v.description}
                />
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
