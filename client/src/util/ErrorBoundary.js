import { Component } from "react";
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // 에러 처리 로직 추가
    console.error(error);
    console.error(info);
  }

  render() {
    if (this.state.hasError) {
      // 에러 발생 시 보여줄 UI를 반환
      return <div>에러가 발생했습니다.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
