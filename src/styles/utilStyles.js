import styled from 'styled-components'

export const utilStyles = {
  Spacer: {
    medium: styled.div`
      height: 32px;
      @media (min-width: 1024px) {
        height: 48px;
      }
    `,
    small: styled.div`
      height: 20px;
      @media (min-width: 576px) {
        height: 32px;
      }
    `,
    exSmall: styled.div`
      height: 12px;
      @media (min-width: 576px) {
        height: 20px;
      }
    `
  },

  Heading: {
    main: styled.h2`
      color: #2D2D2D;
      font-size: 1.563rem;
      margin: 0 auto 1rem auto;
      text-align: center;
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
    `,
    wrapin: styled.section`
      margin: 0 auto;
      max-width: 575px;
      position: relative;
      padding: 0 1rem;
      text-align: center;
      width: 100%;
      @media (min-width: 576px) {
        max-width: 1024px;
      }
    `
  },

  Flex: {
    columnCenter: styled.div`
      display: flex;
      align-items: center;
      flex-flow: column;
    `,
    wrap: styled.div`
      display: flex;
      flex-flow: wrap;
    `,
    rowWrap: styled.div`
      display: flex;
      flex-flow: row wrap;
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
