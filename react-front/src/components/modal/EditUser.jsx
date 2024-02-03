import { useAuth } from "../../contexts/AuthProvider";

export default function EditUser() {
  const { userData } = useAuth();
  const handleInputChange = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="">
        <div className="">
          {/*content*/}
          <div className="">
            {/*header*/}
            <div className=""></div>
            <div className="mt-4 ml-5 flex items-start justify-between border-solid rounded-t">
              <span className="flex h-52 w-52 justify-center items-center rounded-full bg-gray-400 text-xl text-white font-semibold outline outline-8 outline-gray-700">
                O
              </span>
            </div>
            {/*body*/}
            <div className="text-white mt-16 m-3 p-3 bg-[#1E2124] rounded-lg">
              <div className="mb-4 border-b-[1px] border-[#424549] flex flex-col gap-2">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input
                  className="text-white bg-[#424549] outline-none p-2 mb-4 rounded-md"
                  type="text"
                  id="username"
                  onChange={handleInputChange}
                  value={userData.username}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email</label>
                <input
                  className="text-white bg-[#424549] outline-none p-2 mb-4 rounded-md"
                  type="text"
                  id="email"
                  onChange={handleInputChange}
                  value={userData.email}
                />
              </div>
            </div>
            {/* button */}
            <div className="flex justify-end p-3 rounded-b-lg">
              <button className="text-white bg-emerald-500 p-2 rounded-md hover:bg-emerald-700">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
