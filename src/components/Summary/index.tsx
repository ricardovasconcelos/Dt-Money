import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import TotalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from './styles'

export function Summary(){
  const { transactions } = useTransactions();



  const summary = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit'){
      acc.deposits += transaction.amount
      acc.total += transaction.amount
    } else {
      acc.withdraws += transaction.amount
      acc.total -= transaction.amount
    }
    return acc; 
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }
  
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>

          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatNumber(summary.deposits)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>

          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong> - {formatNumber(summary.withdraws)}</strong>
      </div>

      <div>
        <header>
          <p>Total</p>

          <img src={TotalImg} alt="Entradas" />
        </header>
        <strong>{formatNumber(summary.total)}</strong>
      </div>
    </Container>
  )
}