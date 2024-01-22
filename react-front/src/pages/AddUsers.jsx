import { useEffect } from "react";

export default function AddUsers() {
    useEffect(() => {}, []);

    return (
        <div className="text-white p-4">
            <div className="mb-6">
                <h1 className="text-3xl mb-2">AJOUTER</h1>
                <p className="text-gray-400">
                    Tu peux ajouter des amis grâce à leur nom d'utilisateur.
                </p>
            </div>
            <div className="flex">
                <div className="w-full mr-6">
                    <label
                        htmlFor="Username"
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                        <input
                            type="text"
                            id="Username"
                            className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 p-3"
                            placeholder="Username"
                        />

                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-gray-700 p-1.5 text-xs text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-sm peer-focus:text-white">
                            Username
                        </span>
                    </label>
                </div>
                <button className="bg-emerald-600 py-2 px-5 rounded">
                    Ajouter
                </button>
            </div>
        </div>
    );
}
