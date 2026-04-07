import Image from 'next/image';
import { Button } from '@/Components';
import { getTech } from '@/lib/tech-icons';
import './project-card.scss';

export type ProjectCardProps = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
  homepage?: string | null;
  image?: string;
  language?: string | null;
};

export function ProjectCard({
  title,
  description,
  tags,
  href,
  homepage,
  image,
}: ProjectCardProps) {
  return (
    <div className="project-card-wrapper">
      <h3 className="project-card__title">{`// ${title}`}</h3>
      <div className="project-card">
        <div className="project-card__image">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 890px) 100vw, (max-width: 1239px) 50vw, 407px"
              unoptimized={image?.startsWith('https://')}
              style={{ objectFit: 'cover' }}
            />
          )}
          <div className="project-tags">
            {tags.map((tag) => {
              const tech = getTech(tag);
              const Icon = tech?.icon;

              return (
                <span
                  key={tag}
                  className="project-tag"
                  title={tech?.label ?? tag}
                >
                  {Icon ? (
                    <Icon
                      size={20}
                      style={{ color: tech?.color, fill: tech?.color }}
                    />
                  ) : (
                    tag
                  )}
                </span>
              );
            })}
          </div>
        </div>
        <div className="project-card__body">
          <p className="project-card__description">{description}</p>
          {(href || homepage) && (
            <div className="project-card__actions">
              {href && (
                <a href={href} target="_blank" rel="noopener noreferrer" className="project-card__footer">
                  <Button variant="secondary">view-project</Button>
                </a>
              )}
              {homepage && (
                <a href={homepage} target="_blank" rel="noopener noreferrer" className="project-card__footer">
                  <Button variant="secondary">open-live</Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
