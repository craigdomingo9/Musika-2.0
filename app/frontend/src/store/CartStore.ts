import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from 'zustand/middleware/immer';



interface CartStore {
  items: CartProduct[],
  addItemToStore: (item: CartProduct) => void,
  removeItemFromStore: (item: number) => void,
  incrementQuantity: (existingItem: CartProduct) => void,
  decrementQuantity: (existingItem: CartProduct) => void,
  getTotalPrice: () => number,
  getTotalItems: () => number,
  resetCart: () => void;
}


const UseCartStore = create<CartStore>()(
  devtools(
    persist(
      immer(
        (set, get) => ({
          items: [],
          addItemToStore: (item) => {
            set((state) => {
              const existingItem = state.items.find((_item: CartProduct) => _item.variant_id == item.variant_id);
              
              if (!existingItem) {
                state.items = [...state.items, item]
              } else {
                existingItem.quantity += 1;
              }
              
            })
          },
          removeItemFromStore: (itemId: number) => {
            set((state) => ({
              items: state.items.filter((item: CartProduct) => item.variant_id !== itemId)
            }));
          },
          incrementQuantity: (item: CartProduct) => {
            set((state) => {
              const updatedItems = state.items.map((existingItem: CartProduct) => {
                if (existingItem.variant_id === item.variant_id) {
                  return { ...existingItem, quantity: existingItem.quantity + 1 };
                }
                return existingItem;
              });
              return { items: updatedItems };
            });
          },
          
          decrementQuantity: (item: CartProduct) => {
            set((state) => {
              const updatedItems = state.items.map((existingItem: CartProduct) => {
                if (existingItem.variant_id === item.variant_id) {
                  return existingItem.quantity === 1 ? null : { ...existingItem, quantity: existingItem.quantity - 1 };
                }
                return existingItem;
              }).filter((existingItem: CartProduct) => existingItem?.quantity); // Remove null values
              return { items: updatedItems };
              
            });
          },
          getTotalPrice: () => {
            return get().items.reduce((total: any, item: any) => total + (item.on_sale ? item.sale_price: item.price) * item.quantity, 0);
          },
          getTotalItems: () => {
            return get().items.reduce((total, item) => total + 1, 0);
          },
          resetCart: () => {
            set({ items: [] });
          },
        })
      ),
      { name: 'Cartstore'},
    )
  )
)

export default UseCartStore
