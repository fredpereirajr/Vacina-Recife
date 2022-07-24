import estilo from './InputBlock.module.css';

function InputBlock ({label, type, placeholder, setState}) {
    return (

        <div className={estilo.input_block}>
            <label>{label}</label>
            <input
            type={type}
            placeholder={placeholder}
            onChange= {(e) => setState(e.target.value)}
            />
        </div>

    );
}

export default InputBlock;