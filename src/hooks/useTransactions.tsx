import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { api } from '../services/api'

interface ITransactionProps {
  id: number
  title: string
  amount: number
  type: string
  category: string
  createdAt: string
}

interface ITransactionsProviderProps {
  children: ReactNode
}

interface ITransactionsContextData {
  transactions: ITransactionProps[]
  createTransaction: (transaction: TransactionInputType) => Promise<void>
}

type TransactionInputType = Omit<ITransactionProps, 'id' | 'createdAt'>

export const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
)

export function TransactionsProvider(props: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransactionProps[]>([])
  useEffect(() => {
    api
      .get('transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionInput: TransactionInputType) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data

    setTransactions([...transactions, transaction])
  }
  return (
    // basicamente estou falando q esse componente n fecha em si msm e aceita filhos;
    //filhos esses do tipo ReactNode
    //ReactNode = qualquer coisa, é tipo um any q n da erro

    //basicamente para n ter q passar a propriedade setTransaction 'pra frente'
    //será responsabilidade também do context criar a transaction
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {props.children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  //basicamente para n ter q importar o Provider e o useContext
  //criamos os useTransactions
  const context = useContext(TransactionsContext)
  return context
}
