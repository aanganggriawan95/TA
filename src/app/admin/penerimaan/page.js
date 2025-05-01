import AdminLayoutWrapper from "@/components/layout/adminLayout";

const Penerimaan = () => {
  return (
    <AdminLayoutWrapper>
      <h2 className="text-2xl font-bold mb-4">Penerimaan Barang</h2>
      <form className="bg-white text-gray-500 rounded-lg  px-6 py-4 flex flex-col gap-6 w-full ">
        {/* Data Pelanggan */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Masukkan nama"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Telepon</label>
            <input
              type="tel"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="08xxxxxxxxxx"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Alamat</label>
          <textarea
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none resize-none h-20 focus:ring-1 focus:ring-sky-500"
            placeholder="Alamat lengkap"
            required
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Simpan Data
          </button>
        </div>
      </form>

      <form className="bg-white hidden text-gray-500 rounded-lg  px-6 py-4 flex flex-col gap-6 w-full ">
        {/* Data Barang */}
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Jenis Barang
            </label>
            <input
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Contoh: Laptop"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Merek</label>
            <input
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Contoh: Asus"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <input
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Contoh: A456U"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nomor Seri</label>
            <input
              type="text"
              className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="Nomor seri"
              required
            />
          </div>
        </div>

        {/* Keluhan Barang */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Keluhan Barang
          </label>
          <textarea
            className="w-full rounded border border-gray-200 px-3 py-2 text-sm outline-none resize-none h-28 focus:ring-1 focus:ring-sky-500"
            placeholder="Tuliskan keluhan atau masalah pada barang"
            required
          ></textarea>
        </div>

        {/* Tombol Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Simpan Data
          </button>
        </div>
      </form>
    </AdminLayoutWrapper>
  );
};

export default Penerimaan;

{
  /* 
        <div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
              />
            </svg>
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <label htmlFor="guests">Guests</label>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16"
            placeholder="0"
          />
        </div> */
}
