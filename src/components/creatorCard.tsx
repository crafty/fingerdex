import { Card } from "@primereact/ui/card";
import { Avatar } from "@primereact/ui/avatar";
import { Tag } from "@primereact/ui/tag";
import { Button } from "@primereact/ui/button";
import { Globe, History, Instagram, Users } from "@primeicons/react";
import type { Creator } from "../helpers/constants";
import {
  trackBrandClick,
  getCreatorInitials,
  formatWeeksAgo,
  isRecentPost,
} from "../helpers/utilities";

type Stat = "followers" | "lastPost";

const StatCell = ({
  label,
  icon,
  highlighted,
  className = "",
  children,
}: {
  label: string;
  icon: React.ReactNode;
  highlighted: boolean;
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={`flex flex-col gap-0.5 px-3 py-2.5 ${className}`}>
    <span
      className={`flex items-center gap-1.5 text-[11px] uppercase tracking-[0.06em] ${
        highlighted ? "text-accent-300" : "text-neutral-400"
      }`}
    >
      {icon}
      {label}
    </span>
    <span
      className={`flex items-center gap-2 text-[19px] font-medium tabular-nums ${
        highlighted ? "text-accent-300" : "text-fg"
      }`}
    >
      {children}
    </span>
  </div>
);

export const CreatorCard = ({
  creator,
  highlightedStat,
  onTagClick,
}: {
  creator: Creator;
  highlightedStat?: Stat;
  onTagClick?: (tag: string) => void;
}) => {
  const displayName = creator.name || creator.instagram;
  const recentPost =
    !creator.private &&
    !!creator.latestPostTimestamp &&
    isRecentPost(creator.latestPostTimestamp);

  return (
    <Card.Root className="bg-surface! rounded-lg! border! border-neutral-800! shadow-none! p-3.5!">
      <Card.Body className="flex h-full flex-col gap-3 p-0!">
        <div className="flex items-center gap-3">
          <Avatar.Root
            shape="circle"
            className={`size-14! shrink-0 bg-neutral-900! text-[17px]! font-medium text-neutral-200! tracking-[0.02em] ${
              creator.promoted
                ? "shadow-[0_0_0_2px_var(--color-surface),0_0_0_3px_var(--color-accent)]"
                : "shadow-[0_0_0_2px_var(--color-surface),0_0_0_3px_var(--color-neutral-800)]"
            }`}
          >
            {!creator.private && creator.profilePicUrlHD && (
              <Avatar.Image
                src={creator.profilePicUrlHD}
                alt={`${displayName} profile picture`}
              />
            )}
            <Avatar.Fallback>{getCreatorInitials(creator)}</Avatar.Fallback>
          </Avatar.Root>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
            <span className="truncate text-[17px] font-medium">
              {displayName}
            </span>
            {creator.name && creator.instagram && (
              <span className="truncate text-[13px] text-neutral-400">
                {creator.instagram}
              </span>
            )}
          </div>

          {creator.promoted && (
            <Tag className="self-start shrink-0 bg-accent-800! text-accent-100! text-[11px]! font-normal!">
              Promoted
            </Tag>
          )}
        </div>

        <div className="grid grid-cols-2 rounded-md bg-bg text-left">
          <StatCell
            label="Followers"
            icon={<Users size={13} />}
            highlighted={highlightedStat === "followers"}
          >
            {creator.private || creator.followersCount === undefined
              ? "N/A"
              : creator.followersCount.toLocaleString("en-US")}
          </StatCell>
          <StatCell
            label="Last post"
            icon={<History size={13} />}
            highlighted={highlightedStat === "lastPost"}
            className="border-l border-divider"
          >
            {recentPost && (
              <span className="size-1.75 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" />
            )}
            <span className="truncate">
              {creator.private
                ? "Profile private"
                : creator.latestPostTimestamp
                  ? formatWeeksAgo(creator.latestPostTimestamp)
                  : "N/A"}
            </span>
          </StatCell>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {creator.products.length === 0 && (
            <span className="text-[13px] text-neutral-500">
              Products not listed
            </span>
          )}
          {creator.products.map((product) => (
            <Tag
              key={product}
              as="button"
              type="button"
              className="cursor-pointer bg-neutral-800! text-neutral-100! text-[11px]! font-normal! hover:bg-neutral-700!"
              onClick={() => onTagClick?.(product)}
            >
              {product}
            </Tag>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2">
          {creator.instagram ? (
            <Button
              as="a"
              href={`https://instagram.com/${creator.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              severity="secondary"
              variant="outlined"
              className="h-11"
              onClick={() => trackBrandClick(String(creator.instagram))}
            >
              <Instagram size={18} />
              Instagram
            </Button>
          ) : (
            <Button
              severity="secondary"
              variant="outlined"
              className="h-11"
              disabled
            >
              <Instagram size={18} />
              No Instagram
            </Button>
          )}

          {creator.website ? (
            <Button
              as="a"
              href={creator.website}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              className="h-11"
              onClick={() =>
                trackBrandClick(String(creator.instagram || creator.name))
              }
            >
              <Globe size={18} />
              Visit site
            </Button>
          ) : (
            <Button variant="outlined" className="h-11" disabled>
              <Globe size={18} />
              No site
            </Button>
          )}
        </div>
      </Card.Body>
    </Card.Root>
  );
};
