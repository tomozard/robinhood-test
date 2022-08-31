import { ChakraProvider } from "@chakra-ui/react";
import theme from "definitions/chakra/theme";
import "styles/global.css";
import { Provider } from "react-redux";
import store from "redux/store";

import Home from "pages";

function App(): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
