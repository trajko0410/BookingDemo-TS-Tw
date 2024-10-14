export default function HeroSection() {
  return (
    <div className="bg-black h-96 flex items-center justify-center">
      <div className="relative w-full h-full max-w-[1500px]">

        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero.jpeg')" }}></div>

        {/* Gradient Overlay that fades on both sides */}
        <div className="hidden 1500px:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/0 to-black/95"></div>

        {/* Content */}
        <div className="font-bluesans relative z-10 flex flex-col justify-center h-full max-w-[400px] text-white large mr-20 lg:ml-20 ml-20">
          <p className="lg:text-xl md:text-xl text-sm mb-4 ">Best friends, great holidays</p>
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl font-bold">
            Make your group trip dreams come true
          </h1>
          <p className="lg:text-xl md:text-xl text-sm mt-4">Break free from your routine and play a little</p>
        </div>
      </div>
    </div>
  )
}