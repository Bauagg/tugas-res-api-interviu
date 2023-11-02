import { BrowserRouter } from "react-router-dom";
import RouterIndex from "./routes";
import { Provider } from "react-redux";
import storeProduct from "./redux/store/store.product";


function App() {
  return (
    <div>
      <Provider store={storeProduct}>
        <BrowserRouter>
          <RouterIndex />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
