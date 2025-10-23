import BusinessDataForm from './components/BusinessDataForm'

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Website
          </h1>
          <p className="text-gray-600">
            Fill in your business information to generate a unique, professional website
          </p>
        </div>
        
        <BusinessDataForm />
      </div>
    </div>
  )
}
