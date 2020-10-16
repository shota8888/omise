import styled from 'styled-components'

export const utilStyles = {
  Spacer: {
    medium: styled.div`
      height: 32px;
    `,
    small: styled.div`
      height: 20px;
    `,
    exSmall: styled.div`
      height: 12px;
    `
  },

  Section: {
    main: styled.div`
      padding: 96px 0
    `,
    center: styled.div`
    margin: 0 auto;
    text-align: center;
    `,
    container: styled.div`
      margin: 0 auto;
      max-width: 400px;
      padding: 1rem;
      height: auto;
      width: calc(100% - 2rem);
    `
  },

  Flex: {
    flexColumn: styled.div`
      display: flex;
      align-items: center;
      flex-flow: column;
    `
  },

  Paragraph: {
    link: styled.p`
      color: #007EBE;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    `
  }
}
