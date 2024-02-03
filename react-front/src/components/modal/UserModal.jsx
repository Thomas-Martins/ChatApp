import { FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function UserModal({ user, setShowModal, setShowEditModal }) {
  const memberSince = new Date(user.created_at).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleChangeModal = () => {
    setShowModal(false);
    setShowEditModal(true);
  };

  return (
    <>
      <div className="fixed z-50 bottom-24 left-5 ">
        <div className="w-[350px] rounded-lg">
          {/*content*/}
          <div className="bg-gray-700 border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            {/*header*/}
            <div className="w-full h-[50px] bg-indigo-400 relative rounded-t-lg">
              <Link
                to="/edit-user"
                className="absolute text-white right-2 top-2 bg-indigo-600 p-2 rounded-full hover:bg-indigo-800"
                onClick={handleChangeModal}
              >
                <FaPen size={15} />
              </Link>
            </div>
            <div className="mt-4 ml-5 absolute flex items-start justify-between border-solid rounded-t">
              <span className="flex h-20 w-20 justify-center items-center rounded-full bg-gray-400 text-xl text-white font-semibold outline outline-8 outline-gray-700">
                O
              </span>
            </div>
            {/*body*/}
            <div className="text-white mt-16 m-3 p-3 flex-auto bg-[#1E2124] rounded-lg">
              <div className=" border-b-[1px] border-[#424549]">
                <p className="font-bold text-2xl">{user.username}</p>
                <p className="mb-4 font-semibold">{user.email}</p>
              </div>
              <div className="mt-4">
                <p className="font-bold uppercase">Membre depuis le</p>
                <p>{memberSince}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
