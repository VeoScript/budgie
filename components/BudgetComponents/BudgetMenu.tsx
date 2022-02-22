import React from 'react'
import RenameBudget from '../DialogComponents/RenameBudget'
import DeleteBudget from '../DialogComponents/DeleteBudget'
import { RiSettings4Line } from 'react-icons/ri'

interface TypeProps {
  budget: any
}

const BudgetMenu: React.FC<TypeProps> = ({ budget }) => {

  const [isDropdown, setIsDropdown] = React.useState(false)

  return (
    <React.Fragment>
      <button
        type="button"
        onClick={() => {
          setIsDropdown(true)
        }}
      >
        <RiSettings4Line className="w-5 h-5 text-zinc-800" />
      </button>
      {isDropdown && (
        <React.Fragment>
          <button 
            className={`${isDropdown ? 'z-0 block fixed inset-0 w-full h-full cursor-default focus:outline-none' : 'hidden'}`}
            type="button"
            onClick={() => {
              setIsDropdown(false)
            }} 
          />
          <div className="absolute w-[10rem] -left-5 top-10 z-0">
            <div className="flex w-full overflow-hidden shadow-sm rounded-md bg-white border border-zinc-200">
              <div className="flex flex-col w-full divide-y">
                <RenameBudget
                  budget={budget}
                  setIsDropdown={setIsDropdown}
                />
                <DeleteBudget
                  budget={budget}
                  setIsDropdown={setIsDropdown}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default BudgetMenu