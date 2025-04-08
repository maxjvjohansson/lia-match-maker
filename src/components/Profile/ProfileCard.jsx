import "./ProfileCard.css";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import GithubIcon from "@/assets/icons/github.svg";
import PortfolioIcon from "@/assets/icons/portfolio.svg";
import MailIcon from "@/assets/icons/mail.svg";
import HeartIcon from "@/assets/icons/heart.svg";

function getLinkIcon(website) {
  if (!website) return null;
  if (website.includes("linkedin.com")) return <LinkedInIcon />;
  if (website.includes("github.com")) return <GithubIcon />;
  if (website.includes("www.")) return <PortfolioIcon />;
  return null;
}

export default function ProfileCard({ profile, role }) {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <h3>{profile.name.toUpperCase()}</h3>
        <div className="profile-icons">
          {getLinkIcon(profile.website) && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              {getLinkIcon(profile.website)}
            </a>
          )}
          {profile.user_id && (
            <a href={`mailto:${profile.email}`}>
              <MailIcon />
            </a>
          )}
          <button className="like-button">
            <HeartIcon />
          </button>
        </div>
      </div>
      <p className="profile-profession">{profile.profession}</p>
      <div className="profile-tech">
        {profile.technologies.map((tech, index) => (
          <span key={index} className="tech-badge">
            {tech.toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}
