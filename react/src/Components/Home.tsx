import React from 'react';

function Home() {
    return (
        <div className="bg-blue-500 text-white p-8">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold mb-4">환영합니다!</h1>
                <img
                    src="https://via.placeholder.com/400"
                    alt="Welcome Image"
                    className="mt-8 rounded-lg shadow-lg mx-auto"
                />
            </div>
        </div>
    );
}

export default Home;
