import { portfolioData } from "@/data/portfolio";
import profilePicture from "@/assets/profile-picture.jpeg";

type ProfileCardProps = {
  variant?: "static" | "3d";
};

function ProfileCard({ variant = "static" }: ProfileCardProps) {
  return (
    <div
      className="flex flex-col items-center justify-center space-y-4 text-xl font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
    >
      <h1 className="text-4xl font-bold text-white text-center">
        {portfolioData.name}
      </h1>

      {variant === "3d" ? (
        // used ONLY in DeveloperView – Three.js mounts here
        <div
          id="card-container"
          className="card-container w-[300px] h-[500px] cursor-pointer"
        />
      ) : (
        // simple static image for landing view
        <img
          src={profilePicture}
          alt={portfolioData.name}
          className="w-[300px] h-[500px] object-cover grayscale contrast-[1.10]"
        />
      )}

      <h2 className="text-2xl text-white">{portfolioData.role}</h2>
      <a href={portfolioData.socials.github} target="_blank" rel="noreferrer">
        <p className="text-lg text-[#58a6ff]">github.com/puneeth-vemuri</p>
      </a>
    </div>
  );
}

export default ProfileCard;
