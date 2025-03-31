import Image from "next/image";
import "./HeroCircles.css";

export default function HeroCircles() {
  return (
    <section className="hero-circles">
      <div className="circle-large" role="list">
        <div className="rotating-track">
          <article className="orbit orbit-1" role="listitem">
            <figure className="avatar">
              <Image
                src="/assets/avatars/amanda.png"
                alt="Amanda – UI/UX Design"
                width={60}
                height={60}
                className="avatar-img"
              />
              <figcaption>
                <p>Amanda</p>
                <p>UI/UX Design</p>
              </figcaption>
            </figure>
          </article>

          <article className="orbit orbit-2" role="listitem">
            <figure className="avatar">
              <Image
                src="/assets/avatars/erik.png"
                alt="Erik – Web Development"
                width={60}
                height={60}
                className="avatar-img"
              />
              <figcaption>
                <p>Erik</p>
                <p>Web Development</p>
              </figcaption>
            </figure>
          </article>

          <article className="orbit orbit-3" role="listitem">
            <figure className="avatar">
              <Image
                src="/assets/avatars/meja.png"
                alt="Meja – Motion Design"
                width={60}
                height={60}
                className="avatar-img"
              />
              <figcaption>
                <p>Meja</p>
                <p>Motion Design</p>
              </figcaption>
            </figure>
          </article>

          <div className="circle-small" role="list">
            <article className="orbit orbit-4" role="listitem">
              <figure className="avatar">
                <Image
                  src="/assets/avatars/david.png"
                  alt="David – Web Design"
                  width={50}
                  height={50}
                  className="avatar-img"
                />
                <figcaption>
                  <p>David</p>
                  <p>Web Design</p>
                </figcaption>
              </figure>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
