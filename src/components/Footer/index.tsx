import './style.css';

export const Footer = () => {
    return (
        <div className="row d-flex cusBanner3 justify-content-center">
            <div className="col-12 mt-4">
                <p className='text-center'>
                    © 2020
                    Save Ganhe
                    {/*|#{locals.parameters && locals.parameters.glob_programName ? `${locals.parameters.glob_programName}` : "${parameters.glob_programName}"}*/}
                </p>
            </div>
        </div>
    );
}
