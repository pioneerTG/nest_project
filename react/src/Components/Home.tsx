import React from 'react';

function Home() {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white min-h-screen flex flex-col justify-center items-center">
            <div className="container mx-auto text-center">
                <h1 className="text-5xl font-extrabold mb-4">어서오세요!</h1>
                <p className="text-lg mb-8">커뮤니티 공간에 오신 것을 환영합니다.</p>
            </div>
        </div>
    );
}

export default Home;