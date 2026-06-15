"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "amoohaa.cart";

export type CartItem = {
  /** `${slug}:${variantId}` — unique line key. */
  key: string;
  slug: string;
  variantId: string;
  /** Snapshot so the cart renders without re-reading the catalog. */
  name: string;
  variantLabel: string;
  image: string;
  /** Unit price in BASE_CURRENCY (INR). */
  priceInr: number;
  qty: number;
};

type AddPayload = Omit<CartItem, "key" | "qty"> & { qty?: number };

type Action =
  | { type: "hydrate"; items: CartItem[] }
  | { type: "add"; item: AddPayload }
  | { type: "setQty"; key: string; qty: number }
  | { type: "remove"; key: string }
  | { type: "clear" };

function lineKey(slug: string, variantId: string) {
  return `${slug}:${variantId}`;
}

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const key = lineKey(action.item.slug, action.item.variantId);
      const qty = action.item.qty ?? 1;
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) =>
          i.key === key ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...state, { ...action.item, key, qty }];
    }
    case "setQty":
      return state
        .map((i) => (i.key === action.key ? { ...i, qty: action.qty } : i))
        .filter((i) => i.qty > 0);
    case "remove":
      return state.filter((i) => i.key !== action.key);
    case "clear":
      return [];
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  /** Total unit count across all lines. */
  count: number;
  /** Subtotal in BASE_CURRENCY (INR). */
  subtotalInr: number;
  add: (item: AddPayload) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  /** Drawer open state. */
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", items: parsed });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist after hydration (avoid clobbering storage with the empty initial state).
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((item: AddPayload) => {
    dispatch({ type: "add", item });
    setOpen(true);
  }, []);
  const setQty = useCallback(
    (key: string, qty: number) => dispatch({ type: "setQty", key, qty }),
    [],
  );
  const remove = useCallback((key: string) => dispatch({ type: "remove", key }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const { count, subtotalInr } = useMemo(() => {
    let count = 0;
    let subtotalInr = 0;
    for (const i of items) {
      count += i.qty;
      subtotalInr += i.priceInr * i.qty;
    }
    return { count, subtotalInr };
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({ items, count, subtotalInr, add, setQty, remove, clear, open, setOpen }),
    [items, count, subtotalInr, add, setQty, remove, clear, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
