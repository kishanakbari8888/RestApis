class custoerroHandler extends Error{
    constructor(status,msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message){
        return new custoerroHandler(409,message);
    }

    static wrongCredentials(message = 'username or password is wrong!'){
        return new custoerroHandler(401,message);
    }






}

export default custoerroHandler;