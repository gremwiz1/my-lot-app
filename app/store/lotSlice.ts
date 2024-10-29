// lotSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Lot {
  id: string;
  name: string;
  category: string;
  condition: string;
  manufacturer: string;
  scale: string;
  material: string;
  description: string;
  createdAt: string; 
  type: "announcement" | "auction"; 
}

interface LotState {
  lots: Lot[];
}

const initialState: LotState = {
  lots: [],
};

const lotSlice = createSlice({
  name: 'lot',
  initialState,
  reducers: {
    addLot: (state, action: PayloadAction<Omit<Lot, 'id' | 'createdAt'>>) => {
      state.lots.push({ ...action.payload, id: new Date().toISOString(), createdAt: new Date().toISOString() });
    },
    removeLot: (state, action: PayloadAction<string>) => {
      state.lots = state.lots.filter(lot => lot.id !== action.payload);
    },
  },
});

export const { addLot, removeLot } = lotSlice.actions;
export default lotSlice.reducer;
