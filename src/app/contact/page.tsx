'use client';
// icons
import { BsArrowRight } from 'react-icons/bs';

const Contact = () => {
  return (
    <div className='m-2'>
      <div className='pt-16 mx-auto py-32 text-center xl:text-left flex items-center justify-center h-full bg-slate-50 rounded-3xl'>
        {/* text & form */}
        <div className='flex flex-col w-full max-w-[700px]'>
          {/* text */}
          <h2
            initial='hidden'
            animate='show'
            exit='hidden'
            className='h2 text-center mb-12'
          >
            Let&apos;s <span className='text-accent'>connect.</span>
          </h2>
          {/* form */}
          <form
            initial='hidden'
            animate='show'
            exit='hidden'
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
          >
            {/* input group */}
            <div className='flex gap-x-6 w-full'>
              <input type='text' placeholder='name' className='input' />
              <input type='text' placeholder='email' className='input' />
            </div>
            <input type='text' placeholder='subject' className='input' />
            <textarea placeholder='message' className='textarea'></textarea>
            <button className='btn border-2 rounded-full border-white/50 max-w-[700px] px-8 transition-all duration-300 flex items-center justify-center overflow-hidden hover:border-accent group color-accent'>
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Let&apos;s talk
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0 group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
