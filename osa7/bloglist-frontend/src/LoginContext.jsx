import { createContext, useReducer, useContext } from 'react'

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return (state = action.payload)
    default:
      return state
  }
}

const LoginContext = createContext()

export const LoginContextProvider = (props) => {
  const [user, loginDispatch] = useReducer(loginReducer, null)

  return (
    <LoginContext.Provider value={[user, loginDispatch]}>
      {props.children}
    </LoginContext.Provider>
  )
}

export const useLoginValue = () => {
  const loginAndDispatch = useContext(LoginContext)
  return loginAndDispatch[0]
}

export const useLoginDispatch = () => {
  const loginAndDispatch = useContext(LoginContext)
  return loginAndDispatch[1]
}

export default LoginContext
