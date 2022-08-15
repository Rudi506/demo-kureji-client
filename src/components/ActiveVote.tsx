export const VoteEvent: React.FC = () => {
  return (
    <>
      <div className="px-5 py-3 w-screen flex flex-col gap-5">
        <h1 className="text-xl font-bold text-gray-500">Active Vote</h1>
        <ul className="flex flex-col gap-3">
          <li>
            <div
              id="card"
              className="border-2 border-gray-300 rounded-lg shadow-md shadow-gray-500 px-2 py-2 flex flex-col gap-2"
            >
              <div className="">
                <h1 className="text-lg font-semibold">Pemilihan ketua Osis</h1>
                <p className="text-gray-500 text-xs">SMK N 1 Purbalingga</p>
              </div>

              <p className="text-xs">
                kandidat: andrew &amp; bob vs jude &amp; anna
              </p>
            </div>
          </li>
          <li>
            <div
              id="card"
              className="border-2 border-gray-300 rounded-lg shadow-md shadow-gray-500 px-2 py-2 flex flex-col gap-2 relative"
            >
              <div className="absolute right-2 bg-gray-400 px-1 rounded-md">
                <p className="text-xs text-white/90 font-semibold">
                  sudah Vote
                </p>
              </div>
              <div className="">
                <h1 className="text-lg font-semibold">Pemilihan ketua ROHIS</h1>
                <p className="text-gray-500 text-xs">SMK N 1 Purbalingga</p>
              </div>

              <p className="text-xs">
                kandidat: andrew &amp; bob vs jude &amp; anna
              </p>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
