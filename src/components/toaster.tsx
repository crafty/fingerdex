import { Toaster } from "@primereact/ui/toaster";
import { Toast } from "@primereact/ui/toast";
import { Times } from "@primeicons/react";

export const AppToaster = () => (
  <Toaster.Root position="top-right">
    <Toaster.Portal>
      <Toaster.Region>
        {({ toaster }: { toaster: { toasts: any[] } }) =>
          toaster?.toasts.map((item) => (
            <Toast.Root key={item.id} toast={item}>
              <Toast.Content>
                <Toast.Icon />
                <Toast.Message>
                  <Toast.Title />
                  <Toast.Description />
                </Toast.Message>
                <Toast.Close>
                  <Times />
                </Toast.Close>
              </Toast.Content>
            </Toast.Root>
          ))
        }
      </Toaster.Region>
    </Toaster.Portal>
  </Toaster.Root>
);
