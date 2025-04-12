import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

function HomePage() {
  return (
    <div >
    <div class="flex p-6 sm:h-[450px] md:h-[550px] w-full overflow-hidden
     bg-green-50 bg-blur-2xl rounded-md bg-clip-padding
     shadow-gray-900 shadow-2xl  bg-opacity-10 border border-gray-100">
    <Sidebar/>
    <MessageContainer/>
    </div>
    </div>
  )
}

export default HomePage
