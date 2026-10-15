import { Gift } from "@primeicons/react";
import { Button } from "@primereact/ui/button";
import { Divider } from "@primereact/ui/divider";
import { Popover } from "@primereact/ui/popover";

const SupportButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    {...props}
    rounded
    variant="text"
    aria-label="Support us"
    iconOnly
    className="size-11"
  >
    <Gift size={20} />
  </Button>
);

export const SupportUsPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger as={SupportButton}>
        Support Us
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} side="bottom" align="end">
          <Popover.Popup className="w-80 max-w-(--px-available-width)">
            <Popover.Arrow />
            <Popover.Header className="items-start!">
              <div className="flex flex-col">
                <Popover.Title className="text-base">
                  Support Fingerdex
                </Popover.Title>
              </div>
            </Popover.Header>
            <Popover.Content>
              <Divider />
              <p className="text-xs">
                Consider supporting Fingerdex to help us continue improving and
                providing valuable content for the community.
              </p>
              <Divider />
              <h3 className="text-lg font-bold">Ways to support us:</h3>
              <ol className="list-decimal list-inside text-sm">
                <li>
                  Supporting my work on social media platforms like Instagram.
                  Click The IG icon next to the support icon.
                </li>
                <li>
                  Buy me a cup of coffee to support my work via{" "}
                  <a
                    href="https://account.venmo.com/u/Dan-Craycraft"
                    target="_blank"
                    rel="noopener"
                    className="text-accent-300 underline hover:text-accent-200"
                  >
                    Venmo
                  </a>
                </li>
                <li>
                  Soon we will be adding "promoted" brands/creators where you
                  can support us while giving yourself more discoverability.
                </li>
              </ol>
            </Popover.Content>
            <Popover.Footer></Popover.Footer>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
