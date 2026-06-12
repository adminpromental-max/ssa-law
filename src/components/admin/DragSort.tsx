"use client";

import { useRef } from "react";
import { GripVertical } from "lucide-react";
import type { ReactNode } from "react";

interface DragSortItemProps {
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (index: number) => void;
  isDragging: boolean;
  children: ReactNode;
}

export function DragSortItem({
  index,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  children,
}: DragSortItemProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(index)}
      className={`flex gap-2 items-start border border-gold/15 rounded-sm p-4 transition-opacity bg-warm-850/30 ${
        isDragging ? "opacity-40" : "opacity-100"
      }`}
    >
      <span
        className="mt-1 text-cream/30 hover:text-gold cursor-grab active:cursor-grabbing shrink-0"
        aria-hidden
      >
        <GripVertical className="w-4 h-4" />
      </span>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function useDragReorder<T>(items: T[], setItems: (items: T[]) => void) {
  const dragIndex = useRef<number | null>(null);

  function onDragStart(index: number) {
    dragIndex.current = index;
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onDrop(targetIndex: number) {
    const from = dragIndex.current;
    if (from === null || from === targetIndex) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(targetIndex, 0, moved);
    setItems(next);
    dragIndex.current = null;
  }

  function isDragging(index: number) {
    return dragIndex.current === index;
  }

  return { onDragStart, onDragOver, onDrop, isDragging };
}
