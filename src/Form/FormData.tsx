import { store } from "./store"
import UserList from "./UserList"
import { Provider } from "react-redux"

export const FormDataTest = () => {
  return (
    <Provider store={store}>
      <UserList/>
    </Provider>
  )
}
