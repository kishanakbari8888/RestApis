class custoerroHandler extends Error{
    constructor(status,msg){
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message){
        return new custoerroHandler(409,message);
    }





}

export default custoerroHandler;