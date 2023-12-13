import { useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function DeletePage() {
    let navigete = useNavigate();
    useEffect(() => {
        navigete('/board');
    }, []);

    return <></>;
}

export default DeletePage;
