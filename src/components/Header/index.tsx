import logoImg from '../../assets/logo.svg'
import { Container, Content } from './style'

interface IHeaderProps {
  onOpenNewTransactionModal: () => void
}

export function Header(props: IHeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={props.onOpenNewTransactionModal}>
          New Transaction
        </button>
      </Content>
    </Container>
  )
}
