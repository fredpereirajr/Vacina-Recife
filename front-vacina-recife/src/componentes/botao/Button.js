import './Button.module.css';

function Button ({nome, setState}) {
    return (
        <button onClick={setState} type='submit'>{nome}</button>
    );
}

export default Button;