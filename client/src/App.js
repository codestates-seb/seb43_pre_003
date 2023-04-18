import GlobalStyles from "./GlobalStyles";
import Button from "./Components/style/Button";
import Input from "./Components/style/Input";
import Header from "./Components/Header";
const onChange = (e) => {
  console.log(e);
};

function App() {
  return (
    <>
      <GlobalStyles />
      <Button variant="smallWhite" size="sm">
        btn이름
      </Button>
      <Button variant="mediumBlue" size="md">
        btn이름
      </Button>
      <Button variant="smallBlue" size="sm">
        btn이름
      </Button>
      <Button variant="mediumWhite" size="md">
        btn이름
      </Button>
      <Button variant="share" size="shareSize">
        Share
      </Button>
      <Button variant="page" size="pageSize">
        1
      </Button>
      <Button variant="smallWhite" size="sm" disabled>
        1
      </Button>
      <Input
        type="text"
        placeholder="....Search"
        onChange={onChange}
        errorType="default"
      />
      <Input
        type="password"
        placeholder=""
        onChange={onChange}
        errorType="error"
      />
      <Button variant="mediumBlue" size="question">
        Ask Question
      </Button>
      <Header />
    </>
  );
}

export default App;
