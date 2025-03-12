
const OurProcess = () => {
  return (
    <>
      {/* How It Works Section */}
      <section className="py-12  text-center bg-slate-800">
        <h2 className="text-3xl font-bold mb-6">OUR PROCESS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          <div className="p-6 bg-lime-600 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Step 1: Browse Menu</h3>
            <p className="mt-2">Choose your favorite dishes from our delicious menu.</p>
          </div>
          <div className="p-6 bg-red-600 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Step 2: Place Order</h3>
            <p className="mt-2">Add items to cart and complete your order easily.</p>
          </div>
          <div className="p-6 bg-yellow-600 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold">Step 3: Enjoy Food</h3>
            <p className="mt-2">Relax and wait while we deliver hot and fresh food to your doorstep.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default OurProcess;