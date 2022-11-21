import './style.css';

export const Header = () => {
    const location = window.location.href;
    const headerTitle = location.includes('login') ? 'Faça seu Login' : 'Área do Promotor';

    return (
        <>
            <div className='row d-flex rowLogo p-7 align-items-center'>
                <div className="col-12">
                    <div className="pb-3">
                        <img className='programLogo' src='https://assets-mcloud-dev3.s3.amazonaws.com/assets/531e3f71-e742-43e6-a77f-b6293484949c/svg_logo.png' alt=""/>
                    </div>
                </div>
                <div className="col-12">
                    <h1 className='loginHeader'>{headerTitle}</h1>
                </div>
            </div>
        </>
    );
}
