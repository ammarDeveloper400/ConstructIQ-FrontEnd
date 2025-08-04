import React from 'react'


const initialEntries = [
    'Show me a full estimate for this job.',
    'Estimate total cost.',
    'Estimate total time.'
]

const Chat = () => {
  return (
    <div>
        <div className='flex flex-wrap justify-center items-center gap-4'>
            {initialEntries.map((entry) => (
                <div className='border-2 border-[#5CA9FF] px-4 py-2 text-black cursor-pointer dark:text-white rounded-md font-semibold text-[16px]'>
                    {entry}
                </div>
            )) }
        </div>
    </div>
  )
}

export default Chat