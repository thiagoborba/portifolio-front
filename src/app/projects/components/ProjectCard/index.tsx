import Image from 'next/image';
import { Button } from '@/Components';
type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  image?: string;
};

export function ProjectCard({ title, description, tags, href, image }: Project) {
  return (
    <div className="project-card">
      <div className="project-card__image">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
          />
        )}
      </div>
      <div className="project-card__body">
        <h3 className="project-card__title">{`// ${title}`}</h3>
        <p className="project-card__description">{description}</p>
        <div className="project-tags">
          {tags.map((tag: string) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>
        {href && (
          <a href={href} target="_blank" rel="noopener noreferrer" className="project-card__footer">
            <Button variant="secondary">view-project</Button>
          </a>
        )}
      </div>
    </div>
  );
}
