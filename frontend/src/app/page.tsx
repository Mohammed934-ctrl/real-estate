
export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="dashboard-container">
        <div className="bg-primary-700 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold">
            Custom Tailwind Test
          </h1>

          <p className="text-primary-200 mt-2">
            Testing my custom colors and styling
          </p>

          <button className="mt-4 bg-secondary-700 hover:bg-secondary-800 text-white px-4 py-2 rounded-lg">
            Test Button
          </button>
        </div>
      </div>
    </div>
    
  );
}
