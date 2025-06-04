import Image from 'next/image'

export default function LatestWork() {
  return (
    <div className='bg-black text-white py-12'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <p className='text-white mb-1 text-xl font-inter'>My Portfolio</p>
          <h2 className='text-3xl font-bold text-[#FFBA00]'>LATEST WORK</h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 justify-center max-w-[960px] mx-auto'>
          {['work1', 'work2', 'work3', 'work4'].map((img, i) => (
            <div
              key={i}
              className='border-2 border-white overflow-hidden rounded-md max-w-[450px] mx-auto'
            >
              <Image
                src={`/assets/portfolio/${img}.png`}
                alt={`Portfolio image ${i + 1}`}
                width={450}
                height={300}
                className='w-full h-[300px] object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
