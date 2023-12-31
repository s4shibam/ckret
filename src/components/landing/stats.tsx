const Stats = () => {
  return (
    <div className="w-full bg-gray-950">
      <div className="mx-auto flex w-full max-w-3xl justify-between py-14 sm:py-28">
        <div>
          <p className="mb-2 text-center text-5xl font-semibold text-white">
            500
            <sup>+</sup>
          </p>
          <p className="text-center text-2xl text-white">Registered Users</p>
        </div>
        <div>
          <p className="mb-2 text-center text-5xl font-semibold text-white">
            1000<sup>+</sup>
          </p>
          <p className="text-center text-2xl text-white">Messages Delivered</p>
        </div>
      </div>
    </div>
  )
}

export default Stats
