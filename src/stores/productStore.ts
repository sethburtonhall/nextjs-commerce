import { atom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

export type ProductState = {
  [key: string]: string;
} & {
  image?: string;
};

type ProductAction = 
  | { type: 'UPDATE_OPTION'; payload: { name: string; value: string } }
  | { type: 'UPDATE_IMAGE'; payload: { index: string } }
  | { type: 'SET_STATE'; payload: ProductState };

function productReducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case 'UPDATE_OPTION':
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    case 'UPDATE_IMAGE':
      return {
        ...state,
        image: action.payload.index
      };
    case 'SET_STATE':
      return action.payload;
    default:
      return state;
  }
}

// Product atom with reducer for optimistic updates
export const productAtom = atomWithReducer<ProductState, ProductAction>({}, productReducer);
productAtom.debugLabel = "Product Atom";

// Action dispatchers
export const updateOptionAtom = atom(
  null,
  (get, set, { name, value }: { name: string; value: string }) => {
    set(productAtom, { type: 'UPDATE_OPTION', payload: { name, value } });
  }
);

export const updateImageAtom = atom(
  null,
  (get, set, index: string) => {
    set(productAtom, { type: 'UPDATE_IMAGE', payload: { index } });
  }
);

export const setProductStateAtom = atom(
  null,
  (get, set, state: ProductState) => {
    set(productAtom, { type: 'SET_STATE', payload: state });
  }
);
