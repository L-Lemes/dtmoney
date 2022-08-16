import React from 'react'
import ReactDOM from 'react-dom/client'
import { createServer, Model } from 'miragejs'
import { App } from './App'

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          td: 1,
          title: 'Developer Website',
          amount: 1400.0,
          type: 'deposit',
          category: 'Job',
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          td: 2,
          title: 'Rent',
          amount: 1000.0,
          type: 'withdraw',
          category: 'Basic expenses',
          createdAt: new Date('2021-02-20 15:00:00')
        }
      ]
    })
  },
  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
