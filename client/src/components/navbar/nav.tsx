import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function nav() {
  return (
    <div className="">
      <Menubar className="h-16 bg-blue-300 border-none rounded-none rounded">
        <MenubarMenu>
          <MenubarTrigger className=""></MenubarTrigger>
          {/* <MenubarContent>
              <MenubarItem>
                New Tab <MenubarShortcut>⌘T</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>New Window</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Share</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Print</MenubarItem>
            </MenubarContent> */}
        </MenubarMenu>
      </Menubar>
    </div>
  );
}