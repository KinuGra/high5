"use client";

import { Icons } from "@/components/icons";
import {
  createListCollection,
  HStack,
  IconButton,
  Portal,
  Select,
  useSelectContext,
} from "@chakra-ui/react";
import { FC } from "react";
import { RiForbidLine } from "react-icons/ri";

const SelectTrigger = () => {
  const select = useSelectContext();
  const items: Framework[] = select.selectedItems;
  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
      {...select.getTriggerProps()}
    >
      {items.length > 0 && select.hasSelectedItems ? (
        items[0].icon
      ) : (
        <Icons.apple />
      )}
    </IconButton>
  );
};

const frameworks = createListCollection({
  items: [
    { label: "", value: "apple", icon: <Icons.apple /> },
    { label: "", value: "grape", icon: <Icons.grape /> },
    { label: "", value: "tree", icon: <Icons.tree /> },
    { label: "", value: "hart", icon: <Icons.hart /> },
    { label: "", value: "star", icon: <Icons.star /> },
    { label: "", value: "snow", icon: <Icons.snow /> },
    { label: "", value: "flower", icon: <Icons.flower /> },
    { label: "", value: "hamburger", icon: <Icons.hamburger /> },
    { label: "", value: "fish", icon: <Icons.fish /> },
    { label: "", value: "kame", icon: <Icons.kame /> },
  ],
});

interface Framework {
  label: string;
  value: string;
  icon: React.ReactNode;
}

type IconSelectorProps = {
  onChange: (value: string[]) => void;
};

const IconSelector: FC<IconSelectorProps> = ({ onChange }) => {
  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={frameworks}
      size="sm"
      width="320px"
      defaultValue={["apple"]}
      onValueChange={(details) => onChange(details.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <SelectTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                <HStack>
                  {framework.icon}
                  {framework.label}
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default IconSelector;
