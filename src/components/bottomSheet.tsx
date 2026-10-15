import { Drawer } from "@primereact/ui/drawer";

// Bottom drawer styled as a mobile sheet: rounded top, grab handle, capped height
export const BottomSheet = ({
  open,
  onOpenChange,
  title,
  headerAction,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Drawer.Root
    open={open}
    onOpenChange={(e: { value: boolean | undefined }) => onOpenChange(!!e.value)}
    position="bottom"
    blockScroll
  >
    <Drawer.Portal>
      <Drawer.Backdrop className="bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)]! backdrop-blur-[2px]" />
      <Drawer.Popup className="h-auto! max-h-[75svh] rounded-t-[20px]! border-0! bg-surface! shadow-sheet!">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 overflow-hidden px-4 pt-2 pb-7">
          <div className="h-1 w-9 self-center rounded-full bg-neutral-700" />
          <div className="flex items-center justify-between">
            <Drawer.Title className="text-lg font-medium">{title}</Drawer.Title>
            {headerAction}
          </div>
          {children}
        </div>
      </Drawer.Popup>
    </Drawer.Portal>
  </Drawer.Root>
);
