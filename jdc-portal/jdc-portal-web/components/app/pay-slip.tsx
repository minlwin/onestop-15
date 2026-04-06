export default function PaySlip({file} : {file: any}) {

    if(!file) {
        return <></>
    }

    return (
        <div className="sm:w-full md:w-1/2">
            <img src={URL.createObjectURL(file)} alt="payment-slip" />
        </div>
    )
}