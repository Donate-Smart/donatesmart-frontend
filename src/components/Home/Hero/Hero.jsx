import Dropdownone from './Dropdownone'
import Dropdowntwo from './Dropdowntwo'

const Banner = () => {
  return (
    <section id='Home' className='bg-banner-image pt-28 pb-20'>
      <div className='relative px-6 lg:px-8'>
        <div className='container'>
          <div className='flex flex-col gap-4 text-center'>
            <h1 className='leading-tight font-bold tracking-tight max-w-4xl mx-auto'>
              Together, we turn generosity into real results.
            </h1>
            <p className='text-lg leading-8 text-black'>
              Choose where your contribution goes and help us transform good intentions into measurable impact.
            </p>
            
          </div>

          {/* DROPDOWN BUTTONS */}
          <div className='mx-auto max-w-4xl mt-12 p-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow'>
            <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8'>
              <div className='col-span-3'>
                <Dropdownone />
              </div>
              <div className='col-span-3'>
                <Dropdowntwo />
              </div>
              <div className='col-span-3 sm:col-span-2 mt-2'>
                <a href={'/#courses-section'}>
                  <button className='bg-[var(--color-primary)] w-full hover:bg-transparent hover:text-[var(--color-primary)] duration-300 border border-primary text-white font-bold py-4 px-3 rounded-sm hover:cursor-pointer'>
                    Start
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner
