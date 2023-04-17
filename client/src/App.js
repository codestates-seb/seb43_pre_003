import GlobalStyles from "./GlobalStyles";
import Button from "./style/Button";

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
    </>
  );
}

export default App;
