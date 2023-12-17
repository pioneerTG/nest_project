import { useRouteError } from 'react-router-dom';

function Error() {
    const error:any = useRouteError();
    console.error(error);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded shadow">
                <h1 className="text-3xl font-bold text-red-500 mb-4">오류 발생!</h1>
                <p className="text-lg mb-4">죄송합니다. 예기치 않은 오류가 발생했습니다.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
}

export default Error;