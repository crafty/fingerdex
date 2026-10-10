import { useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  Instagram,
  Times,
  UserPlus,
} from "@primeicons/react";
import { Button } from "@primereact/ui/button";
import { Dialog } from "@primereact/ui/dialog";
import { InputText } from "@primereact/ui/inputtext";
import { Label } from "@primereact/ui/label";
import { Select, type SelectValueChangeEvent } from "@primereact/ui/select";

import { PRODUCTS } from "../helpers/constants";
import { toast } from "@primereact/headless/toaster";

const ProductOptions = PRODUCTS.map((product) => ({
  label: product,
  value: product,
}));

const TriggerButton = (props: React.ComponentProps<typeof Button>) => (
  <Button
    {...props}
    aria-label="Add Creator or Brand"
    size="normal"
    iconOnly
    variant="text"
    severity="contrast"
  >
    <UserPlus size={26} />
  </Button>
);

export const AddCreator = () => {
  const [name, setName] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [products, setProducts] = useState<string[]>([]);

  const subject = encodeURIComponent(
    `Request to add ${name || instagram || "unknown"}`,
  );

  const message = `Brand or Creator Details:\n
    {
        name: ${name || null},
        instagram: ${instagram || null},
        website: ${website || null},
        products: ${JSON.stringify(products)},
    }
    `;

  const body = encodeURIComponent(message);

  const href = `mailto:shout@dancraycraft.dev?subject=${subject}&body=${body}`;

  const RequestButton = (props: React.ComponentProps<typeof Button>) => (
    <Button as="a" href={href} {...props}>
      Send Request
    </Button>
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      toast.success({
        title: "Success!",
        description: "Copied to clipboard successfully!",
      });
    } catch (error) {
      console.error("Failed to copy:", error);
      toast.error({
        title: "Error!",
        description: "Failed to copy to clipboard.",
      });
    }
  };

  const getLabel = () => {
    const first =
      ProductOptions.find((p) => p.value === products[0])?.label ?? products[0];
    return products.length > 1
      ? `${first} (+${products.length - 1} more)`
      : first;
  };

  const resetForm = () => {
    setName("");
    setInstagram("");
    setWebsite("");
    setProducts([]);
  };

  return (
    <div className="flex justify-center">
      <Dialog.Root>
        <Dialog.Trigger as={TriggerButton}>
          Add Creator or Brand{" "}
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Popup className="w-[90vw] md:w-[75vw] lg:w-[50vw]">
              <Dialog.Header>
                <Dialog.Title>Add a Creator or Brand</Dialog.Title>
                <Dialog.HeaderActions>
                  <Dialog.Close
                    as={Button}
                    iconOnly
                    variant="text"
                    rounded
                    severity="secondary"
                    onClick={() => resetForm()}
                  >
                    <Times />
                  </Dialog.Close>
                </Dialog.HeaderActions>
              </Dialog.Header>
              <Dialog.Content>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                      <Label htmlFor="name" className="text-sm font-semibold">
                        Creator Name
                      </Label>
                      <InputText
                        id="name"
                        placeholder="Friendly Name"
                        data-autofocus
                        value={name}
                        onInput={(e: React.FormEvent<HTMLInputElement>) =>
                          setName(e.currentTarget.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                      <Label
                        htmlFor="instagram"
                        className="text-sm font-semibold"
                      >
                        Instagram Handle
                      </Label>
                      <InputText
                        id="instagram"
                        placeholder="@username"
                        value={instagram}
                        onInput={(e: React.FormEvent<HTMLInputElement>) =>
                          setInstagram(e.currentTarget.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="website" className="text-sm font-semibold">
                      Website
                    </Label>
                    <InputText
                      id="website"
                      placeholder="https://www.examplestore.com/"
                      value={website}
                      onInput={(e: React.FormEvent<HTMLInputElement>) =>
                        setWebsite(e.currentTarget.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="products" className="text-sm font-semibold">
                      Products
                    </Label>
                    <Select.Root
                      value={products}
                      onValueChange={(e: SelectValueChangeEvent) =>
                        setProducts(e.value as string[])
                      }
                      options={ProductOptions}
                      optionLabel="label"
                      optionValue="value"
                      multiple
                      className="w-full"
                    >
                      <Select.Trigger>
                        <Select.Value placeholder="Select products">
                          {getLabel()}
                        </Select.Value>
                        {products.length > 0 && (
                          <Select.Clear>
                            <Times />
                          </Select.Clear>
                        )}
                        <Select.Indicator>
                          <ChevronDown />
                        </Select.Indicator>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Positioner>
                          <Select.Popup>
                            <Select.List>
                              {ProductOptions.map(({ label, value }, index) => (
                                <Select.Option
                                  key={value}
                                  index={index}
                                  uKey={value}
                                  className="gap-2"
                                >
                                  <Select.OptionIndicator className="data-unselected:invisible">
                                    <Check />
                                  </Select.OptionIndicator>
                                  {label}
                                </Select.Option>
                              ))}
                            </Select.List>
                          </Select.Popup>
                        </Select.Positioner>
                      </Select.Portal>
                    </Select.Root>
                    <p className="flex flex-wrap items-center text-sm text-secondary">
                      Send request below via email or copy{" "}
                      <Button
                        iconOnly
                        variant="text"
                        rounded
                        severity="secondary"
                        onClick={handleCopy}
                      >
                        <Copy />
                      </Button>{" "}
                      the request details and DM them to me{" "}
                      <Button
                        as="a"
                        href="https://www.instagram.com/crafty.fb/"
                        target="_blank"
                        rel="noopener"
                        severity="contrast"
                        rounded
                        variant="text"
                        aria-label="Star"
                        size={"small"}
                        iconOnly
                      >
                        <Instagram size={18} />
                      </Button>
                      .
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                    <Dialog.Close
                      as={Button}
                      severity="secondary"
                      onClick={() => resetForm()}
                    >
                      Cancel
                    </Dialog.Close>
                    <Dialog.Close
                      as={RequestButton}
                      onClick={() => resetForm()}
                    >
                      Send Request
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Popup>
          </Dialog.Positioner>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
