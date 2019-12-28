import { get } from 'lodash';
import io from 'socket.io-client';
import { useState, useEffect } from 'react';

export interface IMessage {
  cmdKey: string;
  cmdValue: string | number;
}

export interface IOPtions {
  maxMessages: number;
}

const useSocketIO = (
  toekn: string,
  moduleId: string | number,
  options: IOPtions = { maxMessages: 20 },
) => {
  const { maxMessages } = options;
  const [client, setClient] = useState<SocketIOClient.Socket>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [error, setError] = useState<string | null>();

  const emit = (event: string, args: any[]) => {
    // eslint-disable-next-line no-unused-expressions
    client && client.emit(event, args);
  };

  useEffect(() => {
    const ioClient = io(`http://39.108.214.107:12001?token=${toekn}&moduleId=${moduleId}`);
    ioClient.on('connect', () => {});
    ioClient.on('echo', (data: any) => {
      if (get(data, 'code') === 400) return setError(get(data, 'msg'));
      if (get(data, 'code') === 500) return setError(get(data, 'msg'));
      if (get(data, 'code') === 200) return setError(null);
      return setError('unknow');
    });
    ioClient.on('s2c', (data: IMessage) => {
      if (maxMessages) {
        // TODO messages max length
        setMessages(messages.concat(data));
      }
    });
    setClient(ioClient);
  }, []);

  return { client, messages, error, emit };
};

export default useSocketIO;
