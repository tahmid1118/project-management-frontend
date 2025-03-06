"use client";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#917173] via-[#2a3b36] to-[#432c52]">
      {/* Loader */}
      <div className="relative flex justify-center items-center">
        <div className="absolute w-[140px] h-[55px] bg-white/10 backdrop-blur-md border border-white/20 border-t-0 rounded-b-lg shadow-lg animate-tilt"></div>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 bg-gray-300 rounded-full mx-1"
            style={{
              animation: `bounceAnim 2s infinite linear ${i * -0.3}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Social Icons */}
      {/* <div className="mt-6 flex space-x-4">
        <a
          href="#"
          className="text-white text-xl p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="#"
          className="text-white text-xl p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          className="text-white text-xl p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <FaLinkedinIn />
        </a>
        <a
          href="#"
          className="text-white text-xl p-3 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <FaWhatsapp />
        </a>
      </div> */}

      {/* Custom Styles for Animation */}
      <style jsx>{`
        @keyframes bounceAnim {
          0%,
          100% {
            transform: translateY(5px);
          }
          50% {
            transform: translateY(-65px);
          }
        }

        @keyframes tiltAnim {
          0%,
          100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        .animate-tilt {
          animation: tiltAnim 2s infinite;
        }
      `}</style>
    </div>
  );
}
