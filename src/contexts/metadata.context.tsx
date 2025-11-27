'use client'

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react'

interface IMetadataContextData {
  title: string
  description: string
  updateTitle: (title: string) => void
  updateDescription: (description: string) => void
  updateMetadata: (title: string, description?: string) => void
}

interface IMetadataProviderProps {
  children: ReactNode
}

const MetadataContext = createContext<IMetadataContextData>({} as IMetadataContextData)

export const MetadataProvider = ({ children }: IMetadataProviderProps) => {
  const [title, setTitle] = useState('CDMOR')
  const [description, setDescription] = useState('Igreja Assembléia de Deus Central da Fé - CDMOR')

  const updateTitle = useCallback((newTitle: string) => {
    setTitle(newTitle)
    document.title = newTitle
  }, [])

  const updateDescription = useCallback((newDescription: string) => {
    setDescription(newDescription)
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', newDescription)
    }
  }, [])

  const updateMetadata = useCallback(
    (newTitle: string, newDescription?: string) => {
      updateTitle(newTitle)
      if (newDescription) {
        updateDescription(newDescription)
      }
    },
    [updateTitle, updateDescription]
  )

  const contextValue = useMemo(
    () => ({
      title,
      description,
      updateTitle,
      updateDescription,
      updateMetadata,
    }),
    [title, description, updateTitle, updateDescription, updateMetadata]
  )

  return <MetadataContext.Provider value={contextValue}>{children}</MetadataContext.Provider>
}

export const useMetadata = () => {
  const context = useContext(MetadataContext)

  if (!context) {
    throw new Error('useMetadata must be used within a MetadataProvider')
  }

  return context
}
