import React from 'react';
import Svg, { Rect, Circle, Polygon, Path, G, Defs, Marker } from 'react-native-svg';
import { COLORS, CELL_SIZE, BOARD_SIZE, SAFE_TILES, GLOBAL_PATH } from '../constants';

const Base = ({ color, cx, cy }) => (
  <G>
    <Rect x={cx} y={cy} width={CELL_SIZE * 6} height={CELL_SIZE * 6} fill={color} />
    <Rect
      x={cx + CELL_SIZE}
      y={cy + CELL_SIZE}
      width={CELL_SIZE * 4}
      height={CELL_SIZE * 4}
      fill={COLORS.BOARD_BG}
      rx={CELL_SIZE / 2}
    />
    <Circle cx={cx + CELL_SIZE * 2} cy={cy + CELL_SIZE * 2} r={CELL_SIZE / 1.5} fill={color} />
    <Circle cx={cx + CELL_SIZE * 4} cy={cy + CELL_SIZE * 2} r={CELL_SIZE / 1.5} fill={color} />
    <Circle cx={cx + CELL_SIZE * 2} cy={cy + CELL_SIZE * 4} r={CELL_SIZE / 1.5} fill={color} />
    <Circle cx={cx + CELL_SIZE * 4} cy={cy + CELL_SIZE * 4} r={CELL_SIZE / 1.5} fill={color} />
  </G>
);

const PathCells = () => {
  const cells = [];
  
  for (let col = 0; col < 15; col++) {
    for (let row = 0; row < 15; row++) {
      // Exclude bases
      if (
        (col < 6 && row < 6) ||
        (col > 8 && row < 6) ||
        (col > 8 && row > 8) ||
        (col < 6 && row > 8) ||
        (col >= 6 && col <= 8 && row >= 6 && row <= 8) // center
      ) {
        continue;
      }

      let fill = COLORS.BOARD_BG;

      // Safe Spots (Stars)
      const isSafe = Array.from(SAFE_TILES).some(safeIndex => {
        const [safeCol, safeRow] = GLOBAL_PATH[safeIndex];
        return safeCol === col && safeRow === row;
      });

      if (isSafe) {
        fill = COLORS.SAFE_SPOT;
      }

      // Home Stretches
      if (row === 7 && col >= 1 && col <= 5) fill = COLORS.RED;
      if (col === 7 && row >= 1 && row <= 5) fill = COLORS.GREEN;
      if (row === 7 && col >= 9 && col <= 13) fill = COLORS.YELLOW;
      if (col === 7 && row >= 9 && row <= 13) fill = COLORS.BLUE;

      cells.push(
        <Rect
          key={`${col}-${row}`}
          x={col * CELL_SIZE}
          y={row * CELL_SIZE}
          width={CELL_SIZE}
          height={CELL_SIZE}
          fill={fill}
          stroke={COLORS.BORDER}
          strokeWidth="1"
        />
      );
    }
  }
  return <G>{cells}</G>;
};

const Center = () => (
  <G>
    <Polygon
      points={`${CELL_SIZE * 6},${CELL_SIZE * 6} ${CELL_SIZE * 9},${CELL_SIZE * 6} ${CELL_SIZE * 7.5},${CELL_SIZE * 7.5}`}
      fill={COLORS.GREEN}
    />
    <Polygon
      points={`${CELL_SIZE * 9},${CELL_SIZE * 6} ${CELL_SIZE * 9},${CELL_SIZE * 9} ${CELL_SIZE * 7.5},${CELL_SIZE * 7.5}`}
      fill={COLORS.YELLOW}
    />
    <Polygon
      points={`${CELL_SIZE * 9},${CELL_SIZE * 9} ${CELL_SIZE * 6},${CELL_SIZE * 9} ${CELL_SIZE * 7.5},${CELL_SIZE * 7.5}`}
      fill={COLORS.BLUE}
    />
    <Polygon
      points={`${CELL_SIZE * 6},${CELL_SIZE * 9} ${CELL_SIZE * 6},${CELL_SIZE * 6} ${CELL_SIZE * 7.5},${CELL_SIZE * 7.5}`}
      fill={COLORS.RED}
    />
  </G>
);

const LudoBoard = () => {
  return (
    <Svg viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`} style={{ width: '100%', aspectRatio: 1 }}>
      <Rect width="100%" height="100%" fill={COLORS.PATH_BG} />
      
      {/* 4 Bases */}
      <Base color={COLORS.RED} cx={0} cy={0} />
      <Base color={COLORS.GREEN} cx={CELL_SIZE * 9} cy={0} />
      <Base color={COLORS.YELLOW} cx={CELL_SIZE * 9} cy={CELL_SIZE * 9} />
      <Base color={COLORS.BLUE} cx={0} cy={CELL_SIZE * 9} />
      
      {/* Center Home */}
      <Center />
      
      {/* Path Cells */}
      <PathCells />

      {/* Start Indicators (Arrows / Coloring) */}
      <Rect x={CELL_SIZE * 1} y={CELL_SIZE * 6} width={CELL_SIZE} height={CELL_SIZE} fill={COLORS.RED} stroke={COLORS.BORDER} />
      <Rect x={CELL_SIZE * 8} y={CELL_SIZE * 1} width={CELL_SIZE} height={CELL_SIZE} fill={COLORS.GREEN} stroke={COLORS.BORDER} />
      <Rect x={CELL_SIZE * 13} y={CELL_SIZE * 8} width={CELL_SIZE} height={CELL_SIZE} fill={COLORS.YELLOW} stroke={COLORS.BORDER} />
      <Rect x={CELL_SIZE * 6} y={CELL_SIZE * 13} width={CELL_SIZE} height={CELL_SIZE} fill={COLORS.BLUE} stroke={COLORS.BORDER} />
      
      {/* Safe Spot Star Icons */}
      {Array.from(SAFE_TILES).map((safeIndex, i) => {
        const [col, row] = GLOBAL_PATH[safeIndex];
        // Don't draw star on start tiles since they are colored
        if ([0, 13, 26, 39].includes(safeIndex)) return null;
        
        return (
          <Polygon
            key={i}
            points={`
              ${col * CELL_SIZE + CELL_SIZE/2},${row * CELL_SIZE + CELL_SIZE/4}
              ${col * CELL_SIZE + CELL_SIZE/1.5},${row * CELL_SIZE + CELL_SIZE/1.2}
              ${col * CELL_SIZE + CELL_SIZE/4},${row * CELL_SIZE + CELL_SIZE/2.2}
              ${col * CELL_SIZE + CELL_SIZE/1.3},${row * CELL_SIZE + CELL_SIZE/2.2}
              ${col * CELL_SIZE + CELL_SIZE/3},${row * CELL_SIZE + CELL_SIZE/1.2}
            `}
            fill={COLORS.BORDER}
          />
        );
      })}
    </Svg>
  );
};

export default LudoBoard;
