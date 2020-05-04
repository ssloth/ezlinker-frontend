const useWebSocket = () => {
  const ws = new WebSocket('ws://wwh-frp.wobbled.cn:8080/ezlinker/stomp');
  return ws;
};

export default useWebSocket;
