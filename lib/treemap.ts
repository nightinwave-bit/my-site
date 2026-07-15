// Squarified treemap layout (Bruls, Huizing, van Wijk).
// Returns absolute rects (same units as width/height) for each item,
// preserving input order in the output.

export interface TreemapItem {
  value: number;
}

export interface TreemapRect {
  index: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Cell {
  index: number;
  area: number;
}

interface Free {
  x: number;
  y: number;
  w: number;
  h: number;
}

// Highest aspect ratio of a row laid along a side of length `side`.
function worst(row: Cell[], side: number): number {
  if (row.length === 0) return Infinity;
  let sum = 0;
  let min = Infinity;
  let max = -Infinity;
  for (const c of row) {
    sum += c.area;
    if (c.area < min) min = c.area;
    if (c.area > max) max = c.area;
  }
  const s2 = sum * sum;
  const side2 = side * side;
  return Math.max((side2 * max) / s2, s2 / (side2 * min));
}

export function squarify(
  items: TreemapItem[],
  width: number,
  height: number
): TreemapRect[] {
  const total = items.reduce((s, it) => s + it.value, 0);
  if (total <= 0 || width <= 0 || height <= 0) return [];

  const scale = (width * height) / total;
  const remaining: Cell[] = items.map((it, index) => ({
    index,
    area: it.value * scale,
  }));

  const result: TreemapRect[] = [];
  let free: Free = { x: 0, y: 0, w: width, h: height };

  function place(row: Cell[]) {
    const rowArea = row.reduce((s, c) => s + c.area, 0);
    if (free.w <= free.h) {
      // shorter side is width -> lay row horizontally across the top
      const rowH = rowArea / free.w;
      let x = free.x;
      for (const c of row) {
        const w = c.area / rowH;
        result.push({ index: c.index, x, y: free.y, w, h: rowH });
        x += w;
      }
      free = { x: free.x, y: free.y + rowH, w: free.w, h: free.h - rowH };
    } else {
      // shorter side is height -> lay row vertically down the left
      const colW = rowArea / free.h;
      let y = free.y;
      for (const c of row) {
        const h = c.area / colW;
        result.push({ index: c.index, x: free.x, y, w: colW, h });
        y += h;
      }
      free = { x: free.x + colW, y: free.y, w: free.w - colW, h: free.h };
    }
  }

  let row: Cell[] = [];
  while (remaining.length > 0) {
    const side = Math.min(free.w, free.h);
    const next = remaining[0];
    if (row.length === 0 || worst(row, side) >= worst([...row, next], side)) {
      row.push(next);
      remaining.shift();
    } else {
      place(row);
      row = [];
    }
  }
  if (row.length > 0) place(row);

  result.sort((a, b) => a.index - b.index);
  return result;
}
