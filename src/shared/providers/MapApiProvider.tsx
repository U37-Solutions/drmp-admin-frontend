import { APIProvider } from '@vis.gl/react-google-maps';

type MapApiProviderProps = {
  children: React.ReactNode;
};

const API_KEY = import.meta.env.VITE_MAP_API_KEY;

const MapApiProvider: React.FC<MapApiProviderProps> = ({ children }) => {
  return (
    <APIProvider apiKey={API_KEY} language="uk" region="UA">
      {children}
    </APIProvider>
  );
};

export default MapApiProvider;
