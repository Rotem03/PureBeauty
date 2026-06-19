import { createContext, useContext, useState } from 'react'
import { useApp } from './AppContext'
import { useUserCollection } from '../hooks/useProducts'

const BagContext = createContext({
  collection: [], addToCollection: () => {}, removeFromCollection: () => {},
  isOpen: false, setIsOpen: () => {}
})

export const BagProvider = ({ children }) => {
  const { user } = useApp()
  const { collection, addToCollection, removeFromCollection } = useUserCollection(user?.id)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <BagContext.Provider value={{ collection, addToCollection, removeFromCollection, isOpen, setIsOpen }}>
      {children}
    </BagContext.Provider>
  )
}

export const useBag = () => useContext(BagContext)
