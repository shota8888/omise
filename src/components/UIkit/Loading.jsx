import React from 'react'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import styled from 'styled-components'
import { getLoadingState, getLoadingText } from '../../reducks/loading/selectors'

const Loading = ({children}) => {
  const selector = useSelector(state => state)
  const isBeingLoaded = getLoadingState(selector)
  const loadingText = getLoadingText(selector)

  return (
    <>
      {isBeingLoaded && (
        <StLoading>
          <CircularProgress />
          <p>{loadingText}</p>
        </StLoading>
      )}
      {children}
    </>
  )
}

const StLoading = styled.section`
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  flex-flow: column;
  justify-content: center;
  opacity: 0.9;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 9999;
`

export default Loading
