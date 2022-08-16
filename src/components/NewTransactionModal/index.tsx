import { FormEvent, useState } from 'react'

import Modal from 'react-modal'

import { useTransactions } from '../../hooks/useTransactions'

import closeImg from '../../assets/fechar.svg'
import incomeImg from '../../assets/entradas.svg'
import outcomeImg from '../../assets/saidas.svg'

import { Container, TransactionTypeContainer, RadioBox } from './style'

interface INewTransactionModalProps {
  isOpen: boolean
  onRequestClose: () => void
}

export function NewTransactionModal(props: INewTransactionModalProps) {
  const { createTransaction } = useTransactions()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [type, setType] = useState('deposit')
  const [category, setCategory] = useState('')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault()

    await createTransaction({
      title,
      amount,
      type,
      category
    })

    setTitle('')
    setAmount(0)
    setType('deposit')
    setCategory('')

    props.onRequestClose()
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={props.onRequestClose}
        className="react-modal-close-button"
      >
        <img src={closeImg} alt="fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Register Transaction</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          placeholder="Value"
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="income icon" />
            <span>Income</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="outcome icon" />
            <span>Outcome</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Category"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">Register</button>
      </Container>
    </Modal>
  )
}
