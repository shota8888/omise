import styled from 'styled-components'

const utilStyles = {
  // Spacer
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
  Flex: {
    flexColumn: styled.div`
      display: flex;
      align-items: center;
      flex-flow: column;
    `
  }
}

export const MSpace = utilStyles.Spacer.medium;