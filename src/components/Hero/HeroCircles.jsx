import "./HeroCircles.css";

export default function HeroCircles() {
  return (
    <div className="hero-circles">
      <div className="circle-large">
        <div className="rotating-track">
          <div className="orbit orbit-1">
            <figure className="avatar">
              <img
                src="/assets/images/Amanda.svg"
                alt="Amanda – UI/UX Design"
              />
              <figcaption>
                <p>Amanda</p>
                <p>UI/UX Design</p>
              </figcaption>
            </figure>
          </div>
          <div className="orbit orbit-2">
            <figure className="avatar">
              <img src="/assets/images/Erik.png" alt="Erik – Web Development" />
              <figcaption>
                <p>Erik</p>
                <p>Web Development</p>
              </figcaption>
            </figure>
          </div>
          <div className="orbit orbit-3">
            <figure className="avatar">
              <img src="/assets/images/Meja.svg" alt="Meja – Motion Design" />
              <figcaption>
                <p>Meja</p>
                <p>Motion Design</p>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="circle-small">
          <div className="rotating-track">
            <div className="orbit orbit-4">
              <figure className="avatar">
                <img
                  src="/assets/images/Linnea.png"
                  alt="Linnea – Web Design"
                />
                <figcaption>
                  <p>Linnea</p>
                  <p>Web Design</p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
