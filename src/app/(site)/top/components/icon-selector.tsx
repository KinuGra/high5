import { Icons } from "@/components/icons";
import { createListCollection, HStack, IconButton, Portal, Select, useSelectContext } from "@chakra-ui/react";
import { FC } from "react";
import { RiAngularjsLine, RiForbidLine, RiReactjsLine, RiSvelteLine, RiVuejsLine } from "react-icons/ri";

const IconSelector: FC=()=>{
    const SelectTrigger = () => {
const select = useSelectContext()
  const items = select.selectedItems as Framework[]
  return (
    <IconButton
      px="2"
      variant="outline"
      size="sm"
      {...select.getTriggerProps()}
    >
      {select.hasSelectedItems ? items[0].icon : <RiForbidLine />}
    </IconButton>
  )
}
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
})

interface Framework {
  label: string
  value: string
  icon: React.ReactNode
}

    
return(
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={frameworks}
      size="sm"
      width="320px"
      defaultValue={["react"]}
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
}


export default IconSelector;