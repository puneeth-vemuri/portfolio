import { useNavigate } from "react-router-dom";
import ColorBends from "@/components/ColorBends";
import ProfileCard from "@/components/ProfileCard";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 transition-all duration-500 opacity-100 translate-y-0 pointer-events-auto bg-[#0d1117] overflow-hidden text-white">
      {/* ===== Animated Background (Color Bends) ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ColorBends />
      </div>

      {/* ===== Dark overlay for contrast ===== */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* ===== Content ===== */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 flex items-center justify-center h-full">
        {/* ===== MEDIUM+ (desktop/tablet) ===== */}
        <div className="hidden md:block w-full">
          <div className="grid grid-cols-3 items-center gap-8 py-12">
            {/* Left: Developers */}
            <div className="flex flex-col items-end text-right space-y-4 px-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-white text-black">
                DEVELOPERS
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold">
                For <span className="italic">Developers</span>
              </h2>
              <p className="text-sm text-gray-300 max-w-xs">
                Dive into an interactive terminal-style portfolio with commands,
                projects, and skills built for devs.
              </p>
              <button
                onClick={() => navigate("/terminal")}
                className="mt-4 px-6 py-2 rounded-full bg-black text-white border border-white/30 hover:-translate-y-0.5 hover:shadow-lg transition cursor-pointer"
              >
                Developer view
              </button>
            </div>

            {/* Center: Profile card */}
            <div className="flex items-center justify-center">
              <ProfileCard variant="static" />
            </div>

            {/* Right: Profile */}
            <div className="flex flex-col items-start text-left space-y-4 px-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-white text-black">
                PROFILE
              </span>
              <h2 className="text-2xl md:text-3xl font-semibold">
                For <span className="italic">Everyone</span>
              </h2>
              <p className="text-sm text-gray-300 max-w-xs">
                Prefer a simple view? Explore my profile, experience, and
                projects in a clean, easy-to-read layout.
              </p>
              <button
                onClick={() => navigate("/profile")}
                className="mt-4 px-6 py-2 rounded-full bg-white text-black border border-white/30 hover:-translate-y-0.5 hover:shadow-lg transition cursor-pointer"
              >
                Profile viewer
              </button>
            </div>
          </div>
        </div>

        {/* ===== SMALL (mobile) ===== */}
        <div className="block md:hidden w-full h-full pt-10">
          <div
            className="max-w-xl mx-auto w-full py-8 overflow-y-auto no-scrollbar h-full"
          >
            {/* Profile card */}
            <div className="flex flex-col items-center justify-center px-4">
              <div className="w-full max-w-xs flex justify-center">
                <ProfileCard variant="static" />
              </div>
            </div>

            {/* Profile section */}
            <div className="mt-8 px-4">
              <div className="flex justify-center mb-3">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-white text-black">
                  PROFILE
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-center">
                For <span className="italic">Everyone</span>
              </h2>
              <p className="text-sm text-gray-300 text-center mt-3">
                Prefer a simple view? Explore my profile, experience, and
                projects in a clean, easy-to-read layout.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => navigate("/profile")}
                  className="px-6 py-2 rounded-full bg-white text-black border border-white/30 hover:-translate-y-0.5 hover:shadow-lg transition cursor-pointer"
                >
                  Profile viewer
                </button>
              </div>
            </div>

            {/* Developer section */}
            <div className="mt-8 px-4 pb-12">
              <div className="flex justify-center mb-3">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-widest bg-white text-black">
                  DEVELOPERS
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-center">
                For <span className="italic">Developers</span>
              </h2>
              <p className="text-sm text-gray-300 text-center mt-3">
                Dive into an interactive terminal-style portfolio with commands,
                projects, and skills built for devs.
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => navigate("/terminal")}
                  className="px-6 py-2 rounded-full bg-black text-white border border-white/30 hover:-translate-y-0.5 hover:shadow-lg transition cursor-pointer"
                >
                  Developer view
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
