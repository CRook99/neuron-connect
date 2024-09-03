const vhToPx = (vh: number): number => {
    return (window.innerHeight * vh) / 100;
  };

export const getSlotSize = (): number => vhToPx(7); // Slot size in pixels
export const getSlotMargin = (): number => vhToPx(0.5);
export const getTotalSlotSize = (): number => getSlotSize() + (getSlotMargin() * 2);

export const NUM_ROWS = 8;
export const NUM_COLS = 12;