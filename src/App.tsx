import { useState } from 'react'
import Modal from 'react-modal'
import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'
import { NewTransactionModal } from './components/NewTransactionModal'
import { GlobalStyle } from './styles/global'
import {
  TransactionsContext,
  TransactionsProvider
} from './hooks/useTransactions'

Modal.setAppElement('#root')
export function App() {
  const [isNewTrasactionModalOpen, setIsNewTrasactionModalOpen] =
    useState(false)

  function handleOpenNewTRansactionModal() {
    setIsNewTrasactionModalOpen(true)
  }
  function handleCloseNewTRansactionModal() {
    setIsNewTrasactionModalOpen(false)
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTRansactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTrasactionModalOpen}
        onRequestClose={handleCloseNewTRansactionModal}
      />
      <GlobalStyle />
    </TransactionsProvider>
  )
}
