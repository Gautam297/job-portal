function Hero() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Find Your Dream Job
      </h2>
      <p className="text-gray-600 mb-8">
        Search jobs, apply online, and track your applications.
      </p>
      <div className="flex justify-center gap-3">
        <input
          type="text"
          placeholder="Search jobs..."
          className="w-full max-w-md px-4 py-3 border rounded-lg"
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Search
        </button>
      </div>
    </section>
  );
}

export default Hero;