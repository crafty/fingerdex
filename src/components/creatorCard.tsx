import { Card } from "@primereact/ui/card";
import { Badge } from "@primereact/ui/badge";
import { Divider } from "@primereact/ui/divider";
import { Globe, Instagram } from "@primeicons/react";
import { Button } from "@primereact/ui/button";
import type { Creator } from "../helpers/constants";
import { trackBrandClick } from "../helpers/utilities";

export const CreatorCard = ({
  creator,
  onTagClick,
}: {
  creator: Creator;
  onTagClick?: (tag: string) => void;
}) => (
  <Card.Root key={creator.name} className="min-w-85.75 flex-[1_1_343px]">
    <Card.Body className="space-y-4 h-full">
      <Card.Caption>
        <Card.Title className="flex justify-between">
          <p className="font-bold! text-xl! overflow-hidden text-ellipsis whitespace-nowrap">
            {creator.name || creator.instagram}
          </p>
          {creator.promoted && (
            <Badge size="large" className="bg-amber-300!">
              Promoted!
            </Badge>
          )}
        </Card.Title>
      </Card.Caption>

      <Card.Content className="flex flex-col gap-6">
        <div className="flex flex-1 flex-wrap items-center gap-2 mb-2">
          <div className="flex flex-col w-full">
            <p className="font-bold text-sm text-left text-gray-400">
              Products
            </p>
            <Divider className="mb-1! mt-2!" />
          </div>
          {creator.products.length === 0 && (
            <p className="text-gray-500">Products not listed</p>
          )}
          {creator.products.map((product) => (
            <Badge
              key={product}
              className="w-fit cursor-pointer"
              severity="info"
              onClick={() => onTagClick?.(product)}
            >
              {product}
            </Badge>
          ))}
        </div>
      </Card.Content>

      <Card.Footer className="flex items-center gap-2 mt-auto">
        {creator.instagram ? (
          <Button
            className="flex-1"
            severity="secondary"
            variant="outlined"
            as="a"
            href={`https://instagram.com/${(creator.instagram || "").replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            disabled={!creator.instagram}
            onClick={() => trackBrandClick(creator.instagram || creator.name)}
          >
            <Instagram />
            Instagram
          </Button>
        ) : (
          <Button className="flex-1" severity="secondary" disabled>
            <Instagram />
            Unavailable
          </Button>
        )}

        {creator.website ? (
          <Button
            className="flex-1"
            as="a"
            href={creator.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackBrandClick(creator.instagram || creator.name)}
          >
            <Globe />
            Visit Site
          </Button>
        ) : (
          <Button className="flex-1" disabled>
            <Globe />
            Unavailable
          </Button>
        )}
      </Card.Footer>
    </Card.Body>
  </Card.Root>
);
