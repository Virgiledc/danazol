interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Project Details
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-gray-600">
            Project ID: {params.id}
          </p>
          <p className="text-gray-600 mt-2">
            Project detail view will be implemented in future stories.
          </p>
        </div>
      </div>
    </div>
  )
}
