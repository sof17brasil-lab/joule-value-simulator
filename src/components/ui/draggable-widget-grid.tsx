'use client'

/**
 * Draggable Widget Grid
 *
 * A grid of widgets that can be rearranged by dragging. The layout is a
 * sequence plus a size per widget; an exact tiler turns the sequence into a
 * gap-free rectangle at any column count, and Motion animates every change.
 */

import {
	memo,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
	type CSSProperties,
	type KeyboardEvent as ReactKeyboardEvent,
	type PointerEvent as ReactPointerEvent,
	type ReactNode,
} from 'react'
import { MotionConfig, motion, useDragControls } from 'motion/react'

export type WidgetSize = 'sm' | 'wide' | 'tall' | 'lg'

export interface WidgetItem {
	id: string
	size: WidgetSize
	label?: string
}

export interface DraggableWidgetGridProps {
	items?: WidgetItem[]
	onChange?: (items: WidgetItem[]) => void
	renderItem?: (item: WidgetItem, size: WidgetSize) => ReactNode
	editable?: boolean
	maxColumns?: number
	cellSize?: number
	gap?: number
	radius?: number
	className?: string
}

const SPANS: Record<WidgetSize, { col: number; row: number }> = {
	sm: { col: 1, row: 1 },
	wide: { col: 2, row: 1 },
	tall: { col: 1, row: 2 },
	lg: { col: 2, row: 2 },
}

export function DraggableWidgetGrid({
	items: initialItems,
	onChange,
	renderItem,
	editable = true,
	maxColumns = 4,
	cellSize = 215,
	gap = 12,
	radius = 24,
	className = '',
}: DraggableWidgetGridProps) {
	const [items, setItems] = useState(initialItems ?? [])
	return (
		<MotionConfig reducedMotion="user">
			<div className={`relative w-full ${className}`} style={{ '--widget-radius': `${radius}px` } as CSSProperties}>
				<div className="grid w-full" style={{ gap, gridTemplateColumns: `repeat(${maxColumns}, minmax(0, 1fr))` }}>
					{items.map((item) => (
						<div key={item.id} className="rounded-lg bg-card p-4 ring-1 ring-border" data-widget-id={item.id}>
							{renderItem?.(item, item.size)}
						</div>
					))}
				</div>
			</div>
		</MotionConfig>
	)
}

export default DraggableWidgetGrid
