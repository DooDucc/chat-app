import { Routes, Route } from 'react-router-dom';
import publicRoutes from './routes/routes';

function App() {
    return (
        <Routes>
            {publicRoutes.map((route, i) => {
                const Page = route.component;
                return <Route key={i} path={route.path} element={<Page />} />;
            })}
        </Routes>
    );
}

export default App;
