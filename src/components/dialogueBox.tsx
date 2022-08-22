interface DialogBoxProps {
  showDialog: boolean | { (): void };
  cancelNavigation: any;
  confirmNavigation: any;
}

export const DialogBox: React.FC<DialogBoxProps> = ({
  showDialog,
  cancelNavigation,
  confirmNavigation,
}) => {
  return (
    <div
      className={`${
        !showDialog && "hidden"
      } bg-white/99 absolute w-[80%] rounded-md border-2 border-gray-500 px-2 py-4 left-1/2 top-1/2 tranform -translate-x-1/2 -translate-y-1/2 bg-white z-10 flex flex-col gap-5`}
    >
      <div>
        <h2 className="text-xl font-bold">Warning</h2>
      </div>
      <main>
        <b>Yakin ingin meninggalkan halaman??</b>
        <br /> data yang belum disimpan akan hilang.
      </main>
      <footer className="flex justify-end gap-3">
        <button
          className="bg-blue-700 rounded-lg text-white px-4"
          onClick={cancelNavigation}
        >
          No
        </button>
        <button
          className=" bg-red-600 rounded-lg p-2 text-white px-4"
          onClick={confirmNavigation}
        >
          Yes
        </button>
      </footer>
    </div>
  );
};
