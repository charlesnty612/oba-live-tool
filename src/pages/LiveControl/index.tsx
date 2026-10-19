import { Title } from '@/components/common/Title'
import InstructionsCard from './components/InstructionsCard'
import StatusCard from './components/StatusCard'

export default function BrowserControl() {
  return (
    <div className="container py-8 space-y-4">
      <div>
        <Title title="中控台连接" description="选择直播平台并连接中控台" />
      </div>

      <div className="space-y-8">
        <StatusCard />
        <InstructionsCard />
      </div>
    </div>
  )
}
