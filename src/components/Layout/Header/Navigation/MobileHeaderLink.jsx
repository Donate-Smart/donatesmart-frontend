import { useState } from 'react'
import { useSelector } from "react-redux";

const MobileHeaderLink = ({ item }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen)
  }

  return (
    <div className='relative w-full'>
      <i
        href={item.href}
        onClick={item.submenu ? handleToggle : undefined}
        className='flex items-center justify-between w-full py-2 text-black focus:outline-hidden'>
        {item.label}
        {item.submenu && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1.5em'
            height='1.5em'
            viewBox='0 0 24 24'>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='1.5'
              d='m7 10l5 5l5-5'
            />
          </svg>
        )}
      </i>
      {submenuOpen && item.submenu && (
        <div className='bg-white p-2 w-full'>
          {item.submenu.map((subItem, index) => (
            <i
              key={index}
              href={subItem.href}
              className='block py-2 text-gray-500 hover:bg-gray-200'>
              {subItem.label}
            </i>
          ))}
        </div>
      )}
    </div>
  )
}

export default MobileHeaderLink
