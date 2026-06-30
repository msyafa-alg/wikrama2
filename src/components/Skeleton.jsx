export const CardSkeleton = () => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
    <div className="aspect-square" style={{ background: '#F1F5F9' }} />
    <div className="p-3 space-y-2">
      <div className="h-3 rounded w-3/4" style={{ background: '#F1F5F9' }} />
      <div className="h-2.5 rounded w-1/2" style={{ background: '#F1F5F9' }} />
    </div>
  </div>
)

export const ListSkeleton = ({ rows = 5 }) => (
  <div className="rounded-2xl overflow-hidden animate-pulse" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0' }}>
    <div className="p-4 border-b" style={{ borderColor: '#F1F5F9' }}>
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-xl" style={{ background: '#F1F5F9' }} />
        <div className="flex-1 space-y-2">
          <div className="h-3 rounded w-1/3" style={{ background: '#F1F5F9' }} />
          <div className="h-2.5 rounded w-1/4" style={{ background: '#F1F5F9' }} />
        </div>
      </div>
    </div>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="p-4 border-b" style={{ borderColor: '#F1F5F9' }}>
        <div className="flex gap-4 items-center">
          <div className="w-10 h-10 rounded-xl shrink-0" style={{ background: '#F1F5F9' }} />
          <div className="flex-1 space-y-2">
            <div className="h-3 rounded w-2/3" style={{ background: '#F1F5F9' }} />
            <div className="h-2.5 rounded w-1/3" style={{ background: '#F1F5F9' }} />
          </div>
        </div>
      </div>
    ))}
  </div>
)

export const DetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 rounded-2xl mb-6" style={{ background: '#F1F5F9' }} />
    <div className="space-y-3">
      <div className="h-6 rounded w-1/3" style={{ background: '#F1F5F9' }} />
      <div className="h-4 rounded w-2/3" style={{ background: '#F1F5F9' }} />
      <div className="h-4 rounded w-1/2" style={{ background: '#F1F5F9' }} />
    </div>
  </div>
)
