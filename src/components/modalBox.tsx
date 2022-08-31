export const ModalBox: React.FC<{
  isOpen: boolean;
  reqCloseBtn: (arg: boolean) => void;
  data: { id: string; ketua: string; wakil: string };
  submitVote: (arg: string) => void;
}> = ({ isOpen, reqCloseBtn, data, submitVote }) => {
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed  left-0 top-0 w-full h-full  z-30 bg-blue-500/5 backdrop-blur-sm w- shadow-xl outline outline-2 outline-blue-500/30 rounded-md flex justify-items-center`}
    >
      <div className="relative p-10 w-fit m-auto my-auto bg-white">
        <button
          className="absolute top-2 right-2 text-sm"
          onClick={() => reqCloseBtn(false)}
        >
          ✖
        </button>
        <div className="flex flex-col gap-2">
          <p className="">
            Kamu akan memilih{" "}
            <strong>
              {data.ketua} &amp; {data.wakil}
            </strong>
          </p>
          <p>Sudah yakin dengan pilihanmu?</p>
          <button
            className="p-3 py-2 w-fit text-white rounded-xl bg-blue-700"
            onClick={() => {
              submitVote(data.id);
              reqCloseBtn(false);
            }}
          >
            Yakin
          </button>
        </div>
      </div>
    </div>
  );
};
