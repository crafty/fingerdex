import { QuestionCircle } from "@primeicons/react";
import { Button } from "@primereact/ui/button";
import { Divider } from "@primereact/ui/divider";
import { Popover } from "@primereact/ui/popover";

const HelpButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    {...props}
    severity="contrast"
    rounded
    variant="text"
    aria-label="Question Icon"
    size={"small"}
    iconOnly
  >
    <QuestionCircle size={18} />
  </Button>
);

export const HelpPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger as={HelpButton} severity="secondary" variant="outlined">
        FAQ
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={12} side="top" align="end">
          <Popover.Popup className="w-80 max-w-(--px-available-width)">
            <Popover.Arrow />
            <Popover.Header className="items-start!">
              <div className="flex flex-col">
                <Popover.Title className="text-base">
                  Fingerdex FAQ
                </Popover.Title>
              </div>
            </Popover.Header>
            <Popover.Content>
              <Divider />
              <p className="text-xs text-muted-color mt-1">
                Please keep in mind the website is currently under construction
                so if you see a creator/brand with missing products or other
                information, it may be due to ongoing updates. I'm single
                handedly managing the data and development, so your patience is
                appreciated.
              </p>
              <Divider />
              <h1 className="text-lg font-bold">How do I add a creator?</h1>
              <p className="text-xs text-muted-color mt-1">
                To add a creator, click on the "Add Creator" button at the top
                right of the page and fill out the required information. You can
                click the "send request" button to email the request for
                approval. Optionally you can click the copy icon below the form
                and the IG icon to paste the request into my Instagram messages.
              </p>
              <Divider />
              <h1 className="text-lg font-bold">Creator Requirements</h1>
              <p className="text-xs text-muted-color mt-1">
                Creators must meet the following requirements:
                <ol className="list-decimal list-inside">
                  <li>Must have an active Instagram account or website.</li>
                  <li>
                    Must sell a product or service related to their niche.
                  </li>
                  <li>Must be reputable within the community.</li>
                </ol>
              </p>
              <Divider />
              <h1 className="text-lg font-bold">Feature Roadmap</h1>
              <p className="text-xs text-muted-color mt-1">
                Our main goals currently are:
                <ol className="list-decimal list-inside">
                  <li>
                    Integrating IG data so users can get a feel for creators'
                    activity and engagement.
                  </li>
                  <li>Expanding our creator network.</li>
                  <li>Improving the user interface and experience.</li>
                  <li>Adding new features based on community feedback.</li>
                  <li>
                    Creating an event board for users to discover and attend
                    events.
                  </li>
                </ol>
              </p>
            </Popover.Content>
            <Popover.Footer></Popover.Footer>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
