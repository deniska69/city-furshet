import { Drawer } from "vaul";

import "./Basket.css";

const Basket = () => {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 bg-black40" />
      <Drawer.Content className="bg-gray-100 h-fit fixed bottom-0 left-0 right-0 outline-none">
        <Drawer.Handle />
        <Drawer.Title />
        <Drawer.Description />
        <Drawer.Close />
        <div className="p-4 bg-white">{/* Content */}</div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};

export default Basket;
