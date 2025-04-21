import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const MemberTeamCard = ({ image, name, rol, linkedin, github, twitter }) => {
  return (
    <article className="bg-white text-center rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={`Foto de ${name}`}
        className="w-24 h-24 object-cover rounded-full mx-auto mb-4 border-4 border-blue-200"
      />
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-500 mb-4">{rol}</p>
      <div className="flex justify-center gap-4 text-gray-600">
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon className="hover:text-blue-600 transition" />
          </a>
        )}
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <GitHubIcon className="hover:text-black transition" />
          </a>
        )}
      </div>
    </article>
  );
};

export default MemberTeamCard;
