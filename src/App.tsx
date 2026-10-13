import { useState } from 'react'
import DraggableWidgetGrid, { type WidgetItem, type WidgetSize } from './components/ui/draggable-widget-grid'

type Widget = WidgetItem & { kind: 'value' | 'hours' | 'skills' | 'chart' | 'recommendations' | 'roadmap' }

const INITIAL_WIDGETS: Widget[] = [
  { id: 'value', kind: 'value', size: 'sm', label: 'Value left on table' },
  { id: 'hours', kind: 'hours', size: 'sm', label: 'Hours saved' },
  { id: 'skills', kind: 'skills', size: 'sm', label: 'Skills to activate' },
  { id: 'chart', kind: 'chart', size: 'wide', label: 'Value by skill' },
  { id: 'recommendations', kind: 'recommendations', size: 'wide', label: 'Recommended skills' },
  { id: 'roadmap', kind: 'roadmap', size: 'wide', label: '90-day roadmap' },
]

function ValueWidget() {
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Value Left on Table</p>
      <p className="mt-1 text-3xl font-bold text-foreground">€184,200</p>
      <p className="mt-1 text-xs text-muted-foreground">Annual unrealized (Year 1)</p>
    </div>
  )
}

function HoursWidget() {
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Hours Saved / Year</p>
      <p className="mt-1 text-3xl font-bold text-foreground">3,860</p>
      <p className="mt-1 text-xs text-muted-foreground">Across recommended skills</p>
    </div>
  )
}

function SkillsWidget() {
  return (
    <div className="flex h-full flex-col justify-center p-5">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">Skills to Activate</p>
      <p className="mt-1 text-3xl font-bold text-foreground">5</p>
      <p className="mt-1 text-xs text-muted-foreground">Highest-impact first</p>
    </div>
  )
}

function ChartWidget() {
  return (
    <div className="flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-foreground">Estimated Annual Value by Skill (€)</h3>
      <div className="mt-4 flex flex-1 items-end gap-2">
        {[62, 41, 28, 22, 18].map((v, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t bg-blue-500" style={{ height: `${v}%` }} />
            <span className="text-[10px] text-muted-foreground">{v}k</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecommendationsWidget() {
  const items = [
    { name: 'Invoice Dispute Resolution Agent', value: '€62k' },
    { name: 'Cash Management Agent', value: '€41k' },
    { name: 'Accounts Receivable Collections', value: '€28k' },
  ]
  return (
    <div className="flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-foreground">Recommended Joule Skills & Agents</h3>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.name} className="flex justify-between">
            <span className="truncate text-foreground">{item.name}</span>
            <span className="ml-2 shrink-0 font-medium text-blue-600">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RoadmapWidget() {
  return (
    <div className="flex h-full flex-col p-5">
      <h3 className="text-sm font-semibold text-foreground">90-Day Adoption Roadmap</h3>
      <div className="mt-3 space-y-2 text-xs text-muted-foreground">
        <p><span className="font-medium text-foreground">Week 1–2:</span> Enable top 2 skills, identify champions</p>
        <p><span className="font-medium text-foreground">Week 3–6:</span> Pilot with one team, measure baseline</p>
        <p><span className="font-medium text-foreground">Week 7–12:</span> Scale and prepare expansion case</p>
      </div>
    </div>
  )
}

const VIEWS: Record<Widget['kind'], () => JSX.Element> = {
  value: ValueWidget,
  hours: HoursWidget,
  skills: SkillsWidget,
  chart: ChartWidget,
  recommendations: RecommendationsWidget,
  roadmap: RoadmapWidget,
}

export default function App() {
  const [widgets, setWidgets] = useState(INITIAL_WIDGETS)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b bg-card px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white">J</div>
          <div>
            <h1 className="text-xl font-semibold">Joule Value Realization Simulator</h1>
            <p className="text-xs text-muted-foreground">SAP Academy for Customer Success · Drag widgets to rearrange</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <p className="mb-6 text-sm text-muted-foreground">
          Drag and rearrange the widgets. On touch devices, press and hold first. Keyboard: focus a widget, hold Alt + arrow keys.
        </p>
        <DraggableWidgetGrid
          items={widgets}
          onChange={(next) => setWidgets(next as Widget[])}
          renderItem={(item) => {
            const w = item as Widget
            const View = VIEWS[w.kind]
            return <View />
          }}
          maxColumns={3}
          cellSize={280}
          gap={16}
          radius={16}
        />
      </main>
    </div>
  )
}
