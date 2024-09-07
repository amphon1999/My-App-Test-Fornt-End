
export const MoveShapeLeft = (shapes: string[], setShapes: React.Dispatch<React.SetStateAction<string[]>>) => {
  const newShapes = [...shapes];
  const firstShape = newShapes.shift();
  if (firstShape) {
    newShapes.push(firstShape);
    setShapes(newShapes);
  }
};

export const MoveShapeRight = (shapes: string[], setShapes: React.Dispatch<React.SetStateAction<string[]>>) => {
  const newShapes = [...shapes];
  const lastShape = newShapes.pop();
  if (lastShape) {
    newShapes.unshift(lastShape);
    setShapes(newShapes);
  }
};

export const MovePosition = (shapes: string[], setShapes: React.Dispatch<React.SetStateAction<string[]>>) => {
  const newShapes = [...shapes];
  const firstRow = newShapes.slice(0, 3);
  const secondRow = newShapes.slice(3, 6);
  const thirdRow = newShapes.slice(6, 9);
  setShapes([...thirdRow, ...secondRow, ...firstRow]);
};